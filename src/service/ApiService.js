import axios, { AxiosInstance } from 'axios'
 
class ApiService {
 

    axiosInstance=null;
    constructor() {
        this.axiosInstance = axios.create();
        this.baseUrl='https://baseurl.com/'
        this.axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
        this.axiosInstance.interceptors.response.use((resp) => {
            return resp
        }, (error) => {

            if (error && error.response && error.response.status && 401 === error.response.status) {
                console.log("Session Expired")
                
            } else {
                return Promise.reject(error);
            }
        });
    }

    get(url, disableconfg,config) {
        let _confg = {}
        if (!disableconfg) {
            _confg = this.getConfig();
        }
        console.log(this.baseUrl+url)
        return this.axiosInstance.get(this.baseUrl+url, _confg);
    }

    post(url, data, disableconfg) {
        let _confg = {}
        if (!disableconfg) {
            _confg = this.getConfig();
        }
           
        return this.axiosInstance.post(this.baseUrl+url, data, _confg);
    }

     getConfig() {
        var config;
        config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('bearerToken')
            }
        }
        return config;
    }
  
   _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('Token');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      alert(error)
    }
  };


}
export default new ApiService;