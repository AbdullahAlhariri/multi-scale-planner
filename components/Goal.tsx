'use client';
import React, { useState, useRef } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { Calendar } from 'primereact/calendar';
import {InputText} from "primereact/inputtext";

export default function Goal() {
    const toast = useRef<Toast>(null);
    const [visible, setVisible] = useState<boolean>(false);

    // form
    const [date, setDate] = useState(null);
    const [summary, setSummary] = useState<string>('');
    function createGoal() {

        toast.current?.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
        toast.current?.show({severity:'warn', summary: 'Warning', detail:'Message Content', life: 3000});
        toast.current?.show({severity:'error', summary: 'Error', detail:'Message Content', life: 3000});
    }

    const footerContent = (
        <div>
            <Button label="Cancel" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text" />
            <Button label="Save" icon="pi pi-save" onClick={() => { setVisible(false); createGoal() }} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Toast ref={toast} />

            <Button label="Create goal" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Header" visible={visible} onHide={() => setVisible(false)} footer={footerContent} style={{ width: '700px', maxWidth: "95%" }}>

                <Calendar value={date} showIcon />
                <div className="flex flex-column gap-2 ">
                    <label htmlFor="username">Username</label>
                    <InputText id="username"  value={summary} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSummary(e.target.value)} />
                    <small id="username-help">
                        Enter your username to reset your password.
                    </small>
                </div>

                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Dialog>
        </div>
    )
}
