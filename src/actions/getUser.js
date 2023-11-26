import axiosApi from "../api/axiosApi";

const getUser = async (id) => {
    let user;
    try {       
        const res = await axiosApi.get(`/users/${id}`);
        user = res.data
    } catch (error) {
        console.log(error)
    }

    return user;
};

export default getUser;