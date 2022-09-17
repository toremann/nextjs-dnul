import React from 'react';
import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import { AiFillGithub, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useState } from 'react';

const Github = ({ data }) => {
  const gitURL = 'https://github.com/';
  const [post, setPost] = useState(data);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(6);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);

  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  console.log('number', number)
  console.log('last page?', number == pageNumber.length)
  console.log('first page?', number == 1)

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
            <div className={styles.button__left}>
            <button disabled={number == 1} onClick={() => setNumber(number - 1)}><AiFillCaretLeft size={30} /></button>
            </div>
            <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              {currentPost
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
              Page: {number} / {pageNumber.length}
              </div>
            </motion.div>
            <div className={styles.button__right}>
            <button disabled={number == pageNumber.length} onClick={() => setNumber(number + 1)}><AiFillCaretRight size={30} /></button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Github;
