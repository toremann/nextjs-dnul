import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion";

export async function getServerSideProps() {
  const username = "toremann";
  const response = await fetch(
    `https://api.github.com/users/${username}/events/public`
  );

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const gitURL = "https://github.com/";
  const username = "toremann";
  const [name, setName] = useState("Dnul.");

  const { ref, inView } = useInView();

  useEffect(() => {
    console.log("inView", inView);
  }, [inView]);

  return (
    <div className={styles.container}>
      <Head>
        <title>dnul.no</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logo}>
          <motion.h1
            className={styles.title__left}
            initial={{ x: "-100vw" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", duration: 1, bounce: 0.3 }}
          >
            Hi, I`m{" "}
          </motion.h1>
          <motion.h1
            className={styles.title__right}
            initial={{ y: "-200vw" }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.3,
              delay: 0.6,
            }}
          >
            <a href={`https://github.com/${username}`}>{name}</a>
          </motion.h1>
        </div>
        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Last commit:
          <code className={styles.code}>
            {data[0].repo.name.replace(new RegExp(`^toremann/`), "")}
            {new Date(data[0].created_at).toLocaleString("en-GB")}
          </code>
        </motion.p>
        <div>
          <motion.div
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {data

              .filter((data) => {
                return data.type === "PushEvent";
              })

              .slice(0, 8)
              .map((data, index) => {
                return (
                  <div key={index} className={styles.card}>
                    <a href={`${gitURL}${data.repo.name}`}>
                      <b>
                        {data.repo.name.replace(new RegExp(`^toremann\/`), "")}
                        {` `}
                      </b>
                    </a>
                    <i>
                      {data.payload.ref.replace(
                        new RegExp(`^refs\/heads\/`),
                        ""
                      )}
                      _
                      <a
                        href={`${gitURL}${data.repo.name}/commit/${data.payload.head}`}
                      >
                        {data.payload.head.slice(0, 7)}
                      </a>
                    </i>
                    <br />
                    {new Date(data.created_at).toLocaleDateString("en-GB")}
                  </div>
                );
              })}
          </motion.div>
          <div className={styles.grid}>
            <motion.h1
              ref={ref}
              className={styles.title}
              initial={{ x: "100vw" }}
              animate={{ x: 0 }}
              transition={{ type: "spring", duration: 1, bounce: 0.3 }}
            >
              JS, node, express,
            </motion.h1>
            <motion.h1
              ref={ref}
              className={styles.title}
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.3,
                delay: 0.5,
              }}
            >
              NextJS, React, GraphQL,
            </motion.h1>
            <motion.h1
              ref={ref}
              className={styles.title}
              initial={{ y: "100vw" }}
              animate={{ y: 0 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.3,
                delay: 1,
              }}
            >
              RPi, CSS, Electronics.
            </motion.h1>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
