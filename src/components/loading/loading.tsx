import React, { useEffect, useState } from "react";
import styles from "./loading.module.scss";

type LoadingProps = {
  title?: string;
};

const Loading = ({
  title = "페이지를 불러 오고 있습니다...",
}: LoadingProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      {loading && <div className={styles.loadingText}>{title}</div>}
    </div>
  );
};

export default Loading;
