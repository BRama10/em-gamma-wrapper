'use client'

import { Card, CardHeader, CardBody, CardFooter, Radio, RadioGroup, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';

export default function Entry({ saveData, number, data }: { saveData: (a: any, b: any, c: any, d: any, e: any, f: any, g:any) => void, number: number, data:any }) {
    const [removedType, setRemovedType] = useState(data.removedType);
    const [removedLocation, setRemovedLocation] = useState(data.removedLocation);
    const [removedWattage, setRemovedWattage] = useState(data.removedWattage);
    const [LED, setLED] = useState(data.LED);
    const [LEDOther, setLEDOther] = useState(data.LEDOther);
    const [removedTypeOther, setRemovedTypeOther] = useState(data.removedTypeOther);

    useEffect(() => {
    if (removedType) {
        saveData(number, removedType, removedLocation, removedWattage, LED, LEDOther, removedTypeOther);
        console.log('saving');
        console.log(removedType, removedLocation, removedWattage);
    }
    },[removedType, removedLocation, removedWattage, LED, LEDOther, removedTypeOther])

    return (
        <Card className="w-[90%]">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">Entry #{number}</p>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className="flex flex-col gap-6">
                <RadioGroup
                    label="Bulb Removed Type"
                    value={removedType}
                    onValueChange={setRemovedType}
                >
                    <Radio value="Incandescent">Incandescent</Radio>
                    <Radio value="CFL">CFL</Radio>
                    <Radio value="Fluorescent Tube">Fluorescent Tube</Radio>
                    <Radio value="Other">Other</Radio>
                    {!(["Incandescent", "CFL", "Fluorescent Tube", "."].includes(removedType)) ?
                        (<Input type="text" variant='underlined' label="Other" value={removedTypeOther} onValueChange={setRemovedTypeOther} />) 
                        :
                    (<></>)}
                </RadioGroup>
                <div className="flex flex-row">
                    <Input
                        variant="bordered"
                        color="primary"
                        type="text"
                        label="Location"
                        value={removedLocation}
                        onValueChange={setRemovedLocation}
                        className="max-w-[220px]"
                    />
                    <Input
                        variant="bordered"
                        color="primary"
                        type="number"
                        label="Wattage (W)"
                        value={removedWattage}
                        onValueChange={setRemovedWattage}
                        className="max-w-[220px]"
                    />
                </div>
            </CardBody>
            <Divider />
            <CardFooter>
            <RadioGroup
                    label="LED Replacement Bulb"
                    value={LED}
                    onValueChange={setLED}
                >
                    <Radio value="5.5">5.5W</Radio>
                    <Radio value="6">6W</Radio>
                    <Radio value="9">9</Radio>
                    <Radio value="Other">Other</Radio>
                    {!(["5.5", "6", "9", "."].includes(LED)) ?
                        (<Input type="text" variant='underlined' label="Other" value={LEDOther} onValueChange={setLEDOther} />) 
                        :
                    (<></>)}
                </RadioGroup>
            </CardFooter>
        </Card>
    )
};