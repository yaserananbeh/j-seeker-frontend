import Header from "./header";
import Footer from "./footer";
import styles from "../styles/AdminHome.module.css";
import AdminAside from "./adminAside";

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <h2 className={styles.title}>Admin Dashboard</h2>
      <div className={styles.container}>
        <div className="row">
          <AdminAside />
          <div className="col-md-10">
            <main>{children}</main>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
