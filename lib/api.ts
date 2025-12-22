import axios from "axios";

// Create a reusable axios instance 
const api = axios.create({ 
    baseURL: "http://127.0.0.1:8000/api", 
    headers: { "Content-Type": "application/json", }, 
});


// Register 
export async function registerUser(data: { 
    name: string; 
    email: string; 
    password: string; 
}) { 
    const response = await api.post("/register", data); 
    return response.data; 
}

// Login 
export async function loginUser(data: {
     email: string;
    password: string;
}) {
    const response = await api.post("/login", data);
    return response.data;
}


// Example: Get profile
export async function getProfile() {
    const response = await api.get("/profile");
    return response.data;
}