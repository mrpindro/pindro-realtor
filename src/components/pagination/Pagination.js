import React from 'react';
import './index.css';

const Pagination = ({
    handlePage, handleNextPage, handlePrevPage, pages, disabled, currPage
}) => {

    return (
        <div className='pagination-con flex-cen'>
            <div className="pagination-btns flex">
                <button onClick={handlePrevPage} disabled={disabled}>◀︎</button>
                {pages?.length ? pages?.map((page, i) => (
                    <button 
                        key={i} onClick={() => handlePage(page)}
                        className={currPage === i + 1 ? 'curr-page' : ''}
                    >
                        {page}
                    </button>
                )): null}
                <button onClick={handleNextPage}>▶︎</button>
            </div>
        </div>
    );
}

export default Pagination;