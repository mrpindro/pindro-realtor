import axiosApi from "../api/axiosApi";

const getRents = async () => {
    try {
        const { data } = await axiosApi.get('/rent/props');

        return data;

    } catch (error) {
        console.log(error)
    }
};

export default getRents;