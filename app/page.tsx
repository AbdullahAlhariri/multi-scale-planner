import AuthButton from '../components/AuthButton'
import {cookies} from "next/headers";
import { createClient } from '@/utils/supabase/server'
import {redirect} from "next/navigation";
import Goal from "@/components/Goal";

export default async function Index() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: {user} } = await supabase.auth.getUser()
    if (user == null) redirect('/login')

  return (

    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <div></div>
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
            <Goal ></Goal>
        </main>
      </div>
    </div>

  )
}
