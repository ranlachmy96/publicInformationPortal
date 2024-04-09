/***************************************************************
 * Import Dependencies
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterListIcon from '@mui/icons-material/FilterList';
import LinearProgress from '@mui/material/LinearProgress';
import { GetAllAlerts, deleteAlert, UpdateAlert } from '../../API/Alerts.api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Button,
} from '@mui/material';
/***************************************************************
 * Function to Create Row Data
 * - Creates a row object from alert data
 ***************************************************************/
function createData(_id, description, date, priority) {
    return { _id, description, date, priority };
}
/***************************************************************
 * Component: AlertsPage
 * - Renders a page displaying alerts in a table
 * - Allows deleting and editing alerts
 ***************************************************************/
export default function AlertsPage() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editedRowData, setEditedRowData] = useState(null);

    const priorityIcons = {
        'Low': <FontAwesomeIcon icon={faExclamationTriangle} color="green" />,
        'Medium': <FontAwesomeIcon icon={faExclamationTriangle} color="orange" />,
        'High': <FontAwesomeIcon icon={faExclamationTriangle} color="red" />,
    };
    /***************************************************************
     * Function to Fetch Data
     * - Fetches all alerts from the API and sets them in state
     ***************************************************************/
    const fetchData = async () => {
        setLoading(true);
        try {
            const allAlerts = await GetAllAlerts();
            const allAlertsData = allAlerts.map(alert => {
                return createData(alert._id, alert.description, alert.date, alert.priority);
            });
            setRows(allAlertsData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    /***************************************************************
     * Delete selected rows
     ***************************************************************/
    const handleDeleteSelectedRows = async () => {
        selected.forEach(async _id => {
            await deleteAlert(_id);
        });
        const newRows = rows.filter(row => !selected.includes(row._id));
        setRows(newRows);
        setSelected([]);
    };
    /***************************************************************
     * Edit selected rows
     ***************************************************************/
    const handleEditSelectedRows = () => {
        const selectedRow = rows.find(row => selected.includes(row._id));
        if (selectedRow) {
            setEditedRowData(selectedRow);
            setOpenEditDialog(true);
        }
    };
    /***************************************************************
     * Close edit dialog
     ***************************************************************/
    const handleEditDialogClose = () => {
        setOpenEditDialog(false);
    };
    /***************************************************************
     * Save edited row data
     ***************************************************************/
    const handleEditDialogSave = async () => {
        try {
            await UpdateAlert(editedRowData);
            console.log('Row updated successfully:', editedRowData);
            setOpenEditDialog(false);
            fetchData();
        } catch (error) {
            console.error('Error updating row:', error);
        }
    };
    /***************************************************************
     * Change page
     ***************************************************************/
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    /***************************************************************
     * Change rows per page
     ***************************************************************/
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    /***************************************************************
     * Handle row click
     ***************************************************************/
    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
    /***************************************************************
     * Check if a row is selected
     ***************************************************************/
    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    return (
        <div style={{ width: '70vw' }}>
            <TableContainer component={Paper} sx={{ width: '100%' }}>
                {loading && (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                )}
                <Toolbar>
                    {selected.length > 0 ? (
                        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1">
                            {selected.length} selected
                        </Typography>
                    ) : (
                        <Typography sx={{ flex: '1 1 100%' }} variant="h6">
                            Alerts
                        </Typography>
                    )}
                    {selected.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Tooltip title="Delete">
                                <IconButton onClick={handleDeleteSelectedRows}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                                <IconButton onClick={handleEditSelectedRows}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        <Tooltip title="Filter list">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Toolbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    indeterminate={selected.length > 0 && selected.length < rows.length}
                                    checked={selected.length === rows.length}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            const newSelected = rows.map(row => row._id);
                                            setSelected(newSelected);
                                        } else {
                                            setSelected([]);
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Priority</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const isItemSelected = isSelected(row._id);
                            return (
                                <TableRow
                                    hover
                                    onClick={(event) => handleClick(event, row._id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    key={row._id}
                                    selected={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isItemSelected}
                                            inputProps={{ 'aria-labelledby': row._id }}
                                        />
                                    </TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{priorityIcons[row.priority]}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
                <DialogTitle>Edit Row</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                        value={editedRowData ? editedRowData.description : ''}
                        onChange={(e) => setEditedRowData({ ...editedRowData, description: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        id="date"
                        label="Date"
                        type="date"
                        fullWidth
                        value={editedRowData ? editedRowData.date : ''}
                        onChange={(e) => setEditedRowData({ ...editedRowData, date: e.target.value })}
                    />
                    <FormControl component="fieldset" style={{ marginTop: 16 }}>
                        <FormLabel component="legend">Priority</FormLabel>
                        <RadioGroup
                            row
                            aria-label="priority"
                            name="priority"
                            value={editedRowData ? editedRowData.priority : ''}
                            onChange={(e) => setEditedRowData({ ...editedRowData, priority: e.target.value })}
                        >
                            <FormControlLabel value="Low" control={<Radio />} label="Low" />
                            <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                            <FormControlLabel value="High" control={<Radio />} label="High" />
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditDialogClose}>Cancel</Button>
                    <Button onClick={handleEditDialogSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
