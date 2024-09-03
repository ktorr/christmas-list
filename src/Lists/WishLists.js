import React from 'react';
import { useParams } from 'react-router-dom';
import useFirestore from '../useFirestore';
import './People.css';
import AddButton from '../Buttons/AddButton';
import EditButton from '../Buttons/EditButton';
import DeleteButton from '../Buttons/DeleteButton';
import MoveButton from '../Buttons/MoveButton';

function WishList() {
    const { pageId } = useParams(); // Get the current page ID from the path
    const { list, items, addItem, editItem, deleteItem, moveItem } = useFirestore(pageId);

    return (
        <div className="body">
            <div className="banner">
                <h1 className="title">{list?.owner || 'Loading...'}</h1>
            </div>
            <div className="list-container">
                <div className="list-section">
                    <div className="list-header">
                        <h2>List</h2>
                        <AddButton listID={pageId} addItem={addItem}/>
                    </div>
                    <ul className="unpurchased-list">
                        {items.filter(item => !item.purchased).map(item => (
                            <li className="unpurchased-items" key={item.id}>
                                <MoveButton item={item} onMove={moveItem}/>
                                <EditButton item={item} onSave={editItem}/>
                                <DeleteButton item={item} onDelete={deleteItem}/>
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
                                <MoveButton item={item} onMove={moveItem}/>
                                <DeleteButton item={item} onDelete={deleteItem}/>
                                {item.link ? (<a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>) : (item.name)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default WishList;
