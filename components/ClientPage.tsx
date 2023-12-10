'use client'
import Main from "@/components/Main";
import React, {useState} from "react";
import Link from "next/link";
import Image from 'next/image';
import logo from '../app/assets/logo.svg'
import RoleHeader from "@/components/RoleHeader";
import MSPState, {Role} from "@/app/MSPState";

// @ts-ignore
export default function ClientPage({roles, tags}) {
    const [role, setRole] = useState<Role|{}>(roles[0] ?? {});
    const [period, setPeriod] = useState<string>('DAY')

    const MSPStateObject = {
        role, setRole,
        period, setPeriod
    };

    return (
        <MSPState.Provider value={MSPStateObject}>
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
        </MSPState.Provider>
    )
}
