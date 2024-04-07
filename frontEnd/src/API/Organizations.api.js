import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = "https://publicinformationportal.onrender.com";

export const GetAllOrganizations = async () => {
    const res = await axios.get(baseUrl + "/Organizations", {withCredentials: true})
    return res.data;
};

export const GetOrganizationById = async (_id) => {
    return await axios.get(`${baseUrl}/Organizations/${_id}`);
};

export const deleteOrganization = async (_id) =>{
    try{
        return await axios.delete(`${baseUrl}/Organizations/${_id}`);
    } catch (error){
        console.log("Error deleting Organization case", error);
    }
};

export const CreateOrganization = async (formData) => {
    try {
        const weatherUpdateCase = JSON.parse(formData);
        const promise = await axios.post(`${baseUrl}/Organizations`, weatherUpdateCase);
        return promise.data;
    } catch (error) {
        console.log("Error creating Organization case", error);
    }
}
export const UpdateOrganization = async (weather) => {
    try {
        const response = await axios.put(
            `${baseUrl}/Organizations/${weather._id}`, weather);
        return response.data;
    } catch (error) {
        console.error("Error updating Organization case:", error);
    }
};



