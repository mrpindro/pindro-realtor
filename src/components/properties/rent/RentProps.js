import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { FaFilterCircleDollar } from 'react-icons/fa6';
import { bathroomsData, endPricesData, pricesData, roomsData } from '../../../utils/data';
import FilterForm from '../../filter/FilterForm';
import Rent from './Rent';
import '../index.css';
import useTitle from '../../../hooks/useTitle';
import Pagination from '../../pagination/Pagination';
import { useGetRentsQuery } from '../../../features/rentsApiSlice';
import numberOfPages from '../../../actions/getNumberOfPages';
import axiosApi from '../../../api/axiosApi';

const RentProps = () => {
    useTitle('Rent Properties');

    // const rents = getRents.data;
    
    const [isFilter, setIsFilter] = React.useState(false);
    const [filterProp, setFilterProp] = React.useState(false);
    const [filterLength, setFilterLength] = React.useState(0);
    
    const [rents, setRents] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState([]);
    const [disabled, setDisabled] = React.useState(false);
    
    const rentPrices = pricesData;
    const endRentPrices = endPricesData;
    const [rentPrice1, setRentPrice1] = React.useState(0);
    const [rentPrice2, setRentPrice2] = React.useState(0);
    
    const rentRooms = roomsData;
    const [roomCount1, setRoomCount1] = React.useState(0);
    const [roomCount2, setRoomCount2] = React.useState(0);
    
    const rentBathrooms = bathroomsData;
    const [bathroomCount, setBathroomCount] = React.useState(0);
    
    const { data: props, isLoading } = useGetRentsQuery({page});

    const onOpen = () => {
        if (!isFilter) {
            return setIsFilter(true);
        }
        setIsFilter(false);
    }

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
        numberOfPages(props?.pages, setPages);
    }, [props?.pages]);
    
    const onPriceChanged1 = (e) => {
        setRentPrice1(e?.target?.value);
    }

    const onPriceChanged2 = (e) => {
        setRentPrice2(e?.target?.value);
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

    const handlePage = (ipage) => {
        setPage(ipage);
    }

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        setPage(page - 1);
        if (page === 1) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const rentFilter = rents?.length ? rents?.filter(prop => (
        (prop.fee >= rentPrice1 && prop.fee <= rentPrice2) && 
        (prop.rooms >= roomCount1 && prop.rooms <= roomCount2) &&
        // eslint-disable-next-line 
        (prop.bathrooms == bathroomCount)
    )) : null;

    React.useEffect(() => {
        if (rentFilter?.length > 0) {
            setFilterLength(rentFilter?.length);
        } else {
            setFilterLength(null);
        }

    }, [rentFilter?.length]);

    if (!props?.data?.length && !isLoading) {
        return (
            <main className='rents-main main-con flex-col'>
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
        <main className='rents-main main-con flex-col'>
            <div className="filter-property-con flex">
                <div className="props-filter flex-col" onClick={onOpen}>
                    <FaFilterCircleDollar className='props-filter-icon' />
                    Filter
                </div>
                {isFilter && (
                    <FilterForm 
                        prices={rentPrices} endPrices={endRentPrices} 
                        rooms={rentRooms} bathrooms={rentBathrooms}
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
                        rentFilter?.map(prop => (
                            <Rent key={prop._id} prop={prop} />
                        ))
                    ) : (
                        props?.data?.map(prop => (
                            <Rent key={prop._id} prop={prop} />
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

export default RentProps;