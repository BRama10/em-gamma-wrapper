'use client'

import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from "@nextui-org/react";
import React, {useState} from 'react';
import { DataTable } from '@/components/data_table';

import 'animate.css';
import { readFromLocalStorage, writeToLocalStorage, arrayToString, stringToArray } from "./utils";
import { redirect } from 'next/navigation';


export default function Home() {
  const [redirectUrl, setRedirect] = useState<string | null>(null);

  if (redirectUrl) {
    redirect(redirectUrl);
  }

  const handleNewChecklist = () => {
    var localCounter = readFromLocalStorage('workday_counter');
    console.log(localCounter);
    if (localCounter) {
      localCounter = stringToArray(localCounter);
      let lastNum = localCounter[localCounter.length - 1];
      localCounter.push(lastNum+1);
      writeToLocalStorage('workday_counter', arrayToString(localCounter));
      setRedirect(`/workday/${lastNum+1}`)
    } else {
      writeToLocalStorage('workday_counter', '0');
      setRedirect(`/workday/0`)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-black">
      <div className='flex flex-row justify-between pt-[30%]'>
        <Button color='primary' className="mr-[5%] animate__animated animate__fadeInLeft" onPress={handleNewChecklist}>
          New Workday Checklist
        </Button>
        <Button color='primary' className="ml-[5%] animate__animated animate__fadeInRight">
          New Lightbulb Form
        </Button>
      </div>

      <div className="pt-[15%] animate__animated animate__fadeInUpBig">
        <DataTable users={[{key:'1', title:'test', type:'test', status:'pending'}]} />
      </div>
    </main>
  )
}
