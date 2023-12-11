import axiosApi from "../api/axiosApi";

const getBuys = async () => {
    try {
        const {data} = await axiosApi.get('buy/props');
    
        return data;
    } catch (error) {
        console.log(error);
    }
}

export default getBuys;