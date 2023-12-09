'use client';
import Goal from "@/components/Goal";
import {Button} from "primereact/button";
import React, {useRef, useState} from "react";
import {Toast} from "primereact/toast";

export default function Main({tags}: {tags: {name: string, code: string}[]}) {
    const period = 'DAY'
    const toast = useRef<Toast>(null);
    const [goalDialog, setGoalDialog] = useState<boolean>(false);

  return (
      <div className={"flex"}>

        <Toast ref={toast} />

        <Button label="Create goal" icon="pi pi-plus" onClick={() => setGoalDialog(true)} />
        <Goal tags={tags} period={period} toast={toast} visible={goalDialog} setVisible={setGoalDialog}/>
      </div>
  )
}
