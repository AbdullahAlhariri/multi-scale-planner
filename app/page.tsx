import {redirect} from "next/navigation";
import React from "react";
import Auth from "@/utils/auth";
import prisma from "@/utils/prisma";
import ClientPage from "@/components/ClientPage";

export default async function Index() {
    'use server'
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null) redirect('/login')

    const tags:{ name: string; code: string }[] = await prisma.tag.findMany({
        where: {
            user_id: prismaUser.id
        }
    }).then(tags => {
        return tags.map(tag => ({name: tag.name, code: tag.id.toString()}))
    })

    const roles: {id: number, name: string, icon: string}[] = await prisma.role.findMany({
        where: {
            user_id: prismaUser.id
        },
        orderBy: {
            name: 'asc'
        }
    })

    return (
        <ClientPage roles={roles} tags={tags}></ClientPage>
    )
}
