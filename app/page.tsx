import {redirect} from "next/navigation";
import React from "react";
import Auth from "@/utils/auth";
import prisma from "@/utils/prisma";
import ClientPage from "@/components/ClientPage";
import {Role, Tag, Goal} from "@/app/MSPState";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {Button} from "primereact/button";

const signOut = async () => {
    'use server'

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    await supabase.auth.signOut()
    return redirect('/login')
}

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
        <>
            <div className={"w-full max-w-4xl gap-20 flex items-centertext-sm"}>
                <form action={signOut}>
                    <Button className={'p-1 text-accent'} label="Logout" severity="help" text />
                </form>
            </div>
            <ClientPage allRoles={roles} allTags={tags} serverAllGoals={goals}></ClientPage>
        </>
    )
}
