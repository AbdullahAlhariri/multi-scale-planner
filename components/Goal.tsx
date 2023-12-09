'use client';
import React, { useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {MultiSelect} from "primereact/multiselect";

export default function Goal({period, tags, toast, visible, setVisible}) {
    // Form
    const [date, setDate] = useState(null);
    const [summary, setSummary] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState(null);

    function createGoal() {
        // Create goal
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
        <Dialog header="Create goal" visible={visible} onHide={() => setVisible(false)} footer={footerContent} style={{ width: '700px', maxWidth: "95%" }}>
            <div className="card flex flex-col gap-8 p-fluid pt-8">
                <span className="p-float-label">
                    <InputText id="username" value={summary} onChange={(e) => setSummary(e.target.value)} />
                    <label htmlFor="username">Summary</label>
                </span>

                <span className="p-float-label">
                    <InputTextarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={5} cols={30} />
                    <label htmlFor="description">Description</label>
                </span>

                <span className="p-float-label">
                    <Calendar minDate={new Date()} id="calendar-date" placeholder={'dd-mm-yyyy'} dateFormat={'dd-mm-yy'} value={date} onChange={(e) => setDate(e.value)} required/>
                    <label htmlFor="calendar-date">Deadline</label>
                </span>

                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <MultiSelect inputId="tags" value={selectedTags} options={tags} onChange={(e) => setSelectedTags(e.value)} optionLabel="name" />
                        <label htmlFor="tags">Tags</label>
                    </span>
                </div>
            </div>
        </Dialog>
    )
}
