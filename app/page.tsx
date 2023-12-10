import {redirect} from "next/navigation";
import React from "react";
import Auth from "@/utils/auth";
import prisma from "@/utils/prisma";
import ClientPage from "@/components/ClientPage";
import {Role, Tag, Goal} from "@/app/MSPState";

export default async function Index() {
    'use server'
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null) redirect('/login')

    const tags: Tag[] = await prisma.tag.findMany({
        where: {
            user_id: prismaUser.id
        },
        orderBy: {
            name: 'asc'
        }
    })

    const roles: Role[] = await prisma.role.findMany({
        where: {
            user_id: prismaUser.id
        },
        orderBy: {
            name: 'asc'
        }
    })

    const goals: Goal[] = await prisma.goal.findMany({
        where: {
            user_id: prismaUser.id
        },
        orderBy: {
            end: 'asc'
        },
        include: {
            role: true,
            tags: true
        }
    })

    return (
        <ClientPage allRoles={roles} allTags={tags} serverAllGoals={goals}></ClientPage>
    )
}
