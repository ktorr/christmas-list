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
            <option value="/Aba">Aba</option>
            <option value="/Abu">Abu</option>
            <option value="/Anthony">Anthony</option>
            <option value="/Bill">Bill</option>
            <option value="/Emmie">Emmie</option>
            <option value="/Evelyn">Evelyn</option>
            <option value="/Grace">Grace</option>
            <option value="/John">John</option>
            <option value="/Kennedy">Kennedy</option>
            <option value="/Lynda">Lynda</option>
            <option value="/Madison">Madison</option>
            <option value="/Maria">Maria</option>
            <option value="/Mateo">Mateo</option>
            <option value="/Matthew">Matthew</option>
            <option value="/Max">Max</option>
            <option value="/Nicolas">Nicolas</option>
            <option value="/Paul">Paul</option>
            <option value="/Ron">Ron</option>
        </select>
    );
}

export default PageDropdown;
