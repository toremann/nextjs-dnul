import React from 'react';
import styles from '../../styles/Home.module.css';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <>
            <motion.h1 className={styles.title} initial={{ x: '100vw' }} animate={{ x: 0 }} transition={{ type: 'spring', duration: 1, bounce: 0.3 }}>
                JS, node, express,
            </motion.h1>
            <motion.h1
                className={styles.title}
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{
                    type: 'spring',
                    duration: 1,
                    bounce: 0.3,
                    delay: 0.5,
                }}
            >
                NextJS, React, GraphQL,
            </motion.h1>
            <motion.h1
                className={styles.title}
                initial={{ y: '100vw' }}
                animate={{ y: 0 }}
                transition={{
                    type: 'spring',
                    duration: 1,
                    bounce: 0.3,
                    delay: 1,
                }}
            >
                RPi, CSS, Electronics.
            </motion.h1>
        </>
    );
};
export default Footer;
