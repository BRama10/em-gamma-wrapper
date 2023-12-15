'use client'

import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from "@nextui-org/react";
import React from 'react';
import { DataTable } from '@/components/data_table';

import 'animate.css';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around bg-black">
      <div className='flex flex-row justify-between pt-[30%]'>
        <Button color='primary' className="mr-[5%] animate__animated animate__fadeInLeft">
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
