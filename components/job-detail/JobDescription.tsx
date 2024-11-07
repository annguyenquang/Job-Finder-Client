import * as React from 'react';

interface JobDescriptionProps {
    description: string; // Dữ liệu rich text từ backend
}

const JobDescription: React.FC<JobDescriptionProps> = ({ description }) => {
    return (
        <div className="pl-6">
            <div
                dangerouslySetInnerHTML={{ __html: description }} // Render HTML
            />
        </div>
    );
};

export default JobDescription;