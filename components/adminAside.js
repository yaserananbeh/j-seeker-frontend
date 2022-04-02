import Link from "next/link";

function AdminAside() {
  return (
    <div className="col-md-2">
      <div className="list-group">
        <Link href={"/admin"}>
          <button
            type="button"
            className="list-group-item list-group-item-action " //active
            aria-current="true"
          >
            Statistics
          </button>
        </Link>
        <Link href={"/admin/categories"}>
          <button
            type="button"
            className="list-group-item list-group-item-action"
          >
            Categories
          </button>
        </Link>

        <Link href={"/admin/jobs"}>
          <button
            type="button"
            className="list-group-item list-group-item-action"
          >
            Jobs
          </button>
        </Link>
      </div>
    </div>
  );
}

export default AdminAside;
