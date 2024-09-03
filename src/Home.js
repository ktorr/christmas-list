import React from 'react';
import './Home.css';
import Names from './Names';


function Home() {
    return (
        <div className="home-container">
            <div className="banner">
                <h1 className="title">Christmas Wish Lists</h1>
            </div>
            <div>
                <Names/>
            </div>
        </div>
    );
  }
  
  export default Home;