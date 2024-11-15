import axios from "axios";
import store from '../redux/store'


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})


axiosInstance.interceptors.request.use(
    (config) => {
        const {adminSignin, userSignin} = store.getState()

        const userType = config.userType;

        let token = null

        if(userType == 'admin'){
            token = adminSignin?.adminToken
        }else if(userType == 'user'){
            token = userSignin?.token
        }

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => Promise.reject(error)
)



axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const { data } = await axiosInstance.post('http://localhost:3000/refresh-token');
  
          Cookies.set("accessToken", data.newAccessToken, {
            path: "/",
            sameSite: "None",
            secure: true,
        });
  
          originalRequest.headers.Authorization = `Bearer ${data.newAccessToken}`;
  
          return axiosInstance(originalRequest);
        } catch (err) {
            console.log(err)
          
          Cookies.remove("accessToken", {
            path: "/",
            sameSite: "None",
            secure: true,
        });
          window.location.href = '/login'; 
  
          return Promise.reject(err);
        }
      }
  
      return Promise.reject(error);
    }
  );
  


export default axiosInstance