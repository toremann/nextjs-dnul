import React from 'react';
import styles from '../../styles/Home.module.css';
import { motion } from 'framer-motion';
import { AiFillGithub } from 'react-icons/ai';

const Github = ({ data }) => {
    const gitURL = 'https://github.com/';
    console.log(data.length);

    return (
        <>
            <motion.p className={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                {' '}
                Recent commits:{' '}
            </motion.p>
            <motion.div className={styles.grid} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                {data
                    .filter((data) => {
                        return data.type === 'PushEvent';
                    })
                    .slice(0, 8)
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
                                            {data.payload.ref.replace(new RegExp(`^refs\/heads\/`), '')}_
                                            <a href={`${gitURL}${data.repo.name}/commit/${data.payload.head}`}>{data.payload.head.slice(0, 7)}</a>
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
            </motion.div>
        </>
    );
};

export default Github;
