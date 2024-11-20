import React from 'react';
import '../styles/Filter.css';

interface FilterProps {
    onTitleChange: (title: string) => void;
    onRatingChange: (rating: number) => void;
}

const Filter: React.FC<FilterProps> = ({ onTitleChange, onRatingChange }) => {
    return (
        <div className="filter">
            <input
                type="text"
                placeholder="Search by title..."
                onChange={(e) => onTitleChange(e.target.value)}
                className="filter-input"
            />
            <select
                onChange={(e) => onRatingChange(Number(e.target.value))}
                className="filter-select"
            >
                <option value="0">All Ratings</option>
                <option value="1">1+ Stars</option>
                <option value="2">2+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="4">4+ Stars</option>
                <option value="5">5 Stars</option>
            </select>
        </div>
    );
};

export default Filter;
