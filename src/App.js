import React from 'react';
import './App.css';
import Home from './Home';
import Abu from './Lists/Abu';
import Aba from './Lists/Aba';
import Maria from './Lists/Maria';
import Ron from './Lists/Ron';
import Grace from './Lists/Grace';
import John from './Lists/John';
import Lynda from './Lists/Lynda';
import Mateo from './Lists/Mateo';
import Emmie from './Lists/Emmie';
import Anthony from './Lists/Anthony';
import Madison from './Lists/Madison';
import Kennedy from './Lists/Kennedy';
import Evelyn from './Lists/Evelyn';
import Matthew from './Lists/Matthew';
import Nicolas from './Lists/Nicolas';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
          <main>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Abu" element={<Abu/>} />
                  <Route path="/Aba" element={<Aba />} />
                  <Route path="/Maria" element={<Maria />} />
                  <Route path="/Ron" element={<Ron />} />
                  <Route path="/Grace" element={<Grace />} />
                  <Route path="/John" element={<John />} />
                  <Route path="/Lynda" element={<Lynda />} />
                  <Route path="/Mateo" element={<Mateo />} />
                  <Route path="/Emmie" element={<Emmie />} />
                  <Route path="/Anthony" element={<Anthony />} />
                  <Route path="/Madison" element={<Madison />} />
                  <Route path="/Kennedy" element={<Kennedy />} />
                  <Route path="/Evelyn" element={<Evelyn />} />
                  <Route path="/Matthew" element={<Matthew />} />
                  <Route path="/Nicolas" element={<Nicolas />} />
              </Routes>
          </main>
      </div>
    </Router>
  );
}

export default App;
