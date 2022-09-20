import React from 'react';
import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';
import { AiOutlineLinkedin, AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { useState } from 'react';
import Header from './Header';

const Linkedin = ({ certs }) => {
  const [post, setPost] = useState(certs);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(6);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
    pageNumber.push(i);
  }

  // console.log('number', number);
  // console.log('last page?', number == pageNumber.length);
  // console.log('first page?', number == 1);

  return (
    <>
      <Header number={number} pageNumber={pageNumber} type={'certificates'} />
      {certs.length === 0 ? (
        <span className={styles.error}>Error loading data...</span>
      ) : (
        <>
          <div className={styles.card_container}>
            <div className={styles.button__container}>
              {/* FIX THIS STYLING */}

              <button disabled={number == 1} onClick={() => setNumber(number - 1)}>
                <AiFillCaretLeft size={30} />
              </button>
            </div>
            <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              {currentPost.reverse().map((certs) => {
                return (
                  <div key={certs._id} className={styles.card}>
                    <div className={styles.card__content}>
                      <a href={certs.url}>
                        <b>{certs.course}</b>
                      </a>
                      <br />
                      By: <i>{certs.author}</i>
                      <br />
                      <text>
                        {certs.videos} - {certs.time}
                      </text>
                      <br />
                      {certs.category.map((category) => (
                        <li>
                          <text>{category}</text>
                        </li>
                      ))}
                    </div>
                    <div className={styles.card__type}>
                      <AiOutlineLinkedin size={30} />
                    </div>
                  </div>
                );
              })}
            </motion.div>
            <div className={styles.button__container}>
              <button disabled={number == pageNumber.length} onClick={() => setNumber(number + 1)}>
                <AiFillCaretRight size={30} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Linkedin;
