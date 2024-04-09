/***************************************************************
 * Import Dependencies
 ***************************************************************/
import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { GetAllInstructions } from '../../API/SafetyInstruction.api.js';
/***************************************************************
 * Component: SafetyInstructionPage
 * - Renders a page displaying information about safety instructions during crisis
 * - Fetches instructions data using GetAllInstructions
 ***************************************************************/
const SafetyInstructionPage = () => {
    const [value, setValue] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedInstruction, setSelectedInstruction] = useState(null);
    const [categoryImages, setCategoryImages] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const instructions = await GetAllInstructions();
                const uniqueCategories = [...new Set(instructions.map(instruction => instruction.category))];
                setCategories(uniqueCategories);

                const images = {};
                uniqueCategories.forEach(category => {
                    images[category] = `/instructions/${category.toLowerCase()}.png`;
                });
                setCategoryImages(images);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchInstruction = async () => {
            try {
                if (categories.length > 0) {
                    const instructions = await GetAllInstructions();
                    const selectedCategoryInstructions = instructions.filter(instruction => instruction.category === categories[value]);
                    setSelectedInstruction(selectedCategoryInstructions[0]);
                }
            } catch (error) {
                console.error('Error fetching instructions:', error);
            }
        };

        fetchInstruction();
    }, [value, categories]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div data-testid={'safetyInstructionPage'}
            style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <React.Fragment>
                    <Box sx={{ maxWidth: { xs: 320, sm: 980 }, bgcolor: 'background.paper' }}>
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
                                    border: 'none',
                                    outline: 'none',
                                },
                                '& .MuiTab-root.Mui-selected': {
                                    fontWeight: 'bold',
                                },
                            }}
                        >
                            {categories.map((category, index) => (
                                <Tab key={index} label={category} />
                            ))}
                        </Tabs>
                    </Box>
                    {selectedInstruction && (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
                            <div style={{ width: '50%', padding: '20px' }}>
                                <img src={categoryImages[selectedInstruction.category]} alt="Instruction"
                                    style={{ width: '100%' }} />
                            </div>
                            <div style={{
                                width: '50%',
                                maxHeight: '90%',
                                textAlign: 'left',
                                paddingLeft: '1.5%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}>
                                <h2 style={{
                                    color: '#486284',
                                    fontWeight: 'bold',
                                    fontSize: '37px',
                                    margin: '0',
                                    marginTop: '2%'
                                }}>{selectedInstruction.title}</h2>
                                <p style={{ margin: '0', color: '#486284' }}>Last Updated: {selectedInstruction.date}</p>
                                <p style={{ color: '#8CA2C0' }}>{selectedInstruction.description}</p>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};

export default SafetyInstructionPage;
