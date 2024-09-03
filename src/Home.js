import React from 'react';
import './Home.css';
import Faces from './Faces';


function Home() {
    return (
        <div className="home-container">
            <div className="banner">
                <h1 className="title">Christmas Wish Lists</h1>
            </div>
            <div>
                <Faces/>
            </div>
        </div>
    );
  }
  
  export default Home;