import { useEffect, useState } from "react"

const useGetProjectsData = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()


    const fetchProjects = async () => {
        try {
            setLoading(true)
            const response = await fetch("https://project-manager-74i7.onrender.com/api/v1/project", {
                method: "GET",
                headers: {
                    "Authorization": `${localStorage.getItem("token")}`
                }
            })

            if (!response.ok) {
                throw new Error('Error to get all projects data');
            }

            const data = await response.json()
            setProjects(data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return { projects, loading, error, fetchProjects }
}

export default useGetProjectsData