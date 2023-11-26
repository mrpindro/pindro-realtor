const useFilterPrice = (price) => {
    return (price > 999 && price < 10000 ? 
        `${price.toString().substring(0, 1)}K` :
        price
        && 
        price > 9999 && price < 100000 ? 
        `${price.toString().substring(0, 2)}K` : 
        price
        &&
        price > 99999 && price < 1000000 ? 
        `${price.toString().substring(0, 3)}K` : 
        price
        &&
        price > 999999 && price < 10000000 ?
        `${price.toString().substring(0, 1)}M` :
        price
        &&
        price > 9999999 && price < 100000000 ? 
        `${price.toString().substring(0, 2)}M` :
        price 
        &&
        price > 99999999 && price < 1000000000 ?
        `${price.toString().substring(0, 3)}M` :
        price
    );
}

export default useFilterPrice;