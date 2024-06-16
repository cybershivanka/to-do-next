"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ResumeUpload = () => {
    const [resume, setResume] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any | null>(null);
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (resume) {
            const formData = new FormData();
            formData.append('resume', resume);
                        
            try {
                const response = await axios.post('http://localhost:3001/api/parse-resume', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setParsedData(response.data);
            } catch (error) {
                console.error('Error parsing resume:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            <button type="submit">Submit</button>
            <br />
            <textarea value={JSON.stringify(parsedData, null, 2)} readOnly />
        </form>
    );
};

export default ResumeUpload;
