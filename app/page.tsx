import AuthButton from '../components/AuthButton'
import {redirect} from "next/navigation";
import Main from "@/components/Main";
import React from "react";
import Auth from "@/utils/auth";
import Link from "next/link";
import Image from 'next/image';
import logo from './assets/logo.svg'
import prisma from "@/utils/prisma";
import RoleHeader from "@/components/RoleHeader";

export default async function Index() {
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
        select: {
            id: true,
            name: true,
            icon: true
        },
        orderBy: {
            name: 'asc'
        }
    })

    return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center mt-12">
        <div className="w-full max-w-4xl gap-20 flex items-centertext-sm">
            <Link href={'/'}>
                <Image
                    src={logo}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
            </Link>
            <div className={"flex gap-4 flex-wrap content-start"} >
                <RoleHeader roles={roles}/>
            </div>
          {/*<AuthButton />*/}
        </div>
      </nav>

        <main className="flex-1 flex flex-col gap-6">
            <Main tags={tags}/>
        </main>
    </div>
  )
}
