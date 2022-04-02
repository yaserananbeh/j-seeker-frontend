import Head from "next/head";
import styles from "../../styles/Home.module.css";
import AdminLayout from "../../components/adminLayout";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

export async function getStaticProps() {
  //getServerSideProps(context)
  const request = await fetch("http://localhost:8080/jobs?expand=category");
  const data = await request.json();
  const categoriesRequest = await fetch("http://localhost:8080/categories");
  const categoriesData = await categoriesRequest.json();
  return {
    props: {
      allJobsData: data,
      allCategoriesData: categoriesData,
    },
  };
}
function Jobs({ allJobsData, allCategoriesData }) {
  const router = useRouter();
  const handleDeleteClick = (job_id) => {
    axios
      .delete(`http://localhost:8080/jobs/${job_id}`)
      .then(
        (res) =>
          router.push("/admin/jobs") &&
          Swal.fire({
            position: "top-end",
            color: "green",
            text: "Deleted Successfully",
            showConfirmButton: false,
            timer: 3000,
          })
      )
      .catch(
        (err) =>
          Swal.fire({
            position: "top-end",
            color: "red",
            text: "Can't Delete This Job",
            showConfirmButton: false,
            timer: 3000,
          }) && console.log(err.message)
      );
  };
  const handleAddNewJob = (e) => {
    e.preventDefault();
    const jobTitle = e.target.jobTitleInput.value.trim();
    const jobDescription = e.target.jobDescriptionInput.value.trim();
    const jobCategory = Number(e.target.jobCategoryInput.value.trim());
    axios
      .post(`http://localhost:8080/jobs`, {
        title: `${jobTitle}`,
        description: `${jobDescription}`,
        category_id: `${jobCategory}`,
        created_by: 1,
        created_at: 1,
      })
      .then((res) => {
        res.status === 201
          ? router.push("/admin/jobs") &&
            Swal.fire({
              position: "top-end",
              color: "green",
              text: "Added Successfully",
              showConfirmButton: false,
              timer: 3000,
            }) &&
            e.target.reset()
          : Swal.fire({
              position: "top-end",
              color: "red",
              text: "Can't Add This Job",
              showConfirmButton: false,
              timer: 3000,
            });
      })
      .catch(
        (e) =>
          Swal.fire({
            position: "top-end",
            color: "red",
            text: "Can't Add This Job",
            showConfirmButton: false,
            timer: 3000,
          }) && console.log(e.message)
      );
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
            <h3 className="col">Jobs</h3>
            <p className="col text-end">
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Add New Job
              </button>
            </p>
          </div>
          <div className="collapse" id="collapseExample">
            <div className="card card-body">
              <form
                onSubmit={function (e) {
                  handleAddNewJob(e);
                }}
              >
                <div className="mb-3">
                  <label
                    htmlFor="jobTitleInput"
                    className="form-label is-required"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobTitleInput"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="jobDescriptionInput"
                    className="form-label is-required"
                  >
                    Job Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="jobDescriptionInput"
                    required
                  />
                </div>
                <div className="mb-3 text-start">
                  <label
                    htmlFor="jobCategoryInput"
                    className="form-label is-required"
                  >
                    Job Category
                  </label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    required
                    id="jobCategoryInput"
                    defaultValue={"DEFAULT"}
                  >
                    <option disabled hidden value="DEFAULT">
                      Choose an option
                    </option>
                    {allCategoriesData.length ? (
                      allCategoriesData.map((data, index) => (
                        <option key={index} value={`${data.id}`}>
                          {data.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>please add category before</option>
                    )}
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="table-responsive mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allJobsData.length ? (
                  allJobsData.map((data) => (
                    <tr key={data.id}>
                      <th scope="row">{data.id}</th>
                      <td>{data.title}</td>
                      <td>{data.description.slice(0, 25)}</td>
                      <td>{data.category.name}</td>
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
                ) : (
                  <tr>
                    <td colSpan={5}>no jobs</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}

export default Jobs;
