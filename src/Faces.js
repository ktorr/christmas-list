import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import KennedyPic from './Pictures/Kennedy.JPG';
import GracePic from './Pictures/Grace.jpg';
import NicolasPic from './Pictures/Nicolas.jpg';

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
    ];

    const navigate = useNavigate();

    return (
        <div className="name-container">
            <ul className="unordered-list">
                {names.map((name, index) => (
                    <li key={index} className="list-item">
                        {/* <img onClick={() => {navigate(paths[index]);}} src={img} alt={`Image ${index + 1}`} 
                        className="image"/> */}
                        <span onClick={() => {navigate(paths[index]);}} className="name-decoration">
                            {name}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ImageGrid;