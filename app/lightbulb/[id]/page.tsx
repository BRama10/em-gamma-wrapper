'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import Tracker from '@/components/tracker';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Checkbox,
    Modal,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import NavBar from '@/components/workday_navbar';

import { readFromLocalStorage, writeToLocalStorage, arrayToString, stringToArray } from "../../utils";

export default function Page({ params }: { params: { id: string } }) {
    const localStorageKey = `lightbulb_${params.id}`;
    const [linkedForm, setLinkedForm] = useState('');

    return <main className="flex min-h-screen flex-col items-center justify-around bg-black">
        <div className="flex flex-col justify-center min-h-screen w-full items-center gap-3">
            <div className="flex flex-row justify-around gap-2">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            {linkedForm == '' ? 'Choose Workday Checklist To Link' : linkedForm}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='...'
                        onAction={(key) => {
                            setLinkedForm(key.toString())
                        }}
                    >
                        <DropdownItem key="person_a" className="text-danger" color="danger">Person A</DropdownItem>
                        <DropdownItem key="person_b" className="text-danger" color="danger">Person B</DropdownItem>
                        <DropdownItem key="person_c" className="text-danger" color="danger">Person C</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
            </div>
        </div>

    </main>
}