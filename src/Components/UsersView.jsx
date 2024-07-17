import React, { useEffect, useState } from 'react';

export default function UsersView() {
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await fetch('http://localhost:8000/api/v1/user/', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching users');
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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <ul>
                {result.length}
            </ul>
        </div>
    );
}
