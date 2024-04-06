import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {GetAllInstructions} from '../../API/SafetyInstruction.api.js';

const SafetyInstructionPage = () => {
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const instructions = await GetAllInstructions();
                const uniqueCategories = [...new Set(instructions.map(instruction => instruction.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%'}}>
            <Box sx={{maxWidth: {xs: 320, sm: 980}, bgcolor: 'background.paper'}}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor=""
                    textColor=""
                    aria-label="scrollable auto tabs example"
                    sx={{
                        '& .MuiTab-root': {
                            border: 'none', // Remove all borders from the tabs
                            outline: 'none', // Remove outline when tab is focused
                        },
                        '& .MuiTab-root.Mui-selected': {
                            fontWeight: 'bold', // Make text bold when tab is selected
                        },
                    }}
                >
                    {categories.map((category, index) => (
                        <Tab key={index} label={category} />
                    ))}
                </Tabs>
            </Box>
        </div>
    );
};

export default SafetyInstructionPage;
