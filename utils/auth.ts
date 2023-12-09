import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {User} from "@supabase/gotrue-js";
import prisma from "@/utils/prisma";

export default class Auth {
    public static async getUser(): Promise<User | null>  {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data: { user } } = await supabase.auth.getUser()
        return user;
    }

    public static async authorize(){
        const user = await this.getUser()
        const prismaUser = user && await prisma.user.findUnique({
            where: {
                authentication_id: user.id,
                email: user.email
            }
        })

        return {user, prismaUser}
    }
}
