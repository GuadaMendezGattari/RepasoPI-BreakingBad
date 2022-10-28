import React from 'react';

export default function Paginado({charsPerPage, allChars, paginado}) {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allChars/charsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            <nav>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return (
                            <span className='number' key={number}>
                                <button onClick={() => paginado(number)} type='button'>{number}</button>
                            </span>
                        );
                    })
                }
            </nav>
        </div>
    );
}