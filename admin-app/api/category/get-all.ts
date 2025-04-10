import axios from "../axios";

const getAllCategory = async () => {
    const getAll = await axios.get('/cms-category/getAll');
    return getAll;
}
export default getAllCategory;