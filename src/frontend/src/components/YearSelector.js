import React from 'react';
import {Link} from 'react-router-dom';
import './YearSelector.scss';

export const YearSelector = ({teamName}) => {
    let years = [];
    const startYear = parseInt(process.env.REACT_APP_DATA_START_YEAR);
    const endYear = parseInt(process.env.REACT_APP_DATA_END_YEAR);
    for (let i = startYear; i <= endYear; i++) {
        years.push(i);
    }
    return (
        <ol className='YearSelector'>
        {
        years.map(year => (
            <li key={year} >
                 <Link to= {`/team/${teamName}/matches/${year}`}> {year}  </Link>
            </li>

        )) }
        </ol>    
    );
};
