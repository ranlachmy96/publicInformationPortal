import axios from 'axios'

axios.defaults.withCredentials = true;

const baseUrl = "https://publicinformationportal.onrender.com";

export const GetAllInstructions = async () => {
    const res = await axios.get(baseUrl + "/Instructions", {withCredentials: true})
    return res.data;
};

export const GetInstructionById = async (_id) => {
    return await axios.get(`${baseUrl}/Instructions/${_id}`);
};

export const deleteInstruction = async (_id) =>{
    try{
        return await axios.delete(`${baseUrl}/Instructions/${_id}`);
    } catch (error){
        console.log("Error deleting Instruction case", error);
    }
};

export const CreateInstruction = async (formData) => {
    try {
        const weatherUpdateCase = JSON.parse(formData);
        const promise = await axios.post(`${baseUrl}/Instructions`, weatherUpdateCase);
        return promise.data;
    } catch (error) {
        console.log("Error creating Instructions case", error);
    }
}
export const UpdateInstruction= async (weather) => {
    try {
        const response = await axios.put(
            `${baseUrl}/Instructions/${weather._id}`, weather);
        return response.data;
    } catch (error) {
        console.error("Error updating Instructions case:", error);
    }
};



