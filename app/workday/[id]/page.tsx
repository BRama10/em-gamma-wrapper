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
    useDisclosure,
    Textarea
} from "@nextui-org/react";
import NavBar from '@/components/workday_navbar';

import { readFromLocalStorage, writeToLocalStorage, arrayToString, stringToArray } from "../../utils";

export default function Page({ params }: { params: { id: string } }) {
    const localStorageKey = `workday_${params.id}`;

    const [memberLocation, setMemberLocation] = useState(0);
    const [formData, setFormData] = useState<any>({
        'address': '',
        'unit_num': '',
        'team_lead': '',
        'members': [],
        'sealed_switches': 0,
        'sealed_outlets': 0,
        'sealed_windows': 0,
        'sealed_vents': 0,
        'sealed_boards': 0,
        'bath_aerator': 0,
        'kitchen_aerator': 0,
        'showerhead': 0,
        'toilet_tummy': 0,
        'standard_strip': 0,
        'smart_strip': 0,
        'notes': '',
        'maintenance': '',
        'is_good_usage': false,
        'is_good_interview': false,
    })

    useEffect(() => {
        let read_data = readFromLocalStorage(localStorageKey);
        console.log(read_data);

        if (read_data) {
            setFormData(read_data);
        }

        const intervalId = setInterval(() => {
            setFormData((prevFormData: any) => {
                // Work with the latest state
                const prevFormDataCopy = { ...prevFormData };

                const uniqueValues = Array.from<any, string>(prevFormDataCopy.members, item => item);
                writeToLocalStorage(localStorageKey, { ...prevFormData, 'members': uniqueValues });
                writeToLocalStorage(`${localStorageKey}_title`, `${prevFormData.address}Apt #${prevFormData.unit_num}`)
                return prevFormData; // Ensure that the state remains unchanged
            });
        }, 2000);



        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [])

    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState<ReactNode>(<></>);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleModalOpen = (key: any) => {
        if (key == 'guideline') {
            setModalTitle('Energy Masters Guidelines')
            setModalContent(<><img src="../../guidelinespt1.png" /><img src="../../guidelinespt2.png" /><img src="../../guidelinespt3.png" /><img src="../../guidelinespt4.png" /></>)
            onOpen();
        }
    }

    useEffect(() => {
        console.log(memberLocation);
    }, [memberLocation]);

    const selectedValue = React.useMemo(
        () => Array.from(formData.members).join(", ").replaceAll("_", " "),
        [formData.members]
    );

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={'inside'}>
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
            <NavBar callbackOne={handleModalOpen} lskey={localStorageKey} />
            <main className="flex min-h-screen flex-col items-center justify-around bg-black">
                <Tracker callback={() => console.log()}>
                    <div className="flex flex-col justify-center min-h-screen w-full items-center gap-3">
                        <div className="flex flex-row justify-around gap-2">
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
                                        {formData.members.length == 0 ? 'Select Members' : selectedValue}
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

                        <Input
                            type="text"
                            label="Address"
                            labelPlacement='inside'
                            classNames={{
                                input: ['text-[17px]']
                            }}
                            onValueChange={(v) => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'address': v, }
                                });
                            }}
                            value={formData.address}
                        />
                        <Input
                            type="number"
                            label="Unit #"
                            labelPlacement='inside'
                            classNames={{
                                input: ['text-[17px]']
                            }}
                            onValueChange={(v) => {
                                setFormData((prevFormState: any) => {
                                    return { ...prevFormState, 'unit_num': v, }
                                });
                            }}
                            value={formData.unit_num}
                        />

                    </div>
                </Tracker>
                <Tracker callback={() => console.log()}>
                    <div className="flex flex-col justify-around min-h-screen w-full items-center max-w-full">
                        <div className='grid grid-cols-2 border-white border-2 border-solid rounded-sm gap-3 w-[90%]'>
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

                            <div className='text-lg col-span-full text-center border-dashed border-b'>Faucet Aerators</div>
                            <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'kitchen_aerator': prevFormState.kitchen_aerator - 1, }
                                    });
                                }
                                }>-</Button>
                                <Input
                                    type="number"
                                    label="Kitchen Aerators"
                                    labelPlacement="outside"
                                    value={formData.kitchen_aerator}
                                    onValueChange={(val) => {
                                        setFormData((prevFormState: any) => {
                                            return { ...prevFormState, 'kitchen_aerator': val, }
                                        });
                                    }}
                                />
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'kitchen_aerator': prevFormState.kitchen_aerator + 1, }
                                    });
                                }

                                }>+</Button>
                            </div>
                            <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'bath_aerator': prevFormState.bath_aerator - 1, }
                                    });
                                }
                                }>-</Button>
                                <Input
                                    type="number"
                                    label="Bath Aerators"
                                    labelPlacement="outside"
                                    value={formData.bath_aerator}
                                    onValueChange={(val) => {
                                        setFormData((prevFormState: any) => {
                                            return { ...prevFormState, 'bath_aerator': val, }
                                        });
                                    }}
                                />
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'bath_aerator': prevFormState.bath_aerator + 1, }
                                    });
                                }

                                }>+</Button>
                            </div>
                            <div className='text-lg col-span-full text-center border-dashed border-b'>Miscellaneous</div>
                            <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'showerhead': prevFormState.showerhead - 1, }
                                    });
                                }
                                }>-</Button>
                                <Input
                                    type="number"
                                    label="Showerheads"
                                    labelPlacement="outside"
                                    value={formData.showerhead}
                                    onValueChange={(val) => {
                                        setFormData((prevFormState: any) => {
                                            return { ...prevFormState, 'showerhead': val, }
                                        });
                                    }}
                                />
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'showerhead': prevFormState.showerhead + 1, }
                                    });
                                }

                                }>+</Button>
                            </div>
                            <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'toilet_tummy': prevFormState.toilet_tummy - 1, }
                                    });
                                }
                                }>-</Button>
                                <Input
                                    type="number"
                                    label="Toilet Tummies"
                                    labelPlacement="outside"
                                    value={formData.toilet_tummy}
                                    onValueChange={(val) => {
                                        setFormData((prevFormState: any) => {
                                            return { ...prevFormState, 'toilet_tummy': val, }
                                        });
                                    }}
                                />
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'toilet_tummy': prevFormState.toilet_tummy + 1, }
                                    });
                                }

                                }>+</Button>
                            </div>
                            <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'standard_strip': prevFormState.standard_strip - 1, }
                                    });
                                }
                                }>-</Button>
                                <Input
                                    type="number"
                                    label="Standard Strips"
                                    labelPlacement="outside"
                                    value={formData.standard_strip}
                                    onValueChange={(val) => {
                                        setFormData((prevFormState: any) => {
                                            return { ...prevFormState, 'standard_strip': val, }
                                        });
                                    }}
                                />
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'standard_strip': prevFormState.standard_strip + 1, }
                                    });
                                }

                                }>+</Button>
                            </div>
                            <div className='flex flex-row col-span-full gap-1 border-solid border-b'>
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'smart_strip': prevFormState.smart_strip - 1, }
                                    });
                                }
                                }>-</Button>
                                <Input
                                    type="number"
                                    label="Smart Strip"
                                    labelPlacement="outside"
                                    value={formData.smart_strip}
                                    onValueChange={(val) => {
                                        setFormData((prevFormState: any) => {
                                            return { ...prevFormState, 'smart_strip': val, }
                                        });
                                    }}
                                />
                                <Button size='sm' className='w-[10%] aspect-square' onClick={() => {
                                    setFormData((prevFormState: any) => {
                                        return { ...prevFormState, 'smart_strip': prevFormState.smart_strip + 1, }
                                    });
                                }

                                }>+</Button>
                            </div>
                        </div>
                    </div></Tracker>

                <div className="flex flex-col justify-around min-h-screen w-full items-center">
                    {/* <div className='grid grid-cols-custom3 grid-rows-6 border-white border-2 border-solid rounded-sm w-[90%]'>
                        <div className='border-solid border text-center flex items-center justify-center'><Checkbox defaultSelected></Checkbox></div>
                        <div className='border-solid border text-center'><b>Details</b></div>
                        <div className='border-solid border text-center'><b>Where?</b></div>

                        <div className='border-solid border text-center col-span-full'><b><i>Living Room, Dining Room, Entryway, and Bedrooms</i></b></div>

                        <div className='border-solid border text-center flex items-center justify-center'><Checkbox defaultSelected></Checkbox></div>
                        <div className='border-solid border text-center'>Trim (Doors, Windows)</div>
                        <div className='border-solid border flex items-center justify-center'><Button className='w-[90%] h-[90%]' color='secondary' onPress={onOpen}>More</Button></div>

                        <div className='border-solid border text-center flex items-center justify-center'><Checkbox defaultSelected></Checkbox></div>
                        <div className='border-solid border text-center'>Trim (Doors, Windows)</div>
                        <div className='border-solid border flex items-center justify-center'><Button className='w-[90%] h-[90%]' color='secondary' onPress={onOpen}>More</Button></div>
                    </div> */}

                    <Textarea
                        label="Standard Notes"
                        placeholder="Enter any additional notes!"
                        className="max-w-xs"
                        value={formData.notes}
                        onValueChange={(v) => setFormData((prevFormState: any) => {
                            return { ...prevFormState, 'notes' : v, }
                        })}
                    />
                    <Textarea
                        label="Maintenance Notes"
                        placeholder="Enter any maintenance-specific notes!"
                        className="max-w-xs"
                        value={formData.maintenance}
                        onValueChange={(v) => setFormData((prevFormState: any) => {
                            return { ...prevFormState, 'maintenance' : v, }
                        })}
                    />
                </div>
            </main>
        </>
    )
}