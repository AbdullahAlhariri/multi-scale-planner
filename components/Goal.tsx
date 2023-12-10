'use client';
import React, {useContext, useState} from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {InputText} from "primereact/inputtext";
import {Toast} from "primereact/toast";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {MultiSelect} from "primereact/multiselect";
import MSPState, {Goal, Tag} from "@/app/MSPState";

export default function Goal({goal, toast}: {goal: Goal, toast: React.RefObject<Toast>}) {
    const mspState = useContext(MSPState)
    const [visible, setVisible] = useState<boolean>(false);

    // Form
    const [end, setEnd] = useState<Date>(new Date(goal.end));
    const [summary, setSummary] = useState<string>(goal.summary);
    const [description, setDescription] = useState<string>(goal.description);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

    async function editGoal() {
        console.log({
            end,
            summary,
            description,
            selectedTags,
            id: goal.id
        })
        setLoading(true)
        const result = await fetch('/api/goal', {
            'method': 'PUT',
            'body': JSON.stringify({
                end,
                summary,
                description,
                selectedTags,
                id: goal.id
            })
        })

        const resultBody = await result.json();
        if (result.ok) {
            toast.current?.show({severity:'success', summary: 'Success', detail:'Goal edited', life: 3000});
        } else {
            toast.current?.show({severity:'error', summary: 'Error', detail: resultBody.message, life: 3000});
            setLoading(false)
            return
        }

        const tempGoals = mspState.goals.map(mapGoal => {
            if (mapGoal.id !== goal.id) return mapGoal;
            return {
                description,
                end,
                id: goal.id,
                period: mapGoal.period,
                summary,
                user_id: mapGoal.user_id,
            }
        })
        mspState.setGoals(tempGoals)

        setVisible(false)
        setLoading(false)
    }

    async function removeGoal() {
        setDeleteLoading(true)
        const result = await fetch('/api/goal?id=' + goal.id, {
            'method': 'DELETE',
        })

        const resultBody = await result.json();
        if (result.ok) {
            toast.current?.show({severity:'success', summary: 'Success', detail:'Goal removed', life: 3000});
        } else {
            toast.current?.show({severity:'error', summary: 'Error', detail: resultBody.message, life: 3000});
            setDeleteLoading(false)
            return
        }

        const tempGoals = mspState.goals.filter(filterGoal => filterGoal.id !== goal.id)
        mspState.setGoals(tempGoals)

        setVisible(false)
        setDeleteLoading(false)
    }

    const footerContent = (
        <div className={"flex justify-between"}>
            <Button loading={deleteLoading} label="Remove" onClick={() => removeGoal()} className="p-button-text p-button-rounded p-text-danger bg-none" icon={"pi pi-trash"} severity="danger" />
            <div>
                <Button label="Cancel" onClick={() => setVisible(false)} className="p-button-text p-button-rounded p-text-primary bg-none" />
                <Button loading={loading} className={"p-button-rounded p-text-primary"} label="Edit" icon="pi pi-save" onClick={() => { editGoal() }} autoFocus />
            </div>
        </div>
    );

    // @ts-ignore
    const timeDifference = new Date(goal.end) - new Date();

    // Calculate the number of days left
    const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const formattedDate = `${daysOfWeek[new Date(goal.end).getDay()]} ${new Date(goal.end).getDate()} ${new Date(goal.end).toLocaleString('en-US', { month: 'short', year: 'numeric' })}`;

    return (
        <>
            <div className={"goal py-5 px-6 mt-4 cursor-pointer"} onClick={() => setVisible(true)}>
                <div className={"flex"}>
                    <p className={'font-light text-sm'}>
                        {formattedDate}
                    </p>
                    <span className="ml-2 text-cyan-400 text-sm font-bold">
                        { daysLeft <= 0 ?
                            <>
                                Ends today
                            </>
                        :
                            <>
                                In {daysLeft} {daysLeft > 1 ? 'days' : 'day'}
                            </>
                        }
                    </span>
                </div>
                <p className={"font-bold text-2xl mt-1"}>
                    {goal.summary}
                </p>
                <p className={'font-light mt-2'}>
                    {goal.description}
                </p>
            </div>

            <Dialog header="Edit goal" visible={visible} onHide={() => setVisible(false)} footer={footerContent} style={{ width: '700px', maxWidth: "95%" }}>
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
                        <Calendar minDate={new Date()} id="calendar-date" placeholder={'dd-mm-yyyy'} dateFormat={'dd-mm-yy'} value={end} onChange={(e) => setEnd(e.value ?? new Date())} required/>
                        <label htmlFor="calendar-date">End</label>
                    </span>

                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <MultiSelect inputId="tags" value={selectedTags} options={mspState.tags} onChange={(e) => setSelectedTags(e.value)} optionLabel="name" />
                            <label htmlFor="tags">Tags</label>
                        </span>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
