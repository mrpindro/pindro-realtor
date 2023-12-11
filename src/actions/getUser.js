import axiosApi from '../api/axiosApi'

const getUser = async (id) => {
    try {
        const user = await axiosApi.get(`users/${id}`)
        return user.data;
    } catch (error) {
        console.log(error)
    }
}

export default getUser;