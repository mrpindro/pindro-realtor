import React from 'react';
import { pricesData, statesData } from '../../utils/data';
import { FaAngleDown } from "react-icons/fa";
import FormatPrice from '../FormatPrice';

const SearchInputs = ({state, setState, town, setTown, price, setPrice }) => {
    const propsStates = statesData;
    const propsPrices = pricesData;
    const [towns, setTowns] = React.useState([]);

    
    const onStateChanged = (e) => {
        setState(e.target.value);
    }

    const onTownChanged = (e) => {
        setTown(e.target.value);
    }

    const onPriceChanged = (e) => {
        setPrice(e.target.value);
    }
    
    React.useEffect(() => {
        const seletedState = propsStates.filter(iState => {
            return iState.name === state;
        });
        if (state === seletedState[0]?.name) {
            // console.log(state)
            setTowns([...seletedState[0].towns]);
            // console.log(towns)
        }

        // eslint-disable-next-line 
    }, [state]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(state.value) {
            onStateChanged();
        }
    }

    return (
        <form className="search-form flex-cen" onSubmit={handleSubmit}>
            <div className="search-inputs flex-cen">
                <div className="states flex-col">
                    <p>State</p>
                    <select 
                        name="state" id="search-state" 
                        onChange={onStateChanged}
                    >
                        <option value="">Select state</option>
                        {propsStates.map(state => (
                            <option value={state.name} key={state.name}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                    <FaAngleDown className='search-icons' />
                </div>

                <div className="towns flex-col">
                    <p>Town</p>
                    <select 
                        name="town" id="search-town" 
                        onChange={onTownChanged}
                    >
                        {towns.length ? towns.map(town => (
                            <option value={town} key={town}>
                                {town}
                            </option>
                        )) : (
                            <option value="">Select state to get towns</option>
                        )}
                    </select>
                    <FaAngleDown className='search-icons' />
                </div>
                
                <div className="prices flex-col">
                    <p>Price</p>
                    <select 
                        name="fee" id="search-fee"
                        onChange={onPriceChanged}
                    >
                        {propsPrices.map(price => (
                            <option value={price} key={price}>
                                ₦<FormatPrice price={price} />
                            </option>
                        ))}
                    </select>
                    <FaAngleDown className='search-icons' />
                </div>
            </div>
            <button type='submit' disabled={!towns.length}>
                Search
            </button>
        </form>
    );
}

export default SearchInputs;