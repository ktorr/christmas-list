import React, { useState} from 'react';
import './People.css';
import AddButton from '../Buttons/AddButton';
import useFirestore from '../useFirestore';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import MoveButton from '../Buttons/MoveButton';

function Kennedy() {
    // const { items } = useFirestore('listItems');
    const { items, editItem, deleteItem, moveItem } = useFirestore('listItems');
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSave = (id, name, link) => {
        editItem(id, name, link);
        setSelectedItem(null); // Clear selected item after saving
    };

    const handleDelete = (id) => {
        deleteItem(id);
    };

    const handleMove = (id, name, link, purchased) => {
        moveItem(id, name, link, !purchased);
    };

    return (
        <div className="body">
            <div className="banner">
                <h1 className="title">Kennedy</h1>
            </div>
            <div className="list-container">
                <div className="list-section">
                    <div className="list-header">
                        <h2>List</h2>
                        <AddButton/>
                    </div>
                    <ul className="unpurchased-list">
                        {items.filter(item => !item.purchased).map(item => (
                            <li className="unpurchased-items" key={item.id}>
                            <MoveButton item={item} onMove={handleMove}/>
                            <EditButton item={item} onSave={handleSave}/>
                            <DeleteButton item={item} onDelete={handleDelete}/>
                            {item.link ? (<a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>) : (item.name)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="list-section">
                    <div className="list-header">
                        <h2>Purchased</h2>
                    </div>
                    <ul className="purchased-list">
                        {items.filter(item => item.purchased).map(item => (
                            <li key={item.id} className="purchased-items">
                                <MoveButton item={item} onMove={handleMove}/>
                                <DeleteButton item={item} onDelete={handleDelete}/>
                                {item.link ? (<a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>) : (item.name)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
  }
  
  export default Kennedy;