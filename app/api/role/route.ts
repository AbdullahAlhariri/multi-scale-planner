import { PrismaClient } from '@prisma/client'
import Auth from "@/utils/auth";
import prisma from "@/utils/prisma";
// Prisma CRUD https://www.prisma.io/docs/orm/prisma-client/queries/crud

export async function POST(request: Request) {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null)
        return new Response(JSON.stringify([]), { status: 401 });

    const {icon, name} = await request.json()
    if (!icon || !name) {
        return new Response(JSON.stringify({
            'message' : 'Icon and name must be specified'
        }), {status: 400});
    }

    if (name.length > 20) {
        return new Response(JSON.stringify({
            'message' : 'Role name too long'
        }), {status: 400});
    }

    const role = await prisma.role.create({
        data: {
            icon,
            name,
            user_id: prismaUser.id
        },
    })

    return new Response(JSON.stringify(role));
}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}
export async function HEAD(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}