import React from "react";
import styles from "../../styles/Home.module.css";
import { motion } from "framer-motion";

const Logo = () => {
  const username = "toremann";
  const dnul = "Dnul"

  return (
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
        <a href={`https://github.com/${username}`}>{dnul}</a>
      </motion.h1>
    </div>
  );
};

export default Logo;
