import React from 'react';
import { Link } from 'react-router-dom';
import ListOperations from './components/operations/ListOperations.jsx';
import Balance from './components/operations/Balance.jsx';

function Home(){
    return(
        <div>
            <header>
                <h1 className='title-main'>WELCOME TO THE BUDGET ADMINISTRATOR</h1>
            </header>
            <div>
                <div className='button-add'>
                    <Link to={'/operation/add'}><button className="btn btn-warning">Add operation</button></Link>
                </div>
                <div className='mainTable_flex-container'>
                    {ListOperations()}
                </div>
                <div>
                    <Link to={'/operations/lists'} className='link'>View incomes/expenses lists </Link><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-arrow-up-right-square" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.854 8.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"/>
                    </svg>
                </div>
                <div className='flex-container_balance'>
                    <div>
                        <button className='btn btn-danger'> Total balance: {Balance()}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

