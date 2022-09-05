import Head from "next/head";
import styles from "../styles/Home.module.css";
import { motion } from "framer-motion"
import Logo from "./components/Logo";
import Github from "./components/Github";
import Linkedin from "../components/Linkedin";
import Footer from "./components/Footer";
import { connectToDatabase } from '../util/mongodb';

export async function getServerSideProps() {
    const username = 'toremann';
    const response = await fetch(`https://api.github.com/users/${username}/events/public`);
    
    try {
        const data = await response.json()
        const { db } = await connectToDatabase();
        const db_data = await db.collection('certs').find({}).toArray();
        return {
            props: {
                data,
                isConnected: true,
                mongodb: JSON.parse(JSON.stringify(db_data)),
            },
        };
    } catch (e) {
        console.error(e);
        return {
            props: { isConnected: false },
        };
    }
}

export default function Home({ data, mongodb }) {
    console.log(mongodb)
    return (
        <div className={styles.container}>
            <Head>
                <title>dnul.no</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <Logo data={data} />
                <motion.p className={styles.description} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <code className={styles.code}>
                        Last commit: {data[0].repo.name.replace(new RegExp(`^toremann/`), '')} {new Date(data[0].created_at).toLocaleString('en-GB')}
                    </code>
                </motion.p>
                <div>
                    <Github data={data} />
                    <Linkedin data={mongodb} />
                </div>
                <Footer />
            </main>
    </div>
  );
}
