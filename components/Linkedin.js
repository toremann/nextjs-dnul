import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';
import { AiOutlineLinkedin } from 'react-icons/ai';

const Linkedin = ({ certs }) => {
  return (
    <>
      {certs.length === 0 ? (
        <span> no data soz</span>
      ) : (
        <>
          {' '}
          <motion.p className={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {' '}
            Recent certificates:{' '}
          </motion.p>
          <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {certs.map((certs) => {
              return (
                <div key={certs._id} className={styles.card}>
                  <div className={styles.card__content}>
                    <a href={certs.url}>
                      <b>{certs.course}</b>
                    </a>
                    <br />
                    By: <i>{certs.author}</i>
                  </div>
                  <div className={styles.card__type}>
                    <AiOutlineLinkedin size={30} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </>
      )}
    </>
  );
};

export default Linkedin;
