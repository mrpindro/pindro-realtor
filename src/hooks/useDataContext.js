import { useContext } from "react";
import DataContext from "../context/DataProvider";

const useDataContext = () => {
    return useContext(DataContext);
}

export default useDataContext;