import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
export async function getStaticProps() {
  //getServerSideProps(context)
  const categoriesCount = await axios
    .head(`http://localhost:8080/categories`)
    .then((res) => res.headers["x-pagination-total-count"]);
  const jobsCount = await axios
    .head(`http://localhost:8080/jobs`)
    .then((res) => res.headers["x-pagination-total-count"]);
  const applicationsCount = await axios
    .head(`http://localhost:8080/applications`)
    .then((res) => res.headers["x-pagination-total-count"]);
  return {
    props: {
      categoriesCount,
      jobsCount,
      applicationsCount,
    },
  };
}

function Home({ categoriesCount, jobsCount, applicationsCount }) {
  return (
    <AdminLayout>
      <div className={styles.container}>
        <Head>
          <title>Admin Panel</title>
          <meta name="description" content="Admin Panel" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="row gx-5 mt-5">
            <div className="col ">
              <Link href={"/admin/categories"}>
                <a>
                  <div className="p-3 border bg-light w-75 mx-auto text-center min-vh-75 text-capitalize ">
                    Categories <span className="fs-2">({categoriesCount})</span>
                  </div>
                </a>
              </Link>
            </div>
            <div className="col">
              <Link href={"/admin/jobs"}>
                <a>
                  <div className="p-3 border bg-light w-75 mx-auto text-center min-vh-75 text-capitalize">
                    Jobs <span className="fs-2">({jobsCount})</span>
                  </div>
                </a>
              </Link>
            </div>
          </div>
          <div className="row gx-5 mt-5">
            <div className="col ">
              <div className="p-3 border bg-light w-75 mx-auto text-center min-vh-75 text-capitalize">
                Applications ({applicationsCount})
              </div>
            </div>
            <div className="col">
              <div className="p-3 border bg-light w-75 mx-auto text-center min-vh-75 text-capitalize">
                Lorem ({applicationsCount})
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}

export default Home;
