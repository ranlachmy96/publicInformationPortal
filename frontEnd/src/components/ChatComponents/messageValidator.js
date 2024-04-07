import axios from 'axios';

async function Validate(message) {
    const options = {
        method: 'POST',
        url: 'https://comprehend-it.p.rapidapi.com/predictions/ml-zero-nli-model',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'db6562e42bmsh58cdf15d9ea7e92p197a88jsnff808b80a1e8',
            'X-RapidAPI-Host': 'comprehend-it.p.rapidapi.com'
        },
        data: {
            labels: [
                'emergency related',
                'Not emergency related'
            ],
            text: `${message}`
        }
    };

    try {
        const response = await axios.request(options);
        return response.data.outputs['emergency related'] > response.data.outputs['Not emergency related'];
    } catch (error) {
        return 'error'
    }
}

export default Validate;