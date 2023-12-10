'use client'
import Goals from "@/components/Goals";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import Image from 'next/image';
import logo from '../app/assets/logo.svg'
import RoleHeader from "@/components/RoleHeader";
import MSPState, {Goal, Role, Tag} from "@/app/MSPState";
import {Toast} from "primereact/toast";
import {Button} from "primereact/button";

// @ts-ignore
export default function ClientPage({allRoles , allTags, serverAllGoals}) {
    const toast = useRef<Toast>(null);
    const [role, setRole] = useState<Role|{}>(allRoles[0] ?? {});
    const [roles, setRoles] = useState<Role[]>(allRoles);
    const [tags, setTags] = useState<Tag[]>(allTags);
    const [period, setPeriod] = useState<string>('DAY')
    const [goals, setGoals] = useState<Goal[]>(serverAllGoals);
    const [allGoals, setAllGoals] = useState<Goal[]>(serverAllGoals);

    const MSPStateObject = {
        role, setRole,
        roles, setRoles,
        period, setPeriod,
        tags, setTags,
        goals, setGoals,
        allGoals, setAllGoals
    };

    useEffect(() => {
        const updatedGoals = allGoals.filter(
            (goal: Goal) => (period === '' || goal.period === period) && goal.role.id === role.id
        );
        setGoals(updatedGoals);
    }, [role, period, allGoals]);

    return (
        <MSPState.Provider value={MSPStateObject}>
        <Toast ref={toast} />
        <div className="flex-1 w-full flex flex-col gap-10 items-center mt-12">
            <nav className="w-full flex justify-center">
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
                        <RoleHeader />
                    </div>
                    {/*<AuthButton />*/}
                </div>
            </nav>
            <main className="w-full flex justify-center">
                <div className="w-full max-w-4xl gap-20 flex items-centertext-sm items-start">
                    <div className={"w-3/12"}>
                        <div className={"flex flex-col items-start"}>
                            <div className={"flex content-center flex-wrap gap-2"}>
                                {period == 'DAY' ?
                                    <svg className={"ml-1 my-auto"} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" fill="#731963"/>
                                    </svg>
                                :<></>}
                                <Button className={'text-3xl p-1'}  onClick={() => setPeriod('DAY')} label="Day" severity="help" text />
                            </div>

                            <div className={"flex content-center flex-wrap gap-2"}>
                                {period == 'WEEK' ?
                                    <svg className={"ml-1 my-auto"} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" fill="#731963"/>
                                    </svg>
                                    :<></>}
                                <Button className={'text-3xl p-1'}  onClick={() => setPeriod('WEEK')} label="Week" severity="help" text />
                            </div>

                            <div className={"flex content-center flex-wrap gap-2"}>
                                {period == 'MONTH' ?
                                    <svg className={"ml-1 my-auto"} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" fill="#731963"/>
                                    </svg>
                                    :<></>}
                                <Button className={'text-3xl p-1'}  onClick={() => setPeriod('MONTH')} label="Month" severity="help" text />
                            </div>

                            <div className={"flex content-center flex-wrap gap-2"}>
                                {period == 'QUARTER' ?
                                    <svg className={"ml-1 my-auto"} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" fill="#731963"/>
                                    </svg>
                                    :<></>}
                                <Button className={'text-3xl p-1'}  onClick={() => setPeriod('QUARTER')} label="Quarter" severity="help" text />
                            </div>

                            <div className={"flex content-center flex-wrap gap-2"}>
                                {period == 'YEAR' ?
                                    <svg className={"ml-1 my-auto"} width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" fill="#731963"/>
                                    </svg>
                                    :<></>}
                                <Button className={'text-3xl p-1'}  onClick={() => setPeriod('YEAR')} label="year" severity="help" text />
                            </div>

                        </div>
                    </div>

                    <Goals toast={toast}/>
                </div>
            </main>
        </div>
        </MSPState.Provider>
    )
}
