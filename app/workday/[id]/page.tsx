'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useMotionValue, useMotionValueEvent } from "framer-motion";
import Tracker from '@/components/tracker';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";


export default function Page({ params }: { params: { id: string } }) {
    const [memberLocation, setMemberLocation] = useState(0);
    const [formData, setFormData] = useState<any>({
        'team_lead': '',
        'members': [],
    })

    useEffect(() => {
        console.log(memberLocation);
    }, [memberLocation]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-around bg-black">
            <div className="flex flex-row justify-around min-h-screen w-full items-center">
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            {formData.team_lead == '' ? 'Select Team Lead' : formData.team_lead}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='...'
                        onAction={(key) => {
                            setFormData((prevFormState: any) => {
                                return { ...prevFormState,'team_lead' : key, }
                              });
                        }}
                    >
                        <DropdownItem key="person_a" className="text-danger" color="danger">Person A</DropdownItem>
                        <DropdownItem key="person_b" className="text-danger" color="danger">Person B</DropdownItem>
                        <DropdownItem key="person_c" className="text-danger" color="danger">Person C</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="bordered"
                        >
                            Select Members
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='...'
                        onSelectionChange={(keys) => {
                            setFormData((prevFormState: any) => {
                                return { ...prevFormState,'members' : keys, }
                              });
                            console.log(formData);
                        }}
                        selectionMode='multiple'
                        selectedKeys={formData.members}
                        closeOnSelect={false}
                        variant='flat'
                    >
                        <DropdownItem key="person_a" className="text-danger" color="danger">Person A</DropdownItem>
                        <DropdownItem key="person_b" className="text-danger" color="danger">Person B</DropdownItem>
                        <DropdownItem key="person_c" className="text-danger" color="danger">Person C</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <div className="flex flex-row justify-around min-h-screen w-full items-center">
                
            </div>
        </main>
    )
}