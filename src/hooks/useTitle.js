import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        // const prevTitle =  'Pindro Realtor: ' + document.title;
        const prevTitle =  document.title;

        document.title = 'Pindro Realtor: ' + title;

        return () => document.title = prevTitle;
        
    }, [title]);
    
    return title;
}

export default useTitle;