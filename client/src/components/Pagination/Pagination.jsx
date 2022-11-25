import './pagination.css'
import React from 'react'


const Pagination = ({totalDogs,dogsPerPage,setCurrentPage,currentPage}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className='divbox'>
            {pages.map((page, index) => {
                return (
                    <button 
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={page === currentPage ? "active boxx " : "box" }>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination