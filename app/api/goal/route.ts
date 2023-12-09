import { PrismaClient } from '@prisma/client'
import Auth from "@/utils/auth";

// Prisma CRUD https://www.prisma.io/docs/orm/prisma-client/queries/crud
const prisma = new PrismaClient()

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

    // const formData = await req.formData()
    // console.log(formData.get('summary'))
    const body = await req.json()

    return new Response("[]");
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}
export async function HEAD(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}