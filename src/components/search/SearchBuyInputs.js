import React from 'react';
import { pricesDataM, statesData } from '../../utils/data';
import { FaAngleDown } from "react-icons/fa";
import FormatPrice from '../FormatPrice';

const SearchBuyInputs = ({state, setState, setTown, setPrice }) => {
    const propsStates = statesData;
    const propsPrices = pricesDataM;
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
            setTowns([...seletedState[0]?.towns]);
            // console.log(towns)
        }

        // eslint-disable-next-line 
    }, [state]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form className="search-form flex-cen" onSubmit={handleSubmit}>
            <div className="search-inputs flex-cen">
                <div className="states flex-col">
                    <p>State</p>
                    <select 
                        name="state" id="search-buy-state" 
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
                        name="town" id="search-buy-town" 
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
                        name="fee" id="search-buy-price"
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

export default SearchBuyInputs;