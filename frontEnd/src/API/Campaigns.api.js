import axios from "axios";

const baseUrl = "https://server-2gwk.onrender.com";

export const GetAllCampaigns = async () => {
    const res = await axios.get(baseUrl + "/campaigns", {withCredentials: true})
    return res.data;
};

export const GetCampaignsById = async (_id) => {
    return await axios.get(`${baseUrl}/campaigns/${_id}`);
};

