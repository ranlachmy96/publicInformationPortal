import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = "https://publicinformationportal.onrender.com";

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
