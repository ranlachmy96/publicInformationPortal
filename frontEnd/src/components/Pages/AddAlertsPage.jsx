/***************************************************************
 * Import Dependencies
 ***************************************************************/
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { CreateAlert } from '../../API/Alerts.api';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from "styled-components";

const Title = styled.h3`
    margin-bottom: 10px;
`;

const SuccessMessage = styled.p`
    color: green;
    margin-top: 10px;
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
`;
/***************************************************************
 * Form Component
 * - Renders a form for creating new alerts
 * - Manages form data and submission state
 ***************************************************************/
const Form = () => {
    const [formData, setFormData] = useState({
        description: '',
        date: '',
        priority: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.description || !formData.date || !formData.priority) {
            setError('Please fill out all fields.');
            return;
        }
        try {
            setError('');
            const formattedDate = formData.date.replace('T', ' ').slice(0, 16);
            const formattedFormData = {
                ...formData,
                date: formattedDate
            };
            const response = await CreateAlert(JSON.stringify(formattedFormData));
            console.log("this is my response: ", response);
            setSubmitted(true);
        } catch (error) {
            console.error("Error creating alert:", error);
        }
    };

    return (
        <div>
            <Title>New Alert Form Submission</Title>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 2, width: '90%', display: 'flex', flexDirection: 'column' },
                    textAlign: 'center',
                    border: '1px solid #ccc',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    onChange={handleChange}
                    type='text'
                    name='description'
                    sx={{ width: '100%' }}
                />
                <Divider />
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    onChange={handleChange}
                    type='datetime-local'
                    name='date'
                    InputProps={{
                        startAdornment: (
                            <CalendarTodayIcon color="action" />
                        ),
                    }}
                    sx={{ width: '100%' }}
                />
                <Divider />
                <RadioGroup aria-label="priority" name="priority" value={formData.priority} onChange={handleChange}>
                    <FormControlLabel value="Low" control={<Radio />} label="Low" sx={{ marginLeft: '2px' }} />
                    <FormControlLabel value="Medium" control={<Radio />} label="Medium" sx={{ marginLeft: '2px' }} />
                    <FormControlLabel value="High" control={<Radio />} label="High" sx={{ marginLeft: '2px' }} />
                </RadioGroup>
                <br />
                <Button variant="contained" onClick={handleSubmit} type='submit'>Submit</Button>
                {submitted && <SuccessMessage>Form submitted successfully!</SuccessMessage>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Box>
        </div>
    );
};

export default Form;
