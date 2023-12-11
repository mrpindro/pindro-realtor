import axiosApi from "../api/axiosApi"

const getUsers = async () => {

    try { 
        const { data } = await axiosApi.get('/users');
        return data;
    } catch (error) {
        console.log(error)
    }
    
}

export default getUsers