import axios from 'axios';
import { API_HOST } from "../utils/constant";



export const RegisterEmployee = async employee => {
    try {
        const response = await axios.post(`${API_HOST}/employee`, employee);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}
export const getEmployees = async () => {
    try {
        const response = await axios.get(`${API_HOST}/employee`);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}
export const getEmployee = async (id) => {
    try {
        const response = await axios.get(`${API_HOST}/employee/${id}`);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}

export const UpdateEmployee = async (id, employee) => {
    try {
        const response = await axios.put(`${API_HOST}/employee/${id}`, employee);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}
export const statusEmployee = async (id) => {
    try {
        const response = await axios.delete(`${API_HOST}/employee/${id}`);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}



  