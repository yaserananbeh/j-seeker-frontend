import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Layout from "../../components/layout";
import Link from "next/link";
export async function getStaticProps() {
  //getServerSideProps(context)
  const request = await fetch("http://localhost:8080/categories");
  const data = await request.json();
  return {
    props: {
      allCategoriesData: data,
    },
  };
}
function index({ allCategoriesData }) {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Job Categories</title>
          <meta name="description" content="Job Categories" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>Categories</h1>

          <p className={styles.description}>Choose A Job Category</p>

          <div className={styles.grid}>
            {allCategoriesData.map((category) => (
              <Link key={category.name} href={`/categories/${category.id}`}>
                <a className={styles.card}>
                  <h2>
                    {category.name.toUpperCase()} <strong>&rarr;</strong>{" "}
                  </h2>
                  <p>Navigate To The Category Jobs</p>
                </a>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default index;
