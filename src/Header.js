import React, { useState } from 'react';
import './Header.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PageDropdown from './PageDropdown';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Header() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('/');
    const { currentUser, startSwitch } = useUser();
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleHomeClick = () => {
        setSelectedPage('/');
        navigate('/');
    };

    const handleProfileClick = (e) => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);
    const handleChangeIdentity = () => { handleMenuClose(); startSwitch(); };

    return (
        <div className="header-container">
            <Button onClick={handleHomeClick} variant="outlined" className="header-button" startIcon={<HomeIcon />} sx={{ borderColor: '#1A4568', backgroundColor: '#DAF4FD', color: '#1A4568', borderWidth: '2px', '&:hover': { backgroundColor: '#1A4568', color: '#DAF4FD' } }}>
                Home
            </Button>
            <p className="header-text">SHOP FOR:</p>
            <PageDropdown selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
            {currentUser && (
                <>
                    <Button
                        onClick={handleProfileClick}
                        startIcon={<AccountCircleIcon />}
                        sx={{ marginLeft: 'auto', color: '#1A4568', textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' }}
                    >
                        {currentUser}
                    </Button>
                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleChangeIdentity} sx={{ color: '#1A4568' }}>
                            Change Identity
                        </MenuItem>
                    </Menu>
                </>
            )}
        </div>
    );
}

export default Header;