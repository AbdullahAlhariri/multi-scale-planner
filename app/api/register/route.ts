import {cookies, headers} from "next/headers";
import {createClient} from "@/utils/supabase/server";

export async function POST(req: Request) {
    const {email, password} = await req.json()

    if (!email || !password) {
        return new Response(JSON.stringify({
            'message' : 'All fields must be filled'
        }), {status: 400});
    }

    const origin = headers().get('origin');

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    });

    if (error)
        return new Response('', {status:400});

    return new Response('');
}