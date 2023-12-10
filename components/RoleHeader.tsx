'use client';
import React, {useRef, useState, useContext} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {Dropdown} from "primereact/dropdown";
import {PrimeIcons} from "primereact/api";
import MSPState from "@/app/MSPState";

// @ts-ignore
export default function RoleHeader({toast}:{toast: React.RefObject<Toast>}) {
    const mspState = useContext(MSPState)

    const [visible, setVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [icon, setIcon] = useState<{name:string, icon:string}|null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function createRole() {
        setLoading(true)
        const result = await fetch('/api/role', {
            'method': 'POST',
            'body': JSON.stringify({name, icon: icon?.icon ?? ''})
        })
        const resultBody = await result.json();

        if (result.ok) {
            toast.current?.show({severity:'success', summary: 'Success', detail:'Role created', life: 3000});
        } else {
            toast.current?.show({severity:'error', summary: 'Error', detail: resultBody.message, life: 3000});
            setLoading(false)
            return
        }

        setName('')
        setIcon(null)
        setVisible(false)

        const tempRoles = mspState.roles
        tempRoles.push(resultBody)
        mspState.setRoles(tempRoles)
        mspState.setRole(resultBody)

        setLoading(false)
    }

    const footerContent = (
        <div>
            <Button loading={loading} className={"p-button-rounded"} label="Save" icon="pi pi-save" onClick={() => { createRole() }} autoFocus />
        </div>
    );

    const icons:{name:string, icon:string}[] = [
        { name: 'Admin', icon: PrimeIcons.COG },
        { name: 'Analyst', icon: PrimeIcons.CHART_LINE },
        { name: 'Content Creator', icon: PrimeIcons.BOOK },
        { name: 'Developer', icon: PrimeIcons.CODE },
        { name: 'Event Planner', icon: PrimeIcons.CALENDAR },
        { name: 'Finance', icon: PrimeIcons.DOLLAR },
        { name: 'Full-Time', icon: PrimeIcons.CALENDAR },
        { name: 'HR', icon: PrimeIcons.USERS },
        { name: 'Health and Safety', icon: PrimeIcons.SHIELD },
        { name: 'Heart', icon: PrimeIcons.HEART_FILL },
        { name: 'Home', icon: PrimeIcons.HOME },
        { name: 'Management', icon: PrimeIcons.DESKTOP },
        { name: 'Operations', icon: PrimeIcons.BUILDING },
        { name: 'Quality Assurance', icon: PrimeIcons.CHECK_CIRCLE },
        { name: 'Researcher', icon: PrimeIcons.SEARCH },
        { name: 'Sales', icon: PrimeIcons.SHOPPING_CART },
        { name: 'Security', icon: PrimeIcons.LOCK },
        { name: 'Social Media', icon: PrimeIcons.FACEBOOK },
        { name: 'User', icon: PrimeIcons.USER }
    ]

    // @ts-ignore
    const selectedCountryTemplate = (option, props) => {
        if (option) return countryOptionTemplate(option)
        if (props) return <span>{props.placeholder}</span>
    };

    // @ts-ignore
    const countryOptionTemplate = (option) => {
        return (
            <div className="flex align-items-center gap-4">
                <i className={option.icon + " "} style={{ fontSize: '1.3rem' }}/>
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <>
            { mspState.roles.length === 0 ?
                <Dialog header="Create your first role!" visible={true} closable={false} footer={footerContent} style={{ width: '700px', maxWidth: "95%" }} onHide={() => {}}>
                    <div className="card flex flex-col gap-8 p-fluid pt-8">
                    <span className="p-float-label">
                        <InputText id="role" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="role">Role name</label>
                    </span>

                        <span className="p-float-label">
                        <Dropdown id="icon" value={icon} onChange={(e) => setIcon(e.value)} options={icons}
                                  optionLabel="name" placeholder="Select a Icon"
                                  valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" showClear
                        />
                        <label htmlFor="icon">Icon</label>
                    </span>

                    </div>
                </Dialog>
                :
                <>
                    {mspState.roles.map(role =>
                        <div key={role.id}>
                            <Button onClick={() => mspState.setRole(role)} label={role.name} icon={role.icon} className={ ("id" in mspState.role && mspState.role.id == role.id ? "role-selected" : "") + " p-button py-2 p-text-primary hidden sm:flex"} />
                            <Button onClick={() => mspState.setRole(role)} label={role.name} icon={role.icon} className={ ("id" in mspState.role && mspState.role.id == role.id ? "role-selected-sm" : "") + " sm:hidden flex p-button py-2 p-text-white bg-primary bg-primary border-none"} />
                        </div>
                    )}
                </>
            }
            { mspState.roles.length < 4 ?
                <>
                    <div>
                        <Button onClick={() => setVisible(true)} label="Add role" severity="help" text  icon={'pi pi-plus'} className={"hidden sm:flex"}/>
                        <Button onClick={() => setVisible(true)} icon="pi pi-plus" className={"sm:hidden flex bg-none border-none py-2"}/>
                    </div>

                    <Dialog header="Create new role" visible={visible} footer={footerContent} style={{ width: '700px', maxWidth: "95%" }} onHide={() => setVisible(false)}>
                        <div className="card flex flex-col gap-8 p-fluid pt-8">
                            <span className="p-float-label">
                                <InputText id="role" value={name} onChange={(e) => setName(e.target.value)} />
                                <label htmlFor="role">Role name</label>
                            </span>

                            <span className="p-float-label">
                                <Dropdown id="icon" value={icon} onChange={(e) => setIcon(e.value)} options={icons}
                                          optionLabel="name" placeholder="Select a Icon"
                                          valueTemplate={selectedCountryTemplate} itemTemplate={countryOptionTemplate} className="w-full md:w-14rem" showClear
                                />
                                <label htmlFor="icon">Icon</label>
                            </span>

                        </div>
                    </Dialog>
                </>
                : <></>
            }
        </>
    )
}
