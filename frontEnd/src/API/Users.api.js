import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

axios.defaults.withCredentials = true;

const baseUrl = "https://publicinformationportal.onrender.com";
// const baseUrl = "http://localhost:3000";

export async function LogIn(formData) {
    try {
        const promise = await axios.post(`${baseUrl}/Users/LogIn`, formData);
        if (promise.status === 200) {
            return promise.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Error creating User case", error);
    }
}

export async function CheckJwtAuth(navigate) {
    try {
        const promise = await axios.post(`${baseUrl}/Users/CheckJwtAuth`);
        if (promise.status === 200) {
            return promise.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Cookie Cleared: ", error);
        navigate('/');
    }
}
