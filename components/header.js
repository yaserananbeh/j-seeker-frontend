import Link from "next/link";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    let searchKeyInput = e.target.jobSearchInput;
    if (searchKeyInput.value.length > 2) {
      searchKeyInput.style.borderColor = "blue";
      router.push(`/jobs/search/${searchKeyInput.value}`);
    } else {
      searchKeyInput.style.borderColor = "#dc3545";
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link href="/">
            <a className="navbar-brand fs-2">JobSeeker.jo</a>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/">
                  <a className="nav-link active" aria-current="page">
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/categories">
                  <a className="nav-link">Categories</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/jobs">
                  <a className="nav-link">Jobs</a>
                </Link>
              </li>
            </ul>
            <form className="d-flex" onSubmit={handleSearchSubmit}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search By Job Title"
                aria-label="Search"
                id="jobSearchInput"
                required
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
