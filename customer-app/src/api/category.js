import makeRequest from '../utils/axios';

export const getAllCategory = async () => {
    console.log("api ne");
    const res = await makeRequest.get('./category/getAll');
    // const res = await makeRequest.get('/api/category');
    console.log("res", res.data);
    return res.data;
}
