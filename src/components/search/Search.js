import React from 'react';
// import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';
import SearchInputs from './SearchInputs';
import SearchResults from './SearchResults';
import SearchBuyResults from './SearchBuyResult';
import SearchBuyInputs from './SearchBuyInputs';
import axiosApi from '../../api/axiosApi';
import useTitle from '../../hooks/useTitle';

const Search = () => {
    useTitle('Search properties');
    
    const [rents, setRents] = React.useState(null);
    const [sales, setSales] = React.useState(null);
    const [rentProps, setRentProps] = React.useState(rents);
    const [salesProps, setSalesProps] = React.useState(sales);
    const [state, setState] = React.useState('');
    const [buyState, setBuyState] = React.useState('');
    const [town, setTown] = React.useState('');
    const [buyTown, setBuyTown] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [buyPrice, setBuyPrice] = React.useState(0);
    const [isSearch, setIsSearch] = React.useState(false);
    const [isBuySearch, setIsBuySearch] = React.useState(false);
    const [isToggleSearch, setIsToggleSearch] = React.useState(true);

    React.useEffect(() => {
        const getAllProps = async () => {
            try {               
                const res = await axiosApi.get('/rent/props');
                setRents(res.data);
            } catch (error) {
                console.log(error)
            }
        }

        getAllProps();
    }, []);

    React.useEffect(() => {
        const getAllProps = async () => {
            try {
                const res = await axiosApi.get('/buy/props');
                setSales(res.data);
            } catch (error) {
                console.log(error);
            }
        }     

        getAllProps();
    }, []);

    const filteredRents = rents?.filter(prop => (
        (prop.location.state || prop.location.town)
            .toLowerCase()
        ).includes((state || town).toLowerCase())
    );

    const searchPrice = rents?.filter(prop => {
        return prop.fee <= price
    })

    const filteredSales = sales?.filter(prop => (
        (prop?.location.state || prop.location.town)
            .toLowerCase()
        ).includes((buyState || buyTown).toLowerCase())
    );

    const searchBuyPrice = sales?.filter(prop => {
        return prop.price <= buyPrice
    });


    React.useEffect(() => {
        if (state || town) {
            setRentProps(filteredRents)
            setIsSearch(true);
        } else {
            setIsSearch(false);
        }

        // eslint-disable-next-line 
    }, [state, town]);


    React.useEffect(() => {
        if (buyState || buyTown) {
            setIsBuySearch(true);
            setSalesProps(filteredSales);
        } else {
            setIsBuySearch(false)
        }

        // eslint-disable-next-line 
    }, [buyState, buyTown]);


    React.useEffect(() => {
        if (price) {
            setIsSearch(true);
            setRentProps(searchPrice);

        } else {
            return setIsBuySearch(false);
        }

        // eslint-disable-next-line 
    }, [ price]);

    React.useEffect(() => {
        if (buyPrice) {
            setIsBuySearch(true);
            setSalesProps(searchBuyPrice);
        } else {
            return setIsSearch(false);
        }

        // eslint-disable-next-line 
    }, [buyPrice]);


    if (!rents?.length || !sales?.length) {
        return (
            <main className='search-main main-con flex-col'>
                <div className="search-options flex-cen">
                    <button 
                        className={isToggleSearch ? 'buy-search-btn' : ''}
                        onClick={() => {
                            setIsToggleSearch(true)
                            setIsSearch(false)
                        }}
                    >
                        Purchase
                    </button>
                    <button 
                        className={!isToggleSearch ? 'rent-search-btn' : ''}
                        onClick={() => {
                            setIsToggleSearch(false)
                            setIsBuySearch(false)
                        }}
                    >
                        Rent
                    </button>
                </div>
                {isToggleSearch ? (
                    <SearchBuyInputs buyState
                        state={buyState} setState={setBuyState}
                        town={buyTown} setTown={setBuyTown}
                        price={buyPrice} setPrice={setBuyPrice}
                    /> 
                ) : (
                    <SearchInputs 
                        state={state} setState={setState} 
                        town={town} setTown={setTown}
                        price={price} setPrice={setPrice}
                    />
                )}
                <div>
                    <h5>No Searched Properties</h5>
                </div>
            </main>
        );
    }

    return (
        <main className='search-main main-con flex-col'>
            <div className="search-options flex-cen">
                <button 
                    className={isToggleSearch ? 'buy-search-btn' : ''}
                    onClick={() => {
                        setIsToggleSearch(true)
                        setIsSearch(false)
                    }}
                >
                    Purchase
                </button>
                <button 
                    className={!isToggleSearch ? 'rent-search-btn' : ''}
                    onClick={() => {
                        setIsToggleSearch(false)
                        setIsBuySearch(false)
                    }}
                >
                    Rent
                </button>
            </div>
            {isToggleSearch ? (
                <SearchBuyInputs buyState
                    state={buyState} setState={setBuyState}
                    town={buyTown} setTown={setBuyTown}
                    price={buyPrice} setPrice={setBuyPrice}
                /> 
            ) : (
                <SearchInputs 
                    state={state} setState={setState} 
                    town={town} setTown={setTown}
                    price={price} setPrice={setPrice}
                />
            )}
            <div className="search-search-results">
                {isBuySearch && (
                    <SearchBuyResults 
                        props={salesProps} 
                    />
                )}
            </div>
            <div className="search-search-results">
                {isSearch && (
                    <SearchResults 
                        props={rentProps} 
                    />
                )}
            </div>
        </main>
    );

}

export default Search;