'use client'

import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export default function NavBar({callbackOne} : {callbackOne: (s: any) => void}) {

    return (
        <Navbar className='max-w-screen'>
            <NavbarContent className="flex flex-row gap-3" justify="center">
                <NavbarItem>
                    <Button key='guideline' size='sm' color="primary" variant="bordered" onPress={() => callbackOne('guideline')}>
                        Guidelines
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' color="primary" variant="bordered">
                        Save
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' color="primary" variant="bordered">
                        Submit
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button size='sm' color="primary" variant="bordered">
                        Time
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar >
    );
}