import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const families = [
    { surname: 'Reyes',   members: ['Aba', 'Abu'] },
    { surname: 'McKeon',  members: ['Maria', 'Ron', 'Emmie', 'Bill', 'Anthony'] },
    { surname: 'Torrent', members: ['Grace', 'John', 'Madison', 'Max', 'Kennedy'] },
    { surname: 'Dunne',   members: ['Lynda', 'Mateo', 'Evelyn', 'Paul', 'Matthew', 'Nicolas'] },
];

function ImageGrid() {
    const navigate = useNavigate();

    return (
        <div className="scroll-wrapper">
            <div className="scroll">
                <h2 className="scroll-title">Santa's Nice List</h2>
                <div className="family-grid">
                    {families.map(family => (
                        <div className="family-column" key={family.surname}>
                            <h3 className="family-header">{family.surname}</h3>
                            <ul className="family-names">
                                {family.members.map(member => (
                                    <li
                                        key={member}
                                        className="family-name"
                                        onClick={() => navigate('/' + member)}
                                    >
                                        {member}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ImageGrid;
