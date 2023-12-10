import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from "next/image";
import logo from "@/app/assets/logo.svg";
import React from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Kan gebruiker niet verifiëren')
    }

    return redirect('/')
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    if (password.length < 8) return redirect('/login?message=Wachtwoord moet minimaal 8 characters bevatten')

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return redirect(`/login?message=${encodeURIComponent('Kan gebruiker niet verifiëren')}`)
    }

    return redirect(`/login?message=${encodeURIComponent('Bekijk je mail-box om verificatie af te ronden')}`)
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <div className={"flex justify-center items-center mb-5"}>
          <Image
              src={logo}
              width={110}
              height={110}
              alt="Logo"
          />
          <p className={"ml-4 text-primary text-lg font-bold"}>
            Multi scale <br/>planner
          </p>
        </div>
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="login rounded-md px-4 py-2 text-foreground mb-2">
          Login
        </button>
        <button
          formAction={signUp}
          className="register border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Register
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  )
}
