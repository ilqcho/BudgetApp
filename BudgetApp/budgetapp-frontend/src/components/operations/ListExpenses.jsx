import React from 'react';
import{ useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import accounting from 'accounting';
import dateFormat from 'dateformat';

export default function ListExpenses(){
    const dispatch = useDispatch();
    const operations = useSelector((state) => state.operations);
    const [expensesList, setExpensesList] = React.useState([]);
    const params = useParams();

    React.useEffect(() => {        
        const expensesArray = operations.filter((oneOperation) => oneOperation?.type === 'EXPENSE');

        setExpensesList(expensesArray);

    }, [params, operations]);

    const deleteOperation = async(id) => {
        try{
            const deleting = await swal({
                title: 'Delete operation?',
                text: 'Once deleted you can`t go back!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            });
            if(deleting){
                await axios.delete('http://localhost:3000/operation/' + id);
                dispatch({
                    type: 'DELETE_OPERATION',
                    idToRemove: id
                });
                swal('Poof!', 'Operation deleted', 'success');
            }else{
                swal('Your operation is safe!');
            }
        }
        catch(e){
            swal('Oops!', e.response.data, 'error');
        }
    }
    return(
        <div className='table-responsive-sm'>
            <table className='table table-striped table-hover table-bordered border-dark table-sm caption-top'>
                <caption>List of expenses:</caption>
                <thead>
                    <tr className='table-dark'>
                        <th>Reason</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expensesList.map((oneOperation) =>     
                        oneOperation ? (
                            <tr key={oneOperation.id}>
                                <td className='table-danger'>{oneOperation.reason}</td>
                                <td className='table-danger'>{accounting.formatMoney(oneOperation.amount, '$', '.',)}</td>
                                <td className='table-danger'>{dateFormat(oneOperation.date, 'dd/mm/yyyy')}</td>
                                <td className='table-danger'>{oneOperation.type}</td>
                                <td>
                                    <Link to={'/operation/edit/' + oneOperation.id}><button className="btn btn-primary">Edit</button></Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteOperation(oneOperation.id)}>Delete</button>
                                </td>
                            </tr>
                        ) : null
                    )}
                </tbody>
            </table>
        </div>
    );
};