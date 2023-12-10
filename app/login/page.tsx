'use client';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg';
import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const signIn = async () => {
        if (!password || !email) return setMessage('Email and password are required to log in');

        try {
            const response = await fetch('/api/login', {
                'method': 'POST',
                'body': JSON.stringify({email, password})
            })
            if (!response.ok) return  setMessage("Unable to authorize user");

            window.location.pathname = '/'
        }catch (e) {
             setMessage("Unable to authorize user")
        }
    };

    const signUp = async () => {
        if (!password || !email) return setMessage('Email and password are required to register');
        if (password.length < 8) return setMessage('Password must have at least 8 characters');

        try {
            const response = await fetch('/api/register', {
                'method': 'POST',
                'body': JSON.stringify({email, password})
            })
            if (response.ok) return  setMessage('View your mailbox to complete verification if this email hasn\'t registered before');

            setMessage('Something went wrong');

        }catch (e) {
            setMessage('Unable to authorize user');
        }

    };

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <div className={'flex justify-center items-center mb-5'}>
                <Image src={logo} width={110} height={110} alt="Logo" />
                <p className={'ml-4 text-primary text-lg font-bold'}>Multi scale <br />planner</p>
            </div>
            <label className="text-md" htmlFor="email">
                Email
            </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                name="email"
                id={"email"}
                placeholder="you@example.com"
                required
            />
            <label className="text-md" htmlFor="password">
                Password
            </label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                type="password"
                name="password"
                id={"password"}
                placeholder="••••••••"
                required
            />
            <button onClick={signIn} className="login rounded-md px-4 py-2 text-foreground mb-2">
                Login
            </button>
            <button onClick={signUp} className="register border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">
                Register
            </button>
            {message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {message}
                </p>
            )}
        </div>
    );
}
