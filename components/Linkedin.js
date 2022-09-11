import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { useState } from 'react';

const Linkedin = ({ certs }) => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  function handlePrevious() {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  }

  function handleNext() {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  }

  return (
    <>
      <motion.p className={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        Recent certificates:
      </motion.p>
      {certs.length === 0 ? (
        <span className={styles.error}>Error loading data...</span>
      ) : (
        <>
          <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            {certs
              .slice(0, 6)
              .reverse()
              .map((certs) => {
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
            <div className={styles.pagination}>
              <div>
                <button className={styles.button__left} disabled={page === 1} onClick={handlePrevious}>
                  Prev
                </button>
              </div>
              <div>
                {/* Fix placement, fix styling, fix buttons */}
                Certs: {certs.length} | Page: {page}
              </div>
              <div>
                <button className={styles.button__right} disabled={page === pageCount} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
};

export default Linkedin;
