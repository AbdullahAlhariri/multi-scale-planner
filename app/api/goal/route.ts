import Auth from "@/utils/auth";
import prisma from "@/utils/prisma";
// Prisma CRUD https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function GET(request: Request) {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null)
        return new Response(JSON.stringify([]));

    try {
        return new Response(JSON.stringify(
            await prisma.goal.findMany({
                where: {
                    user_id: prismaUser.id
                }
            })
        ))
    } catch (error) {
        console.error("Error during getting goals:", error);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}

export async function POST(req: Request) {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null)
        return new Response(JSON.stringify([]), { status: 401 });

    const {date, description, selectedTags, summary, period, role_id} = await req.json()
    if (!date || !description || !selectedTags || !summary || !period || !role_id) {
        return new Response(JSON.stringify({
            'message' : 'All fields must be filled'
        }), {status: 400});
    }

    const goal = await prisma.goal.create({
        data: {
            user_id: prismaUser.id,
            end: date,
            description,
            summary,
            period,
            role_id: +role_id,
            tags: {
                connect: selectedTags
            }
        },
        include: {
            tags: true,
            role: true
        }
    })

    return new Response(JSON.stringify(goal));
}

export async function PUT(request: Request) {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null)
        return new Response(JSON.stringify([]), { status: 401 });

    const {end, description, selectedTags, summary, id} = await request.json()
    if (!end || !description || !selectedTags || !summary) {
        return new Response(JSON.stringify({
            'message' : 'All fields must be filled'
        }), {status: 400});
    }

    let goal = await prisma.goal.update({
        where: {
            id,
            user_id: prismaUser.id
        },
        data: {
            end,
            description,
            summary,
            tags: {
                set: selectedTags
            }
        },
        include: {
            tags: true,
            role: true
        }
    })

    return new Response(JSON.stringify(goal));
}

export async function DELETE(request: Request) {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null)
        return new Response(JSON.stringify([]), { status: 401 });

    let id: string|number = request.url.split('id=')[1];
    if (!id) return new Response('', {status: 400});

    try {
        id = +id
        await prisma.goal.delete({
            where: {
                user_id: prismaUser.id,
                id,
            }
        })

        return new Response(JSON.stringify({}), {status: 200})
    } catch (e) {
        console.error("Error during removing goal:", e);
        return new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
        });
    }
}
export async function HEAD(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}