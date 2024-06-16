"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SyncAll = () => {
    const [parsedData, setParsedData] = useState<any | null>(null);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('directory', './resumes');
        
        try {
            const response = await axios.post('http://localhost:3001/api/sync-all-resumes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setParsedData(response.data);
        } catch (error) {
            console.error('Error parsing resume:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit">Submit</button>
            <br />
            <textarea value={JSON.stringify(parsedData, null, 2)} readOnly />
        </form>
    );
};

export default SyncAll;