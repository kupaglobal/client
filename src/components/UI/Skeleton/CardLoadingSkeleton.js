import React from 'react';
import { Card } from 'primereact/card';
import './CardLoadingSkeleton.css'; // Import CSS for Loading Skeleton

const CardLoadingSkeleton = () => {
    return (
        <div className='flex flex-column'>
            <Card className="md:w-15rem my-2 bg-primary skeleton-card">
                <div className="skeleton-content">
                    <div className="skeleton-text"></div>
                    <span className="skeleton-text-block"></span>
                </div>
            </Card>
            <Card className="md:w-15rem my-2 bg-primary-500 skeleton-card">
                <div className="skeleton-content">
                    <div className="skeleton-text" style={{ marginLeft: 0}}></div>
                    <span className="skeleton-text-block" style={{ marginLeft: 0}}></span>
                </div>
            </Card>
        </div>
    );
};

export default CardLoadingSkeleton;