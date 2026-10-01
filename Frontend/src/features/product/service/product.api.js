import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/products",
    withCredentials: true
})


export async function createProduct(formdata){
    const response = await axiosInstance.post('/', formdata);
    return response.data
}

export async function getSellerProducts(){
    const response = await axiosInstance.get('/seller');
    return response.data;
}