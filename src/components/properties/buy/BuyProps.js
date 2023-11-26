import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaFilterCircleDollar } from 'react-icons/fa6';
import { bathroomsData, endPricesDataM, pricesDataM, roomsData } from '../../../utils/data';
import FilterForm from '../../filter/FilterForm';
import Buy from './Buy';
import '../index.css';
import Pagination from '../../pagination/Pagination';
import { useGetBuysQuery } from '../../../features/buysApiSlice';
import numberOfPages from '../../../actions/getNumberOfPages';
import useTitle from '../../../hooks/useTitle';
import axiosApi from '../../../api/axiosApi';

const BuyProps = () => {
    useTitle('Pindro Realtor: Buy Properties');

    const [isFilter, setIsFilter] = React.useState(false);
    const [filterProp, setFilterProp] = React.useState(false);
    const [filterLength, setFilterLength] = React.useState(0);

    const [sales, setSales] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);

    const buyPrices = pricesDataM;
    const endBuyPrices = endPricesDataM;
    const [buyPrice1, setBuyPrice1] = React.useState(0);
    const [buyPrice2, setBuyPrice2] = React.useState(0);

    const buyRooms = roomsData;
    const [roomCount1, setRoomCount1] = React.useState(0);
    const [roomCount2, setRoomCount2] = React.useState(0);

    const buyBathrooms = bathroomsData;
    const [bathroomCount, setBathroomCount] = React.useState(0);

    const {data: props, isLoading} = useGetBuysQuery({ page });

    const onOpen = () => {
        if (isFilter) {
            return setIsFilter(false);
        }
        setIsFilter(true);
    }

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

    React.useEffect(() => {
        numberOfPages(props?.pages, setPages);
    }, [props?.pages]);
    

    const onPriceChanged1 = (e) => {
        setBuyPrice1(e?.target?.value);
    }

    const onPriceChanged2 = (e) => {
        setBuyPrice2(e?.target?.value);
    }

    const onBedroomsChanged1 = (e) => {
        setRoomCount1(e?.target?.value);
    }

    const onBedroomsChanged2 = (e) => {
        setRoomCount2(e?.target?.value);
    }

    const onBathroomsChanged = (e) => {
        setBathroomCount(e?.target?.value);
    }

    const handlePage = (page) => {
        setPage(page);
    }

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        setPage(page - 1);
        if (page <= 1) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const salesFilter = sales?.filter(prop => (
        (prop.price >= buyPrice1 && prop.price <= buyPrice2) && 
        (prop.rooms >= roomCount1 && prop.rooms <= roomCount2) &&
        // eslint-disable-next-line 
        (prop.bathrooms == bathroomCount)
    ));

    React.useEffect(() => {
        if (salesFilter?.length > 0) {
            setFilterLength(salesFilter?.length);
        } else {
            setFilterLength(null);
        }

    }, [salesFilter?.length]);

    if (!props?.data?.length && !isLoading) {
        return (
            <main className='buys-main main-con flex-col'>
                <div className="props-con">
                    <h5>No Property</h5>
                </div>
                <div className="props-pagination">
                    <Pagination 
                        handlePage={handlePage} handleNextPage={handleNextPage}
                        handlePrevPage={handlePrevPage} pages={pages}
                    />
                </div>
            </main>
        );
    }

    return (
        <main className='buys-main main-con flex-col'>
            <div className="filter-property-con flex">
                <div className="props-filter flex-col" onClick={onOpen}>
                    <FaFilterCircleDollar className='rent-filter-icon' />
                    Filter
                </div>
                {isFilter && (
                    <FilterForm 
                        prices={buyPrices} endPrices={endBuyPrices}
                        rooms={buyRooms} bathrooms={buyBathrooms} 
                        onPriceChanged1={onPriceChanged1} onPriceChanged2={onPriceChanged2}
                        onBedroomsChanged1={onBedroomsChanged1}
                        onBedroomsChanged2={onBedroomsChanged2}
                        onBathroomsChanged={onBathroomsChanged}
                        filterLength={filterLength} setFilterProp={setFilterProp}
                    />
                )}
            </div>
            {props?.data?.length ? (
                <div className="props-con">
                    {filterProp && isFilter ? (
                        salesFilter.map(prop => (
                            <Buy key={prop._id} prop={prop} />
                        ))
                    ) : ( 
                        props?.data?.map(prop => (
                            <Buy key={prop._id} prop={prop} />
                        ))
                    )}
                </div>
            ) : (
                <ClipLoader color='#fff' />
            )}
            <div className="props-pagination">
                <Pagination 
                    handlePage={handlePage} handleNextPage={handleNextPage}
                    handlePrevPage={handlePrevPage} disabled={disabled}
                    pages={pages} currPage={props?.currentPage}
                />
            </div>
        </main>
    );
}

export default BuyProps;