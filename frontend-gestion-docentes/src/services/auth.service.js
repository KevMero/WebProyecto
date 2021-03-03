import axios from 'axios';
import { API_HOST, ACCESS_TOKEN } from "../utils/constant";
import jwtDecode from 'jwt-decode';



export const RegisterUser = async user => {
    try {
        const response = await axios.post(`${API_HOST}/register`, user);
        return response;

    } catch (error) {

      if (error.response) {
        return error.response.data
        
    }
    return error

    
    }
}


export const login = async (user) => {
    try {      

        const response = await axios.post(`${API_HOST}/login`, user);
        setTokenApi(response.data.token);


        return response

    } catch (error) {
      if (error.response) {
        return error.response.data
        
    }
    return error

    }
}

export function isUserLogedApi() {
    const token = getTokenApi();
  
    if (!token) {
      logoutApi();
      return null;
    }
    if (isExpired(token)) {
      logoutApi();
      return null;
    }
    return jwtDecode(token);
  }
  export function setTokenApi(token) {
    return localStorage.setItem(ACCESS_TOKEN, token);
  }
  export function getTokenApi() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  
  export function logoutApi() {
    localStorage.removeItem(ACCESS_TOKEN);

  }

  function isExpired(token) {
    const { exp } = jwtDecode(token);
    const expire = exp * 1000;
    const timeout = expire - Date.now();
  
    if (timeout < 0) {
      return true;
    }
    return false;
  }
  