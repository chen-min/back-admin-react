import styles from "./index.module.less";

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>Welcome</div>
      </div>
      <div className={styles.img}></div>
    </div>
  );
}
