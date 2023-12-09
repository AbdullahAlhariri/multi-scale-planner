import AuthButton from '../components/AuthButton'
import {redirect} from "next/navigation";
import Main from "@/components/Main";
import React from "react";
import Auth from "@/app/utils/auth";
import {PrismaClient} from "@prisma/client";


const prisma = new PrismaClient()

export default async function Index() {
    const {user, prismaUser} = await Auth.authorize();
    if (user === null || prismaUser === null) redirect('/login')

    let tags = await prisma.tag.findMany({
        where: {
            user_id: prismaUser.id
        }
    }).then(tags => {
        return tags.map(tag => ({name: tag.name, code: tag.id}))
    })

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div></div>
          <AuthButton />
        </div>
      </nav>

        <main className="flex-1 flex flex-col gap-6">
            <Main tags={tags}/>
        </main>
    </div>
  )
}
