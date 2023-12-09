import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import { PrismaClient } from '@prisma/client'
import {User} from "@supabase/gotrue-js";

export default class Auth {
    private static prisma = new PrismaClient();

    public static async getUser(): Promise<User | null>  {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data: { user } } = await supabase.auth.getUser()
        return user;
    }

    public static async authorize(){
        const user = await this.getUser()
        const prismaUser = user && await this.prisma.user.findUnique({
            where: {
                authentication_id: user.id,
                email: user.email
            }
        })

        return {user, prismaUser}
    }
}
