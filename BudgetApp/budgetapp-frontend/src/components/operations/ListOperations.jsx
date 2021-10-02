import React from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import swal from 'sweetalert';
import accounting from 'accounting';
import dateFormat from 'dateformat';

export default function ListOperations(){
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operations);
    const [list, setList] = React.useState([]);

    React.useEffect(async () => {
        try{
            const response = await axios.get('http://localhost:3000/operation');

            dispatch({
                type: 'LIST_OPERATIONS',
                list: response.data
            });
        }
        catch(e){
            swal("Error", e.response.data, "error");
        }
    }, []);

    React.useEffect(() => {
        if(Array.isArray(operations) && operations.length){
            const operationsListCopy = [...operations];
            if(operationsListCopy.length >= 10){
                operationsListCopy.reverse();
                operationsListCopy.splice(10);
                setList(operationsListCopy);
            } else if(operationsListCopy.length < 10){
                setList(operationsListCopy.reverse());
            }
        }    
    }, [operations]);

    const green = {
        backgroundColor: '#c6ebc6'
    };      
    const red = {
        backgroundColor: '#ff6666'
    };  
    return(
        <div>
            <div className='table-responsive-sm' >
                <table id='main-table' className='table table-striped table-hover caption-top'>
                <caption>Latest operations:</caption>
                    <thead>
                        <tr className='table-dark'>
                            <th>Reason</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((oneOperation) =>
                            oneOperation ? (
                                <tr key={oneOperation.id} style={oneOperation.type === 'INCOME' ? green : red}>
                                    <td>{oneOperation.reason}</td>
                                    <td>{accounting.formatMoney(oneOperation.amount, '$', '.')}</td>
                                    <td>{dateFormat(oneOperation.date, 'dd/mm/yyyy')}</td>
                                    <td>{oneOperation.type}</td>
                                </tr>
                            ) : null
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};