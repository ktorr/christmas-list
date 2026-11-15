import React, { useState, useContext } from 'react';
import './People.css';
import useFirestore from '../useFirestore';
import useReservation from '../hooks/useReservation';
import { UserContext } from '../UserContext';
import ItemGrid from './ItemGrid';
import ItemAddDialog from '../dialogs/ItemAddDialog';
import ItemEditDialog from '../dialogs/ItemEditDialog';
import ReserveDialog from '../dialogs/ReserveDialog';
import PurchaseDialog from '../dialogs/PurchaseDialog';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function ListPage({ name, listId }) {
    const { currentUser } = useContext(UserContext);
    const isOwnList = currentUser === name;
    const { items, addItem, editItem, deleteItem, markPurchased, reorderItems } = useFirestore(listId);
    const { reserveItem, unreserveItem } = useReservation(listId);

    const [isEditMode, setIsEditMode] = useState(false);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editTargetItem, setEditTargetItem] = useState(null);
    const [reserveDialogOpen, setReserveDialogOpen] = useState(false);
    const [reserveTargetItem, setReserveTargetItem] = useState(null);
    const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
    const [purchaseTargetItem, setPurchaseTargetItem] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'error' });

    const closeSnackbar = () => setSnackbar(s => ({ ...s, open: false }));

    const handleAdd = (itemName, link, price, imageUrl) => {
        addItem(itemName, link, price, imageUrl);
    };

    const handleEditItem = (item) => {
        setEditTargetItem(item);
        setEditDialogOpen(true);
    };

    const handleEditSave = (id, itemName, link, price, imageUrl) => {
        editItem(id, itemName, link, price, imageUrl);
        setEditDialogOpen(false);
    };

    const handleDeleteItem = (itemId) => {
        setDeleteTargetId(itemId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteItem(deleteTargetId);
        setDeleteDialogOpen(false);
        setDeleteTargetId(null);
    };

    const handleReserve = (item) => {
        setReserveTargetItem(item);
        setReserveDialogOpen(true);
    };

    const handleReserveConfirm = async (reserverName) => {
        setReserveDialogOpen(false);
        const result = await reserveItem(reserveTargetItem.id, reserverName);
        setReserveTargetItem(null);
        if (!result.success) {
            if (result.limitReached) {
                setSnackbar({
                    open: true,
                    message: 'Please add more items to your list to reserve more items.',
                    severity: 'warning',
                });
            } else {
                setSnackbar({
                    open: true,
                    message: 'Failed to reserve item. Please try again.',
                    severity: 'error',
                });
            }
        }
    };

    const handleUnreserve = async (itemId) => {
        const result = await unreserveItem(itemId);
        if (!result.success) {
            setSnackbar({ open: true, message: 'Failed to un-reserve item. Please try again.', severity: 'error' });
        }
    };

    const handlePurchased = (item) => {
        setPurchaseTargetItem(item);
        setPurchaseDialogOpen(true);
    };

    const handlePurchaseConfirm = () => {
        markPurchased(purchaseTargetItem.id);
        setPurchaseDialogOpen(false);
        setPurchaseTargetItem(null);
    };

    const handleReorderComplete = (reorderedIds) => {
        reorderItems(reorderedIds);
    };

    return (
        <div className="list-page-body">
            <div className="banner">
                <h1 className="title">{name}</h1>
            </div>

            {isOwnList && (
                <div className="list-toolbar">
                    {isEditMode ? (
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={() => setIsEditMode(false)}
                            sx={{ backgroundColor: '#1A4568', '&:hover': { backgroundColor: '#0d2d45' } }}
                        >
                            Save
                        </Button>
                    ) : (
                        <>
                            <Button
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={() => setIsEditMode(true)}
                                sx={{ color: '#1A4568', borderColor: '#1A4568' }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                onClick={() => setAddDialogOpen(true)}
                                sx={{ backgroundColor: '#1A4568', '&:hover': { backgroundColor: '#0d2d45' } }}
                            >
                                Add Item
                            </Button>
                        </>
                    )}
                </div>
            )}

            <ItemGrid
                items={items}
                isOwnList={isOwnList}
                isEditMode={isEditMode}
                currentUser={currentUser}
                onReserve={handleReserve}
                onUnreserve={handleUnreserve}
                onPurchased={handlePurchased}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
                onReorderComplete={handleReorderComplete}
            />

            <ItemAddDialog
                open={addDialogOpen}
                onAdd={handleAdd}
                onClose={() => setAddDialogOpen(false)}
            />

            <ItemEditDialog
                open={editDialogOpen}
                item={editTargetItem}
                onSave={handleEditSave}
                onClose={() => setEditDialogOpen(false)}
            />

            <ReserveDialog
                open={reserveDialogOpen}
                item={reserveTargetItem}
                currentUser={currentUser}
                onConfirm={handleReserveConfirm}
                onClose={() => { setReserveDialogOpen(false); setReserveTargetItem(null); }}
            />

            <PurchaseDialog
                open={purchaseDialogOpen}
                item={purchaseTargetItem}
                onConfirm={handlePurchaseConfirm}
                onClose={() => { setPurchaseDialogOpen(false); setPurchaseTargetItem(null); }}
            />

            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ color: '#1A4568', fontWeight: 700 }}>Delete Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: '#1A4568' }}>Cancel</Button>
                    <Button
                        onClick={handleDeleteConfirm}
                        variant="contained"
                        sx={{ backgroundColor: '#C44D58', '&:hover': { backgroundColor: '#a63d49' } }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity={snackbar.severity} onClose={closeSnackbar} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ListPage;
