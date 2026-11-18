import React, { useState } from 'react';
import './Header.css';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import PageDropdown from './PageDropdown';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { useTheme } from './ThemeContext';

function Header() {
    const navigate = useNavigate();
    const [selectedPage, setSelectedPage] = useState('/');
    const { currentUser, startSwitch } = useUser();
    const { themeId, changeTheme, themes } = useTheme();
    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleHomeClick = () => {
        setSelectedPage('/');
        navigate('/');
    };

    const handleProfileClick = (e) => setMenuAnchor(e.currentTarget);
    const handleMenuClose = () => setMenuAnchor(null);
    const handleChangeIdentity = () => { handleMenuClose(); startSwitch(); };
    const handleThemeChange = (id) => { handleMenuClose(); changeTheme(id); };

    return (
        <div className="header-container">
            <Button
                onClick={handleHomeClick}
                variant="outlined"
                className="header-button"
                startIcon={<HomeIcon />}
                sx={{
                    borderColor: 'var(--theme-primary)',
                    backgroundColor: 'var(--theme-bg)',
                    color: 'var(--theme-primary)',
                    borderWidth: '2px',
                    height: '36px',
                    marginRight: '20px',
                    '&:hover': { backgroundColor: 'var(--theme-primary)', color: 'var(--theme-bg)' },
                }}
            >
                Home
            </Button>
            <p className="header-text">SHOP FOR:</p>
            <PageDropdown selectedPage={selectedPage} setSelectedPage={setSelectedPage}/>
            {currentUser && (
                <>
                    <Button
                        onClick={handleProfileClick}
                        startIcon={<AccountCircleIcon />}
                        sx={{
                            marginLeft: 'auto',
                            color: 'var(--theme-primary)',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                        }}
                    >
                        {currentUser}
                    </Button>
                    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleChangeIdentity} sx={{ color: 'var(--theme-primary)' }}>
                            Change Identity
                        </MenuItem>
                        <Divider />
                        <ListSubheader sx={{ lineHeight: '32px', fontSize: '0.75rem', color: '#888' }}>
                            Theme
                        </ListSubheader>
                        {Object.entries(themes).map(([id, theme]) => (
                            <MenuItem
                                key={id}
                                onClick={() => handleThemeChange(id)}
                                sx={{
                                    color: 'var(--theme-primary)',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    gap: 2,
                                    minWidth: 180,
                                }}
                            >
                                {theme.name}
                                {themeId === id
                                    ? <CheckIcon fontSize="small" />
                                    : <CheckIcon fontSize="small" sx={{ visibility: 'hidden' }} />
                                }
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            )}
        </div>
    );
}

export default Header;
