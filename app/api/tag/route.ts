import Auth from "@/utils/auth";
import prisma from "@/utils/prisma";
// Prisma CRUD https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function POST(req: Request) {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null)
        return new Response(JSON.stringify([]), { status: 401 });

    const {name} = await req.json()
    if (!name) {
        return new Response(JSON.stringify({
            'message' : 'Name must be filled'
        }), {status: 400});
    }

    const tag = await prisma.tag.create({
        data: {
            user_id: prismaUser.id,
            name,
        }
    })

    return new Response(JSON.stringify(tag));
}
