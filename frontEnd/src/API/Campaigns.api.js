import axios from "axios";
const api = axios.create({baseURL: "https://server-2gwk.onrender.com",});

const GetAllCampaigns = async () => {
    const search = id || '';
    const response = await api.get(/campaigns/${search});
    return response.data;
};


export { GetAllCampaigns };







