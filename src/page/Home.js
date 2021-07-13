import { motion } from 'framer-motion';
import React from 'react';

export default function Home() {
    return (
        <div className='flex h-screen'>
            {/* initial={{ opacity: 0, y: -400 }} animate={{ scale: 1.5, y: 0, opacity: 1, transition: { duration: 1 }, rotate: 360 }} */}
            <motion.h1 className='m-auto text-3xl'>Welcome Home</motion.h1>
        </div>
    )
}
