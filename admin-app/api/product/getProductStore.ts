
export const getProductByStore = async (axiosPrivate: any) => {
    //const axiosPrivate = useAxiosPrivate();
    const res = await axiosPrivate.get('/product/getProductByStore');
    return res;
}