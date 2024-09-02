import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function PageDropdown({ selectedPage, setSelectedPage }) {
    const navigate = useNavigate();

    // const handleChange = (event) => {
    //     const selectedPage = event.target.value;
    //     navigate(selectedPage); // Navigate to the selected page
    // };
    const handleChange = (event) => {
        const newSelectedPage = event.target.value;
        setSelectedPage(newSelectedPage); // Update the selected page state
        navigate(newSelectedPage); // Navigate to the selected page
    };

    return (
        <select className="dropdown" onChange={handleChange} value={selectedPage}>
            <option value="/">Select Name</option>
            <option value="/Abu">Abu</option>
            <option value="/Aba">Aba</option>
            <option value="/Maria">Maria</option>
            <option value="/Ron">Ron</option>
            <option value="/Grace">Grace</option>
            <option value="/John">John</option>
            <option value="/Lynda">Lynda</option>
            <option value="/Mateo">Mateo</option>
            <option value="/Emmie">Emmie</option>
            <option value="/Anthony">Anthony</option>
            <option value="/Madison">Madison</option>
            <option value="/Kennedy">Kennedy</option>
            <option value="/Evelyn">Evelyn</option>
            <option value="/Matthew">Matthew</option>
            <option value="/Nicolas">Nicolas</option>
        </select>
    );
}

export default PageDropdown;
