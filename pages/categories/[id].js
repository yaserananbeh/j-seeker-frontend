import Head from "next/head";
import Layout from "../../components/layout";
import styles from "../../styles/Home.module.css";

export async function getAllPostIds() {
  const request = await fetch("http://localhost:8080/categories");
  const data = await request.json();

  return data.map((data) => {
    return {
      params: {
        id: data.id.toString(),
      },
    };
  });
}
export async function getStaticPaths() {
  const paths = await getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
export async function getCategoryData(id) {
  const request = await fetch(
    `http://localhost:8080/categories/${id}?expand=jobs`
  );
  const data = await request.json();

  return {
    params: {
      id: data.id.toString(),
      name: data.name.toString(),
      jobs: data.jobs,
    },
  };
}
export async function getStaticProps({ params }) {
  const categoryData = await getCategoryData(params.id);
  return {
    props: {
      data: categoryData.params,
    },
  };
}
export default function Category({ data }) {
  return (
    <Layout>
      <Head>
        <title>{data.name.toUpperCase()} jobs</title>
        <meta name="description" content={`${data.name} jobs`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>{data.name.toUpperCase()}</h1>
          <p className={styles.description}>
            List Of Available Jobs Related To This Category
          </p>

          <div className={styles.grid}>
            {data.jobs.length
              ? data.jobs.map((job) => (
                  //   <Link key={job.title} href={`/categories/${job.id}`}>
                  <a className={styles.card} key={job.id}>
                    <h2>{job.title.toUpperCase()}</h2>
                    <p>{job.description}</p>
                  </a>
                  //   </Link>
                ))
              : "no available jobs"}
          </div>
        </main>
      </div>
    </Layout>
  );
}
