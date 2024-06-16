import React, { useState } from 'react';
import axios from 'axios';

const ResumeUpload: React.FC = () => {
    const [resume, setResume] = useState<File | null>(null);
    const [parsedData, setParsedData] = useState<any | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleSubmit = async () => {
        if (resume) {
            const formData = new FormData();
            formData.append('resume', resume);
            
            try {
                const response = await axios.post('/api/parse-resume', formData, {
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
        <div>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Submit</button>
            <textarea value={JSON.stringify(parsedData, null, 2)} readOnly />
        </div>
    );
};

export default ResumeUpload;
