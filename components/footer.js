import styles from "../styles/Home.module.css";
// import Image from "next/image";
import Link from "next/link";

function footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <a>
          &copy; All Rights Reserved{" "}
          {/* <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span> */}
        </a>
      </Link>
    </footer>
  );
}

export default footer;
