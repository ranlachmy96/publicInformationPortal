import axios from 'axios';

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
        const token = localStorage.getItem('token');
        console.log("Token 2: ", token);
        const promise = await axios.post(`${baseUrl}/Users/CheckJwtAuth`);
        if (promise.status === 200) {
            return promise.data;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Expired: ", error);
        navigate('/');
    }
}
