'use client'

import React, { useState, useEffect } from "react";
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ClockIcon } from "@heroicons/react/24/outline";

  



export default function NavBar({callbackOne} : {callbackOne: (s: any) => void}) {
    const [timeIn, setTimeIn] = useState<string | null>(null);
    const [timeOut, setTimeOut] = useState<string | null>(null);
    const [isTimeIn, setIsTimeIn] = useState(true);

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const handleTimeToggle = () => {
        const currentTime = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
        if (isTimeIn) {
          setTimeIn(currentTime);
        } else {
          setTimeOut(currentTime);
        }
    
        setIsTimeIn(!isTimeIn);
    };

    useEffect(() => {
        if (timeOut) {
            console.log('hi');
            onOpen();
        }
    }, [timeOut]);

    return (
        <Navbar className='max-w-screen'>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Time Confirmation</ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                    <Input type="text" variant="bordered" value={timeIn ? timeIn : ''} label='Time In' />
                    <Input type="text" variant="bordered" value={timeOut ? timeOut : ''} label='Time Out' />ß
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
            <NavbarContent className="flex flex-row gap-2 max-w-screen" justify="center">
                <NavbarItem>
                    <Button key='guideline' size='sm' color="warning" variant="bordered" onPress={() => callbackOne('guideline')}>
                        Guidelines
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' color={isTimeIn ? 'danger' : 'success'} variant="bordered" startContent={<ClockIcon color={isTimeIn ? 'danger' : 'success'} className='w-[16px] h-[16px] aspect-square' />} onPress={handleTimeToggle}>
                        {isTimeIn ? 'Time In' : 'Time Out'}
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' color="primary" variant="bordered">
                        Back
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' color="primary" variant="bordered">
                        Submit
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}