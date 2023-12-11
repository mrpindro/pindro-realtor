import { useEffect, useState } from "react";
import getBuys from "../actions/getBuys"

const useBuys = () => {
    const [buys, setBuys] = useState();

    useEffect(() => {
        const getProps = async () => {
            const props = await getBuys();
            setBuys(props);
        }

        getProps();
    }, []);

    return [buys]
}

export default useBuys