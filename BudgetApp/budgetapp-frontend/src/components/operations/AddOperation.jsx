import React from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

export default function AddOperation(props){

    const dispatch = useDispatch();
    const [form, setForm] = React.useState({
        reason: "",
        amount: "",
        date: "",
        type: ""
    });
    const handleReason = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.reason = e.target.value;
        setForm(newForm);
    };
    const handleAmount = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.amount = e.target.value;
        setForm(newForm);
    };
    const handleDate = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.date = e.target.value;
        setForm(newForm);
    }; 
    const handleType = (e) => {
        const newForm = JSON.parse(JSON.stringify(form));
        newForm.type = e.target.value;
        setForm(newForm);
    };
    const handleCancel = () => {
        props.history.push('/');
    };
    const saveChanges = async () => {
        try{
            const response = await axios.post('http://localhost:3000/operation', form);

            dispatch({
                type: 'ADD_OPERATION',
                operation: response.data
            });
            swal('YAY!', 'The operation was successfully added', 'success');

            props.history.push('/');
        }
        catch(e){
            swal('Oops!', e.response.data, 'error');
        }
    };
    return(
        <div>
            <div>
                <h1 className='title'>ADD OPERATION:</h1>
            </div>
            <div className='flex-container_form'>
                <form>
                    <div>
                        <input className='form-control' type='text' placeholder='Reason' value={form.reason} onChange={handleReason}/>
                    </div>
                    <br />
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>$</span>
                        <input className='form-control' type="number" value={form.amount} onChange={handleAmount}/>
                    </div>
                    <div>
                        <input 
                            className='form-control'
                            type='date'  
                            value={form.date} 
                            min='1990-01-01'
                            max={'2021-12-31'}
                            onChange={handleDate}/>
                    </div>
                    <br />
                    <div className='form-floating mb-3'>
                        <select className ='form-select form-select-sm' id='type' onChange={handleType} required>
                            <option value=''></option>
                            <option value='income'>INCOME</option>
                            <option value='expense'>EXPENSE</option>
                        </select>
                        <label htmlFor='type'>Type:</label>
                    </div>
                    <div className='buttons'>
                        <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                        <button className="btn btn-primary" onClick={saveChanges}>Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                </svg>
                <Link to={'/'} className='link'>Home</Link>
            </div>
        </div>
    );
};
