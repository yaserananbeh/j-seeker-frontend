import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout";
import Link from "next/link";
export async function getStaticProps() {
  //getServerSideProps(context)
  const request = await fetch("http://localhost:8080/jobs?expand=category");
  const data = await request.json();
  return {
    props: {
      allJobsData: data,
    },
  };
}
function index({ allJobsData }) {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>All Jobs</title>
          <meta name="description" content="All Jobs" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>All Jobs</h1>

          <p className={styles.description}>browse our huge list of jobs</p>

          <div className={styles.grid}>
            {allJobsData.map((job) => (
              <a className={styles.card} key={job.id}>
                <h2>{job.title.toUpperCase()}</h2>
                <p>
                  {job.description.length > 50
                    ? job.description.slice(0, 50) + " ..."
                    : job.description}
                </p>
                <label className="text-muted">{job.category.name}</label>
              </a>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default index;
