import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import Logo from '../components/Logo';
import Github from '../components/Github';
import Linkedin from '../components/Linkedin';
import Footer from '../components/Footer';
import { connectToDatabase } from '../util/mongodb';

async function getGithubEvents() {
  try {
    const gitRes = await fetch('https://api.github.com/users/toremann/events');
    return gitRes.data;
  } catch (error) {
    console.log('git', error);
    return { error };
  }
}

async function getMongoDB() {
  const { db } = connectToDatabase();

  try {
    await db.collection('certs').find({}).toArray();
    return mongoRes.data;
  } catch (error) {
    console.log('db', error);
    return { error };
  }
}

export async function getServerSideProps() {
  const gitHubEventsData = await getGithubEvents();
  const mongoData = await getMongoDB();

  return {
    props: {
      githubData: gitHubEventsData.error ? [] : gitHubEventsData,
      mongoData: mongoData.error ? [] : JSON.parse(JSON.stringify(mongoData)),
    },
  };
}

export default function Home({ githubData, mongoData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>dnul.no</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Logo data={githubData} />
        <motion.p className={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <code className={styles.code}>{/* Last commit: {githubData[0].repo.name.replace(new RegExp(`^toremann/`), '')} {new Date(data[0].created_at).toLocaleString('en-GB')} */}</code>
        </motion.p>
        <div>
          <Github data={githubData} />
          <Linkedin certs={mongoData} />
        </div>
        <Footer />
      </main>
    </div>
  );
}
