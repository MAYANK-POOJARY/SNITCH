import axios from "axios"

const axiosInstance = axios.create({
    baseURL:"/api/auth",
    withCredentials: true
})

export async function register ({email, password, contact, fullName, isSeller}){
    const response = await axiosInstance.post('/register', {email, password, contact, fullName, isSeller});
    console.log(response.data)
    return response.data
}

export async function login({email, password}){
    const response = await axiosInstance.post('/login', {email, password});
    console.log(response.data)
    return response.data
}