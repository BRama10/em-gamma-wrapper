'use client'

import React, { useState, useEffect, useRef, ReactNode } from 'react'
import { motion, useScroll, useMotionValue, useMotionValueEvent } from "framer-motion";

interface TrackerProps {
    children: ReactNode;
    callback: (p: any) => void;
}

const Tracker: React.FC<TrackerProps> = ({ children, callback }) => {
    const ref = useRef<any | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["end end", "start start"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        callback(latest);
        console.log(latest);
    })

    return <motion.div
        // style={{opacity: scrollYProgress}}
        ref={ref}>{children}</motion.div>
};

export default Tracker;