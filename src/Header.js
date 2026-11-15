import React, { useState } from 'react';
import './Header.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PageDropdown from './PageDropdown';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Header() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('/');
    const { currentUser, clearUser } = useUser();

    const handleHomeClick = () => {
        setSelectedPage('/');
        navigate('/');
    };

    return (
        <div className="header-container">
            <Button onClick={handleHomeClick} variant="outlined" className="header-button" startIcon={<HomeIcon />} sx={{ borderColor: '#1A4568', backgroundColor: '#DAF4FD', color: '#1A4568', borderWidth: '2px', '&:hover': { backgroundColor: '#1A4568', color: '#DAF4FD' } }}>
                Home
            </Button>
            <p className="header-text">SHOP FOR:</p>
            <PageDropdown selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
            {currentUser && (
                <>
                    <p className="header-text" style={{ marginLeft: '15px' }}>👤 {currentUser}</p>
                    <Button onClick={clearUser} size="small" sx={{ color: '#1A4568', fontSize: '0.75rem', textTransform: 'none', minWidth: 'auto', padding: '2px 6px', marginLeft: '4px' }}>
                        Change
                    </Button>
                </>
            )}
        </div>
    );
}

export default Header;