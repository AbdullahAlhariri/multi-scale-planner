import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";

export async function POST(req: Request) {
    const {email, password} = await req.json()

    if (!email || !password) {
        return new Response(JSON.stringify({
            'message' : 'All fields must be filled'
        }), {status: 400});
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error)
        return new Response('', {status:400});

    return new Response('');
}