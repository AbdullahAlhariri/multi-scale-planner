import React, {createContext} from 'react';
import {base} from "next/dist/build/webpack/config/blocks/base";

interface base {
    id: number,
    user_id: number
}

export interface Role extends base {
    name: string,
    icon: string
}

export interface Tag extends base {
    name: string,
}

export interface Goal extends base {
    summary: string
    description: string,
    end: Date
    period: string
    role: Role
    tags: Tag[]
}

export interface MSPStateInterface {
    role: Role|{},
    setRole: React.Dispatch<React.SetStateAction<Role|{}>>
    roles: Role[],
    setRoles: React.Dispatch<React.SetStateAction<Role[]>>
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
    tags: Tag[],
    setTags: React.Dispatch<React.SetStateAction<Tag[]>>
    goals: Goal[],
    setGoals: React.Dispatch<React.SetStateAction<Goal[]>>
    allGoals: Goal[],
    setAllGoals: React.Dispatch<React.SetStateAction<Goal[]>>
}

const initialState: MSPStateInterface = {
    role: {},
    setRole: () => {},
    roles: [],
    setRoles: () => {},
    period: '',
    setPeriod: () => {},
    tags: [],
    setTags: () => {},
    goals: [],
    setGoals: () => {},
    allGoals: [],
    setAllGoals: () => {},
};

const MSPState = createContext<MSPStateInterface>(initialState);
export default MSPState;
