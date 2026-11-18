import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useSecretSanta } from '../hooks/useSecretSanta';

const QUESTIONS = [
    { key: 'color',       label: 'Favorite Color' },
    { key: 'candy',       label: 'Favorite Candy or Snacks' },
    { key: 'drinks',      label: 'Favorite Drinks' },
    { key: 'shops',       label: 'Favorite Places to Shop' },
    { key: 'restaurants', label: 'Favorite Restaurants' },
    { key: 'hobbies',     label: 'Hobby / Interests' },
    { key: 'sportsTeam',  label: 'Sports Team(s)' },
    { key: 'moviesBooks', label: 'Favorite Movies / Books' },
    { key: 'scents',      label: 'Favorite Scents' },
    { key: 'sizing',      label: 'Clothing & Shoe Sizing' },
];

function SecretSantaDialog({ open, name, listId, isOwn, onClose }) {
    const { answers, loading, saveAnswers } = useSecretSanta(listId);
    const [draft, setDraft] = useState({});

    useEffect(() => {
        if (open) setDraft({ ...answers });
    }, [open, answers]);

    const handleSave = async () => {
        await saveAnswers(draft);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle sx={{ color: 'var(--theme-primary)', fontWeight: 700, pb: 0 }}>
                🎅 {name}'s Secret Santa Profile
            </DialogTitle>
            <DialogContent sx={{ pt: '16px !important' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress sx={{ color: 'var(--theme-primary)' }} />
                    </Box>
                ) : (
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 2,
                    }}>
                        {QUESTIONS.map(({ key, label }) =>
                            isOwn ? (
                                <TextField
                                    key={key}
                                    label={label}
                                    value={draft[key] || ''}
                                    onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))}
                                    fullWidth
                                    multiline
                                    maxRows={3}
                                    sx={{
                                        '& label.Mui-focused': { color: 'var(--theme-primary)' },
                                        '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: 'var(--theme-primary)' },
                                    }}
                                />
                            ) : (
                                <Box key={key} sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        {label}
                                    </Typography>
                                    <Typography variant="body1" sx={{ color: answers[key] ? 'text.primary' : 'text.disabled', minHeight: '1.5em' }}>
                                        {answers[key] || '—'}
                                    </Typography>
                                </Box>
                            )
                        )}
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                {isOwn ? (
                    <>
                        <Button onClick={onClose} sx={{ color: '#C44D58' }}>Cancel</Button>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            sx={{ backgroundColor: 'var(--theme-primary)', '&:hover': { backgroundColor: 'var(--theme-primary-dark)' } }}
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <Button onClick={onClose} sx={{ color: 'var(--theme-primary)' }}>Close</Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

export default SecretSantaDialog;
