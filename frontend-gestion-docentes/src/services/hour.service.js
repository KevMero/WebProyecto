import axios from 'axios';
import { API_HOST } from "../utils/constant";



export const inputHour = async cedula => {
    try {
        const response = await axios.post(`${API_HOST}/hour-input/${cedula}`);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}
export const outputHour = async cedula => {
    try {
        const response = await axios.post(`${API_HOST}/hour-output/${cedula}`);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}
export const calculatePayment = async (id, month) => {
    try {
        const response = await axios.post(`${API_HOST}/calculate/${id}/${month}`);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}


  