// import React from 'react';
// import { useParams } from 'react-router-dom';
// import useFirestore from '../useFirestore';
// import './People.css';

// function WishList() {
//     const { pageId } = useParams(); // Get the current page ID from the path
//     const { items } = useFirestore(); // Fetch all lists

//     // Filter items based on the current pageId
//     const filteredItems = items.filter(item => item.owner === pageId);

//     return (
//         <div className="body">
//             <div className="banner">
//                 <h1 className="title">{pageID}</h1>
//             </div>
//             <div className="list-container">
//                 <div className="list-section">
//                     <div className="list-header">
//                         <h2>{pageId}'s List</h2>
//                         <AddButton listID={listID}/>
//                     </div>
//                     <ul className="unpurchased-list">
//                         {items.filter(item => !item.purchased).map(item => (
//                             <li className="unpurchased-items" key={item.id}>
//                             <MoveButton item={item} onMove={handleMove}/>
//                             <EditButton item={item} onSave={handleSave}/>
//                             <DeleteButton item={item} onDelete={handleDelete}/>
//                             {item.link ? (<a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>) : (item.name)}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 <div className="list-section">
//                     <div className="list-header">
//                         <h2>Purchased</h2>
//                     </div>
//                     <ul className="purchased-list">
//                         {items.filter(item => item.purchased).map(item => (
//                             <li key={item.id} className="purchased-items">
//                                 <MoveButton item={item} onMove={handleMove}/>
//                                 <DeleteButton item={item} onDelete={handleDelete}/>
//                                 {item.link ? (<a href={item.link} target="_blank" rel="noopener noreferrer">{item.name}</a>) : (item.name)}
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default WishList;
