'use client'

import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from "@nextui-org/react";
import React, {useState, useEffect} from 'react';
import { DataTable } from '@/components/data_table';

import 'animate.css';
import { readFromLocalStorage, writeToLocalStorage, arrayToString, stringToArray, generateRandomString } from "./utils";
import { redirect } from 'next/navigation';


export default function Home() {
  const [redirectUrl, setRedirect] = useState<string | null>(null);
  const [forms, setForms] = useState<any>([]);

  useEffect(() => {
    var tmp_forms = [];
    var l_forms = readFromLocalStorage('lightbulb_counter');
    var w_forms = readFromLocalStorage('workday_counter');

    if (w_forms) {
      w_forms = stringToArray(w_forms)
      for (const w of w_forms) {
        tmp_forms.push({
          'key' : w,
          'title' : readFromLocalStorage(`workday_${w}_title`),
          'type' : 'Workday Checklist',
          'status': 'N/A',
        })
      }
    }

    setForms(tmp_forms);
  }, [])


  if (redirectUrl) {
    redirect(redirectUrl);
  }

  const handleNewChecklist = () => {
    var localCounter = readFromLocalStorage('workday_counter');
    if (localCounter) {
      localCounter = stringToArray(localCounter);
      let lastNum = localCounter[localCounter.length - 1];
      localCounter.push(lastNum+1);
      writeToLocalStorage('workday_counter', arrayToString(localCounter));
      writeToLocalStorage(`workday_id_${lastNum+1}`, generateRandomString(10));
      setRedirect(`/workday/${lastNum+1}`)
    } else {
      writeToLocalStorage('workday_counter', '0');
      writeToLocalStorage(`workday_id_${0}`, generateRandomString(10));
      setRedirect(`/workday/0`)
    }
  }

  const handleNewForm = () => {
    var localLightbulb = readFromLocalStorage('lightbulb_counter');
    if (localLightbulb) {
      localLightbulb = stringToArray(localLightbulb);
      let lastNum = localLightbulb[localLightbulb.length -1];
      localLightbulb.push(lastNum+1);
      writeToLocalStorage('lightbulb_counter', arrayToString(localLightbulb));
      setRedirect(`/lightbulb/${lastNum+1}`)
    } else {
      writeToLocalStorage('lightbulb_counter', '0');
      setRedirect(`/lightbulb/0`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-black">
      <div className='flex flex-row justify-between pt-[30%]'>
        <Button color='primary' className="mr-[5%] animate__animated animate__fadeInLeft" onPress={handleNewChecklist}>
          New Workday Checklist
        </Button>
        <Button color='primary' className="ml-[5%] animate__animated animate__fadeInRight" onPress={handleNewForm}>
          New Lightbulb Form
        </Button>
      </div>

      <div className="pt-[15%] animate__animated animate__fadeInUpBig">
        {/* <DataTable users={[{key:'1', title:'test', type:'test', status:'pending'}]} /> */}
        <DataTable users={forms}></DataTable>
      </div>
    </main>
  )
}
