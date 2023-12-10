'use client';
import {Button} from "primereact/button";
import React, {useContext, useState} from "react";
import {Toast} from "primereact/toast";
import {Dialog} from "primereact/dialog";
import {InputText} from "primereact/inputtext";
import {InputTextarea} from "primereact/inputtextarea";
import {Calendar} from "primereact/calendar";
import {MultiSelect} from "primereact/multiselect";
import MSPState, {Tag} from "@/app/MSPState";
import Goal from "@/components/Goal";

export default function Goals({toast}: {toast: React.RefObject<Toast>}) {
    const mspState = useContext(MSPState)
    const [visible, setVisible] = useState<boolean>(false);

    // Form
    const [date, setDate] = useState<Date>(new Date());
    const [summary, setSummary] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function createGoal() {
        setLoading(true)
        const result = await fetch('/api/goal', {
            'method': 'POST',
            'body': JSON.stringify({
                date,
                summary,
                description,
                selectedTags,
                role_id: mspState.role.id,
                period: mspState.period
            })
        })

        const resultBody = await result.json();
        if (result.ok) {
            toast.current?.show({severity:'success', summary: 'Success', detail:'Goal created', life: 3000});
        } else {
            toast.current?.show({severity:'error', summary: 'Error', detail: resultBody.message, life: 3000});
            setLoading(false)
            return
        }

        setDate(new Date())
        setSummary('')
        setDescription('')
        setSelectedTags([])

        const tempGoals = [...mspState.goals]
        tempGoals.push(resultBody)
        mspState.setGoals(tempGoals)

        const tempAllGoals = [...mspState.allGoals]
        tempAllGoals.push(resultBody)
        mspState.setAllGoals(tempAllGoals)

        setVisible(false)
        setLoading(false)
    }

    const footerContent = (
        <div>
            <Button label="Cancel" onClick={() => setVisible(false)} className="p-button-text p-button-rounded p-text-primary bg-none" />
            <Button loading={loading} className={"p-button-rounded p-text-primary"} label="Save" icon="pi pi-save" onClick={() => { createGoal() }} autoFocus />
        </div>
    );

    const [sortAlphabeticalDirection, setSortAlphabeticalDirection] = useState('asc');
    const [sortByEndDirection, setSortByEndDirection] = useState('asc');

    function sortAlphabetical() {
        const tempGoals = [...mspState.goals];
        if (sortAlphabeticalDirection === 'asc') {
            tempGoals.sort((b, a) => a.summary.localeCompare(b.summary));
            setSortAlphabeticalDirection('desc');
        } else {
            tempGoals.sort((a, b) => a.summary.localeCompare(b.summary));
            setSortAlphabeticalDirection('asc');
        }
        mspState.setGoals(tempGoals);
    }

    function sortByEnd() {
        const tempGoals = [...mspState.goals];
        if (sortByEndDirection === 'asc') {
            tempGoals.sort((b, a) => (new Date(a.end)).getTime() - (new Date(b.end)).getTime());
            setSortByEndDirection('desc');
        } else {
            tempGoals.sort((a, b) => (new Date(a.end)).getTime() - (new Date(b.end)).getTime());
            setSortByEndDirection('asc');
        }
        mspState.setGoals(tempGoals);
    }


  return (
    <div className={"flex w-full flex-col"}>

        <div className={"w-8/12"}>
            { mspState.goals.length ?
                <>
                    <div className={"w-full bg-gray-100 sorter px-4 gap-5 flex"} >
                        <Button onClick={() => sortAlphabetical()} label="Alphabatical" severity="help" text  icon={'pi pi-caret-down'} className={"py-2 px-1"}/>
                        <Button onClick={() => sortByEnd()} label="Ending" severity="help" text  icon={'pi pi-caret-down'} className={"py-2 px-1"}/>
                    </div>
                    { mspState.goals.map(goal => (<Goal key={goal.id} goal={goal} toast={toast} />)) }
                </>
            : <></>}

            <Button onClick={() => setVisible(true)} className={"mt-3 flex w-full cursor-pointer content-center justify-center border-2 px-10 py-5 add-goal gap-2"} icon={"pi pi-plus"}>
                Add {mspState.period.toLowerCase()} Goal
            </Button>
        </div>

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
                <Calendar minDate={new Date()} id="calendar-date" placeholder={'dd-mm-yyyy'} dateFormat={'dd-mm-yy'} value={date} onChange={(e) => setDate(e.value ?? new Date())} required/>
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
    </div>
  )
}
