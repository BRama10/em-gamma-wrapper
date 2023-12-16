'use client'

import React, { useState, useEffect, use } from "react";
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ClockIcon } from "@heroicons/react/24/outline";

import { useRouter } from 'next/navigation'

import { readFromLocalStorage, arrayToString, stringToArray, writeToLocalStorage } from "@/app/utils";
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'text/plain';

export default function NavBar({ callbackOne, lskey }: { callbackOne: (s: any) => void, lskey: string }) {
  const [timeIn, setTimeIn] = useState<string | null>(null);
  const [timeOut, setTimeOut] = useState<string | null>(null);
  const [isTimeIn, setIsTimeIn] = useState(true);
  const [timeLocked, setTimeLocked] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();
  const localTimeKey = `${lskey}_time`;

  useEffect(() => {
    let read_data = readFromLocalStorage(localTimeKey);

    console.log(read_data);

    if (read_data) {
      setTimeIn(read_data['timeIn'])
      setTimeOut(read_data['timeOut'])
      setIsTimeIn(read_data['isTimeIn']);
      setTimeLocked(read_data['timeLocked'])
    }

  }, [])

  useEffect(() => {
    if (!(timeIn == null && timeOut == null && isTimeIn == true && timeLocked == false)) {
      writeToLocalStorage(localTimeKey, {
        'timeIn': timeIn,
        'timeOut': timeOut,
        'isTimeIn': isTimeIn,
        'timeLocked': timeLocked,
      })
    }

  }, [timeIn, timeOut, isTimeIn, timeLocked])

  const handleTimeConfirm = (e: any) => {
    e();
    setTimeLocked(true);
  }

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
      onOpen();
    }
  }, [timeOut]);

  const handleSubmit = async () => {
    const concrete_data = readFromLocalStorage(lskey);
    const time_data = readFromLocalStorage(localTimeKey);
    var triaged_data = {
      ...concrete_data,
      'time_in' : time_data['timeIn'],
      'time_out' : time_data['timeOut'],
      'type' : 'workday',
      'id' : 'sdfsdgsdg'
    }

    
    console.log({...triaged_data})

    let ENDPOINT = 'https://script.google.com/macros/s/AKfycbzFNKFdHhi2I-vTq-LYQyEsWTnM4qOfuXu6SrTF6ucNdQl0XSrCSKPOEBCzdXszTjD0mw/exec';
    const response = await axios.post(ENDPOINT, JSON.stringify(triaged_data));
    console.log(response.data);
    
  };

  return (
    <Navbar className='max-w-screen'>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Time Confirmation</ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <Input type="text" variant="bordered" value={timeIn ? timeIn : ''} label='Time In' onValueChange={(v) => setTimeIn(v)} />
                  <Input type="text" variant="bordered" value={timeOut ? timeOut : ''} label='Time Out' onValueChange={(v) => setTimeIn(v)} />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => { handleTimeConfirm(onClose) }}>
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
          {!timeLocked ?
            <Button size='sm' color={isTimeIn ? 'danger' : 'success'} variant="bordered" startContent={<ClockIcon color={isTimeIn ? 'danger' : 'success'} className='w-[16px] h-[16px] aspect-square' />} onPress={handleTimeToggle}>
              {isTimeIn ? 'Time In' : 'Time Out'}
            </Button>
            :
            <Button size='sm' color={'warning'} variant="bordered" startContent={<ClockIcon color={'warning'} className='w-[16px] h-[16px] aspect-square' />} disabled>
              Time Recorded
            </Button>
          }
        </NavbarItem>
        <NavbarItem>
          <Button size='sm' color="primary" variant="bordered" onPress={() => { router.replace('/') }}>
            Back
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button size='sm' color="primary" variant="shadow" onPress={handleSubmit}>
            Submit
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar >
  );
}