import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = "https://publicinformationportal.onrender.com";

export const GetAllAlerts = async () => {
    const res = await axios.get(baseUrl + "/alerts", {withCredentials: true})
    return res.data;
};

export const GetAlertById = async (_id) => {
    return await axios.get(`${baseUrl}/alerts/${_id}`);
};

export const deleteAlert = async (_id) =>{
    try{
        return await axios.delete(`${baseUrl}/alerts/${_id}`);
    } catch (error){
        console.log("Error deleting alert case", error);
    }
};

export const CreateAlert = async (formData) => {
    try {
        const weatherUpdateCase = JSON.parse(formData);
        const promise = await axios.post(`${baseUrl}/alerts`, weatherUpdateCase);
        return promise.data;
    } catch (error) {
        console.log("Error creating alert case", error);
    }
}
export const UpdateAlert = async (weather) => {
    try {
        const response = await axios.put(
            `${baseUrl}/alerts/${weather._id}`, weather);
        return response.data;
    } catch (error) {
        console.error("Error updating alert case:", error);
    }
};



