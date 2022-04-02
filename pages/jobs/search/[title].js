import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import Layout from "../../../components/layout";
import Link from "next/link";
export async function getServerSideProps(context) {
  let searchKeyword = context.params.title;
  const request = await fetch(
    `http://localhost:8080/jobs?expand=category&filter[title][like]=${searchKeyword}`
  );
  const data = await request.json();
  return {
    props: {
      jobsAfterSearch: data,
      searchKeyword,
    },
  };
}
function index({ jobsAfterSearch, searchKeyword }) {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>{searchKeyword} jobs</title>
          <meta name="description" content={`${searchKeyword} jobs`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Search Results For "{searchKeyword}"</h1>

          {jobsAfterSearch.length ? (
            <>
              <p className={styles.description}>browse our list of jobs</p>
              <div className={styles.grid}>
                {jobsAfterSearch.map((category) => (
                  <Link key={category.id} href={`/jobs/${category.id}`}>
                    <a className={styles.card}>
                      <h2>{category.title.toUpperCase()}</h2>
                      <p>
                        {category.description.length > 50
                          ? category.description.slice(0, 50) + " ..."
                          : category.description}
                      </p>
                      <label className="text-muted">
                        {category.category.name}
                      </label>
                    </a>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <>
              <h3 className="m-5">No Results Matching This Search</h3>
              <Link href="/jobs">
                <a className="btn btn-primary">Back to all jobs</a>
              </Link>
            </>
          )}
        </main>
      </div>
    </Layout>
  );
}

export default index;
