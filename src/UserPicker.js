import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useUser } from './UserContext';

const NAMES = [
    'Aba', 'Abu', 'Anthony', 'Bill', 'Emmie', 'Evelyn', 'Grace', 'John',
    'Kennedy', 'Lynda', 'Madison', 'Maria', 'Mateo', 'Matthew', 'Max',
    'Nicolas', 'Paul', 'Ron'
];

function UserPicker() {
    const { currentUser, updateUser, switchingIdentity, cancelSwitch } = useUser();
    const [selected, setSelected] = useState(NAMES[0]);
    const isSwitching = switchingIdentity && !!currentUser;
    const open = !currentUser || switchingIdentity;

    return (
        <Dialog open={open} disableEscapeKeyDown={!isSwitching}>
            <DialogTitle sx={{ color: 'var(--theme-primary)', fontWeight: 700 }}>
                {isSwitching ? 'Change Identity' : 'Who are you?'}
            </DialogTitle>
            <DialogContent>
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px',
                        fontSize: '1rem',
                        borderColor: 'var(--theme-primary)',
                        borderWidth: '2px',
                        borderRadius: '4px',
                        color: 'var(--theme-primary)',
                        cursor: 'pointer',
                    }}
                >
                    {NAMES.map(name => (
                        <option key={name} value={name}>{name}</option>
                    ))}
                </select>
            </DialogContent>
            <DialogActions>
                {isSwitching && (
                    <Button onClick={cancelSwitch} sx={{ color: '#C44D58' }}>
                        Cancel
                    </Button>
                )}
                <Button
                    onClick={() => updateUser(selected)}
                    sx={{ backgroundColor: 'var(--theme-primary)', color: 'white', '&:hover': { backgroundColor: 'var(--theme-primary-dark)' } }}
                >
                    {isSwitching ? 'Confirm' : "Let's go!"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserPicker;
