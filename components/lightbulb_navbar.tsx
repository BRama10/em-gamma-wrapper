'use client'

import React, { useState, useEffect, use } from "react";
import { Input, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { ClockIcon } from "@heroicons/react/24/outline";

import { useRouter } from 'next/navigation'

import { readFromLocalStorage, arrayToString, stringToArray, writeToLocalStorage } from "@/app/utils";
import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'text/plain';

export default function NavBar({ callbackOne, lskey }: { callbackOne: (s: any) => void, lskey: string }) {
  const router = useRouter();

  const handleSubmit = async () => {
    
    // console.log({...triaged_data})

    // let ENDPOINT = 'https://script.google.com/macros/s/AKfycbzFNKFdHhi2I-vTq-LYQyEsWTnM4qOfuXu6SrTF6ucNdQl0XSrCSKPOEBCzdXszTjD0mw/exec';
    // const response = await axios.post(ENDPOINT, JSON.stringify(triaged_data));
    // console.log(response.data);
    
  };

  return (
    <Navbar className='max-w-screen'>
      
      <NavbarContent className="flex flex-row gap-2 max-w-screen" justify="center">
        <NavbarItem>
          <Button key='guideline' size='sm' color="warning" variant="bordered" onPress={() => callbackOne('guideline')}>
            Add New Entry
          </Button>
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