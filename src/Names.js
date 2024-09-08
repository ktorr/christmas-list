import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function ImageGrid() {
    const names = [
        'Abu',
        'John',
        'Grace',
        'Madison',
        'Kennedy',
        'Aba',
        'Ron',
        'Maria',
        'Emmie',
        'Anthony',
        'Mateo',
        'Lynda',
        'Evelyn',
        'Matthew',
        'Nicolas'
    ];

    const paths = [
        '/Abu',
        '/John',
        '/Grace',
        '/Madison',
        '/Kennedy',
        '/Aba',
        '/Ron',
        '/Maria',
        '/Emmie',
        '/Anthony',
        '/Mateo',
        '/Lynda',
        '/Evelyn',
        '/Matthew',
        '/Nicolas'
    ];

    const navigate = useNavigate();

    return (
        <div className="name-container">
            <ul className="unordered-list">
                {names.map((name, index) => (
                    <li key={index} className="list-item" onClick={() => {navigate(paths[index]);}}>
                        {/* <img onClick={() => {navigate(paths[index]);}} src={img} alt={`Image ${index + 1}`} 
                        className="image"/> */}
                        <span className="name-decoration">
                            {name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImageGrid;