import React, {createContext} from 'react';

export interface Role {
    id: number,
    user_id: string,
    name: string,
    icon: string
}

export interface MSPStateInterface {
    role: Role|{},
    setRole: React.Dispatch<React.SetStateAction<Role|{}>>
    period: string
    setPeriod: React.Dispatch<React.SetStateAction<string>>
}

const initialState: MSPStateInterface = {
    role: {},
    setRole: () => {},
    period: '',
    setPeriod: () => {},
};

const MSPState = createContext<MSPStateInterface>(initialState);
export default MSPState;
