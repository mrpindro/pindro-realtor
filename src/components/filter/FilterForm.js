import React from 'react';
import { FaAngleDown } from 'react-icons/fa';
import './index.css';

const FilterForm = ({
    prices, endPrices, rooms, bathrooms, onPriceChanged1, onPriceChanged2, setFilterProp,
    onBedroomsChanged1, onBedroomsChanged2, onBathroomsChanged, filterLength
}) => {
    const [priceFilter, setPriceFilter] = React.useState(false);
    const [roomFilter, setRoomFilter] = React.useState(false);
    const [bathroomsFilter, setBathroomsFilter] = React.useState(false);

    const onOpenPrice = () => {
        if (priceFilter) {
            return setPriceFilter(false);
        } 
        setPriceFilter(true);
    }
    
    const onOpenRooms = () => {
        if (roomFilter) {
            return setRoomFilter(false);
        } 
        setRoomFilter(true);
    }

    const onOpenBathrooms = () => {
        if (bathroomsFilter) {
            return setBathroomsFilter(false);
        } 
        setBathroomsFilter(true);
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault();

        setFilterProp(true);  
    }

    return (
        <form className='filter-props-form flex' onSubmit={handleFilterSubmit}>
            <div className="props-price-from-to flex-col">
                <button type='button' onClick={onOpenPrice} className='flex-cen'>
                    Price <FaAngleDown />
                </button>
                {priceFilter && (
                    <div className="from-to flex">
                        <div className="from flex-col">
                            <label htmlFor="props-price-from">From</label>
                            <select 
                                id="props-price-from"
                                onChange={onPriceChanged1}
                            >
                                <option value="">...</option>
                                {prices.map(price => (
                                    <option value={price} key={price}>
                                        ₦{price > 999 && price < 10000 ? 
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
                                        }
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="from flex-col">
                            <label htmlFor="props-price-to">To</label>
                            <select 
                                id="props-price-to"
                                onChange={onPriceChanged2}
                            >
                                <option value="">...</option>
                                {endPrices.map(price => (
                                    <option value={price} key={price}>
                                        ₦{price > 999 && price < 10000 ? 
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
                                        }
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="props-price-from-to flex-col">
                <button onClick={onOpenRooms} className='flex-cen' type='button'>
                    Bedrooms <FaAngleDown />
                </button>
                {roomFilter && (
                    <div className="from-to flex">
                        <div className="from flex-col">
                            <label htmlFor="props-room-from">From</label>
                            <select 
                                id="props-room-from"
                                onChange={onBedroomsChanged1}
                            >
                                <option value="">...</option>
                                {rooms.map(room => (
                                    <option value={room} key={room}>
                                        {room}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="from flex-col">
                            <label htmlFor="props-room-to">To</label>
                            <select 
                                id="props-room-to"
                                onChange={onBedroomsChanged2}
                            >
                                <option value="">...</option>
                                {rooms.map(room => (
                                    <option value={room} key={room}>
                                        {room}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="props-price-from-to flex-col">
                <button onClick={onOpenBathrooms} className='flex-cen' type='button'>
                    Bathrooms <FaAngleDown />
                </button>
                {bathroomsFilter && (
                    <div className="from-to flex-col">
                        <div className="from flex-col">
                            <label htmlFor="props-bathroom">
                                N◦
                            </label>
                            <select 
                                id="props-bathroom"
                                onChange={onBathroomsChanged}
                            >
                                <option value="">...</option>
                                {bathrooms.map(room => (
                                    <option value={room} key={room}>
                                        {room}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <button type='submit'>
                FILTER {filterLength}
            </button>
        </form>
    );
}

export default FilterForm;