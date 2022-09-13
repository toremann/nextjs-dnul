import React from 'react';
import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import { AiFillGithub, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useState } from 'react';

const Github = ({ data }) => {
  const gitURL = 'https://github.com/';
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
        Recent commits:
      </motion.p>
      {data.length === 0 ? (
        <span className={styles.error}>Error loading data...</span>
      ) : (
        <>
          <div className={styles.card_container}>
            <div className={styles.button__left} disabled={page === 1} onClick={handlePrevious}>
              <AiFillCaretLeft size={30} />
            </div>
            <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              {data
                .filter((data) => {
                  return data.type === 'PushEvent';
                })
                .slice(0, 6)
                .map((data, index) => {
                  return (
                    <div key={index} className={styles.card}>
                      <div>
                        <div className={styles.card__content}>
                          <a href={`${gitURL}${data.repo.name}`}>
                            <b>
                              {data.repo.name.replace(new RegExp(`^toremann\/`), '')}
                              {` `}
                            </b>
                          </a>
                          <i>
                            {data.payload.ref.replace(new RegExp(`^refs\/heads\/`), '')}_<a href={`${gitURL}${data.repo.name}/commit/${data.payload.head}`}>{data.payload.head.slice(0, 7)}</a>
                          </i>
                          <br />
                          {new Date(data.created_at).toLocaleDateString('en-GB')}
                        </div>
                      </div>
                      <div className={styles.card__type}>
                        <AiFillGithub size={30} />
                      </div>
                    </div>
                  );
                })}
              <div className={styles.pagination}>
                Showing latest: {data.length} commits | {page}
              </div>
            </motion.div>
            <div className={styles.button__right} disabled={page === pageCount} onClick={handleNext}>
              <AiFillCaretRight size={30} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Github;
