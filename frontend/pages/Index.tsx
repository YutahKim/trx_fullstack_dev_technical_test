import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [data, setData] = useState<string>('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/data')
            .then(response => {
                setData(response.data.message);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1>Data from Backend:</h1>
            <p>{data}</p>
        </div>
    );
}