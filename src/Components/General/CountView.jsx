import React, { useEffect, useState } from "react";
import style from "./Styles/CountView.module.css";
export default function CountView(props) {
  const [result, setResult] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://project-manager-frontend-slmf.onrender.com/api/v1/${props.path}/`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`Error fetching ${props.path}`);
      }
      const data = await response.json();
      setResult(data);
    } catch (e) {
      setError(e.message);
      setResult([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading {props.path}s count...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <span className={style.Count}>
      {props.path}s: {result.length}
    </span>
  );
}
