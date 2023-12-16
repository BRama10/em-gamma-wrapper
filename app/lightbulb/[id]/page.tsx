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

import Entry from '@/components/lightbulb_component';

import { readFromLocalStorage, writeToLocalStorage, arrayToString, stringToArray } from "../../utils";
import NavBar from '@/components/lightbulb_navbar';
import { create } from 'domain';



export default function Page({ params }: { params: { id: string } }) {
    const localStorageKey = `lightbulb_${params.id}`;
    const [linkedForm, setLinkedForm] = useState('');
    const [allForms, setForms] = useState<any | null>([]);
    const [entries, setEntries] = useState<any>([]);

    useEffect(() => {
        if (linkedForm) {
            writeToLocalStorage(`${localStorageKey}_link`, linkedForm);
        };
    }, [linkedForm]);

    useEffect(() => {
        let workday_forms_data = readFromLocalStorage('workday_counter');
        let local_entries = readFromLocalStorage(localStorageKey);

        if (local_entries) {
            var map = [];
            for (const local_entry of local_entries) {
                map.push({
                    'removedType': ["Incandescent", "CFL", "Fluorescent Tube", "."].includes(local_entry['old_type']) ? local_entry['old_type'] : 'Other',
                    'removedLocation': local_entry['old_location'],
                    'removedWattage': local_entry['old_wattage'],
                    'LED': ["5.5", "6", "9", "."].includes(local_entry['replacement']) ? local_entry['replacement'] : 'Other',
                    'LEDOther': ["5.5", "6", "9", "."].includes(local_entry['replacement']) ? '' : local_entry['replacement'],
                    'removedTypeOther': ["Incandescent", "CFL", "Fluorescent Tube", "."].includes(local_entry['old_type']) ? '' : local_entry['old_type'],
                })
            }
            setEntries(map);
            console.log('local entries', local_entries);
        } else {
            writeToLocalStorage(localStorageKey, []);
        }

        if (workday_forms_data) {
            let ids = stringToArray(workday_forms_data);
            let titlesArray = [];
            for (const id of ids) {
                const title = readFromLocalStorage(`workday_${id}_title`);

                // Push the title to the array if it's not undefined
                if (title !== undefined) {
                    titlesArray.push(title);
                }
            }
            setForms(titlesArray);
        }
    }, [])

    const triggerSave = (index: number, rt: string, rl: string, rw: string, led: string, locother: string, ledother: string) => {

        if (!(rt == undefined && rl == undefined && rw == undefined && led == undefined && locother == undefined && ledother == undefined)) {

            var frozen_entries = readFromLocalStorage(localStorageKey);
            console.log(rl == undefined);

            frozen_entries[index] = {
                'old_location': rl,
                'old_wattage': rw
            }

            if (rt == 'Other') {
                frozen_entries[index] = { ...frozen_entries[index], 'old_type': locother };
            } else {
                frozen_entries[index] = { ...frozen_entries[index], 'old_type': rt };
            }

            if (led == 'Other') {
                frozen_entries[index] = { ...frozen_entries[index], 'replacement': ledother };
            } else {
                frozen_entries[index] = { ...frozen_entries[index], 'replacement': led };
            }
            console.log(frozen_entries);
            writeToLocalStorage(localStorageKey, frozen_entries);
        }
    };

    const createEntry = () => {
        const curr_entries = [...entries];
        curr_entries.push({
            'removedType': '.',
            'removedLocation': '',
            'removedWattage': '',
            'LED': '.',
            'LEDOther': '',
            'removedTypeOther': '',
        })

        setEntries(curr_entries);
    };


    return <main className="flex flex-col items-center justify-around bg-black">
        <NavBar callbackOne={createEntry} lskey='tt' />
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
                    > {allForms.map((a: any) => (
                        <DropdownItem key={a} className="text-danger" color="danger">{a}</DropdownItem>

                    )

                    )}
                    </DropdownMenu>
                </Dropdown>

            </div>
        </div>
        <div className="flex flex-col gap-6 mb-[10%] items-center">
            {entries.map((entry: any, index: number) => (
                <Entry key={index} number={index} saveData={triggerSave} data={entry} />
            ))}

        </div>
    </main>
}