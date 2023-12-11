import { useEffect, useState } from "react";
import getRents from "../actions/getRents"

const useRents = () => {
    const [rents, setRents] = useState();

    useEffect(() => {
        const getProps = async () => {
            const props = await getRents();
            setRents(props);
        }

        getProps();
    }, []);

    return [rents]
}

export default useRents