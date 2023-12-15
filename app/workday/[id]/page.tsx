'use client'

import React, { useState, useEffect, useRef } from 'react'
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
import NavBar from '@/components/navbar';


export default function Page({ params }: { params: { id: string } }) {
    const [memberLocation, setMemberLocation] = useState(0);
    const [formData, setFormData] = useState<any>({
        'team_lead': '',
        'members': [],
        'sealed_switches': 0,
        'sealed_outlets': 0,
        'sealed_windows': 0,
        'sealed_vents': 0,
        'sealed_boards': 0,
    })

    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleModalOpen = (key: any) => {
        if (key == 'guidelines') {
            setModalTitle('Energy Masters Guidelines')
            setModalContent(`<p>All Of Those Guidelines From Workday Form Will Be Here</p>`)
        }
        onOpen();
    }

    useEffect(() => {
        console.log(memberLocation);
    }, [memberLocation]);

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-lg">{modalTitle}</ModalHeader>
                            <ModalBody>
                                {modalContent}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                {modalTitle != 'Energy Masters Guidelines' ?
                                    <Button color="primary" onPress={onClose}>
                                        Action
                                    </Button> : <></>
                                }
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <NavBar callbackOne={handleModalOpen}/>
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
                                    return { ...prevFormState, 'team_lead': key, }
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
                                    return { ...prevFormState, 'members': keys, }
                                });
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
                <div className="flex flex-col justify-around min-h-screen w-full items-center">
                    <div className='grid grid-cols-2 grid-rows-6 border-white border-2 border-solid rounded-sm gap-3 w-[90%]'>
                        <div className='text-lg col-span-full text-center border-dashed border-b'>Sealed/Caulked</div>
                        <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_switches': prevFormState.sealed_switches - 1, }
                                });
                            }
                            }>-</Button>
                            <Input
                                type="number"
                                label="Light Switches"
                                labelPlacement="outside"
                                value={formData.sealed_switches}
                                onValueChange={(val) => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'sealed_switches': val, }
                                    });
                                }}
                            />
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_switches': prevFormState.sealed_switches + 1, }
                                });
                            }

                            }>+</Button>
                        </div>
                        <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_outlets': prevFormState.sealed_outlets - 1, }
                                });
                            }
                            }>-</Button>
                            <Input
                                type="number"
                                label="Outlets"
                                labelPlacement="outside"
                                value={formData.sealed_outlets}
                                onValueChange={(val) => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'sealed_outlets': val, }
                                    });
                                }}
                            />
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_outlets': prevFormState.sealed_outlets + 1, }
                                });
                            }

                            }>+</Button>
                        </div>
                        <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_windows': prevFormState.sealed_windows - 1, }
                                });
                            }
                            }>-</Button>
                            <Input
                                type="number"
                                label="Windows"
                                labelPlacement="outside"
                                value={formData.sealed_windows}
                                onValueChange={(val) => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'sealed_windows': val, }
                                    });
                                }}
                            />
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_windows': prevFormState.sealed_windows + 1, }
                                });
                            }

                            }>+</Button>
                        </div>
                        <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_vents': prevFormState.sealed_vents - 1, }
                                });
                            }
                            }>-</Button>
                            <Input
                                type="number"
                                label="Vents"
                                labelPlacement="outside"
                                value={formData.sealed_vents}
                                onValueChange={(val) => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'sealed_vents': val, }
                                    });
                                }}
                            />
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_vents': prevFormState.sealed_vents + 1, }
                                });
                            }

                            }>+</Button>
                        </div>
                        <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_boards': prevFormState.sealed_boards - 1, }
                                });
                            }
                            }>-</Button>
                            <Input
                                type="number"
                                label="Boards"
                                labelPlacement="outside"
                                value={formData.sealed_boards}
                                onValueChange={(val) => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'sealed_boards': val, }
                                    });
                                }}
                            />
                            <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'sealed_boards': prevFormState.sealed_boards + 1, }
                                });
                            }

                            }>+</Button>
                        </div>

                        <div className='text-lg col-span-full text-center border-dashed border-b'>Aerators</div>
                        <h1>Hellos</h1>
                        <h1>Hello</h1>
                        <div className='text-lg col-span-full text-center border-dashed border-b'>Misc</div>
                        <h1>Hello</h1>
                        <h1>Hello</h1>
                    </div>
                </div>
                <div className="flex flex-col justify-around min-h-screen w-full items-center">
                    <div className='grid grid-cols-custom3 grid-rows-6 border-white border-2 border-solid rounded-sm w-[90%]'>
                        <div className='border-solid border text-center flex items-center justify-center'><Checkbox defaultSelected></Checkbox></div>
                        <div className='border-solid border text-center'><b>Details</b></div>
                        <div className='border-solid border text-center'><b>Where?</b></div>

                        <div className='border-solid border text-center flex items-center justify-center'><Checkbox defaultSelected></Checkbox></div>
                        <div className='border-solid border text-center'>Trim (Doors, Windows)</div>
                        <div className='border-solid border flex items-center justify-center'><Button className='w-[90%] h-[90%]' color='secondary' onPress={onOpen}>More</Button></div>
                    </div>
                </div>
            </main>
        </>
    )
}