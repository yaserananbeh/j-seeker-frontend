import Head from "next/head";
import styles from "../../styles/Home.module.css";
import AdminLayout from "../../components/adminLayout";
import axios from "axios";
import { useRouter } from "next/router";

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

function Categories({ allCategoriesData }) {
  const router = useRouter();
  const handleDeleteClick = (cat_id) => {
    axios
      .delete(`http://localhost:8080/categories/${cat_id}`)
      .then((res) => router.push("/admin/categories"))
      .catch((err) => console.log(err.message));
  };
  const handleAddNewCategory = (e) => {
    e.preventDefault();
    const categoryName = e.target.categoryNameInput.value.trim();

    axios
      .post(`http://localhost:8080/categories`, {
        name: `${categoryName}`,
        created_by: 1,
        created_at: 1,
      })
      .then((res) => {
        res.status === 201
          ? router.push("/admin/categories")
          : console.log("problem happened");
      })
      .catch((e) => console.log(e.message));
  };
  return (
    <AdminLayout>
      <div className={styles.container}>
        <Head>
          <title>Admin Panel</title>
          <meta name="description" content="Admin Panel" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div className="row">
            <h3 className="col">Categories</h3>
            <p className="col text-end">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Add New Category
              </button>
            </p>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <form
                onSubmit={function (e) {
                  handleAddNewCategory(e);
                }}
              >
                <div className="mb-3">
                  <label htmlFor="categoryNameInput" className="form-label">
                    Category Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryNameInput"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCategoriesData.length
                  ? allCategoriesData.map((data) => (
                      <tr key={data.id}>
                        <th scope="row">{data.id}</th>
                        <td>{data.name}</td>
                        <td>
                          <button
                            className="btn btn-danger m-0 px-2"
                            onClick={function () {
                              handleDeleteClick(`${data.id}`);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : "No Categories"}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}

export default Categories;
