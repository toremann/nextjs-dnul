import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';

const Header = ({ number, pageNumber, type }) => {
  return (
    <>
      <div className={styles.recent__header}>
        <div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <h1>Recent {type}:</h1>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Page: {number} / {pageNumber.length}
        </motion.div>
      </div>
    </>
  );
};
export default Header;
