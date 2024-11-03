import { useEffect, useState } from "react";

const useGetProjectById = () => {
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchProject = async (projectId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://project-manager-4gpt.onrender.com/api/v1/project/${projectId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Error to get project data");
      }

      const data = await response.json();
      setProject(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return { project, loading, error, fetchProject };
};

export default useGetProjectById;
