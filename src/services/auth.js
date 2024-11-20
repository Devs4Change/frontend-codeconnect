import { apiClient } from "./config"

export const apiSignup = async (payload) => {
    
    return await apiClient.post("/users/register", payload);
}

export const apiLogin = async (payload) => {
    try {
        const response = await apiClient.post("/users/login", payload);
        console.log("Raw login response:", response);
        
        if (!response || !response.data) {
            throw new Error('Invalid response from server');
        }

        const token = response.data.accessToken || response.data.token;
        
        if (!token) {
            console.error("Response structure:", response.data);
            throw new Error('Token not found in response');
        }

        return {
            status: response.status,
            data: {
                token: token,
                email: payload.email
            }
        };
    } catch (error) {
        console.error("Login API Error Details:", {
            message: error.message,
            response: error.response?.data
        });
        throw error;
    }
};

export const apiProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    try {
        const response = await apiClient.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
        }
        throw error;
    }
};

export const apiEditProfile = async (payload) => {
    const token = localStorage.getItem('token');
    return await apiClient.patch("/users/profile", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
}

//implicit return
// export const apiLogin = async (payload) =>  return apiClient.post("/users/signup", payload);
    
