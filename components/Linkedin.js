import React from 'react';

import { motion } from 'framer-motion';
import styles from '/styles/Home.module.css';
import { AiOutlineLinkedin } from 'react-icons/ai';
import certificates from './certificates.json';

const Linkedin = () => {
    return (
        <>
            <motion.p className={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                {' '}
                Recent certificates:{' '}
            </motion.p>
            <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                {certificates.map((data) => {
                    return (
                        <div key={data.id} className={styles.card}>
                            <div className={styles.card__content}>
                                <a href={data.url}>
                                    <b>{data.name}</b>
                                </a>
                                <br />
                                By:<i>{data.by}</i>
                                <br />
                            </div>

                            <div className={styles.card__type}>
                                <AiOutlineLinkedin size={30} />
                            </div>
                        </div>
                    );
                })}
            </motion.div>
        </>
    );
};

export default Linkedin;
