import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function EditOperation(props){

    const params = useParams();
    const [editForm, setEditForm] = React.useState({
        reason: "",
        amount: "",
        date: "",
        type: ""
    });
    const handleReason = (e) => {
        const newForm = JSON.parse(JSON.stringify(editForm));
        newForm.reason = e.target.value;
        setEditForm(newForm);
    };
    const handleAmount = (e) => {
        const newForm = JSON.parse(JSON.stringify(editForm));
        newForm.amount = e.target.value;
        setEditForm(newForm);
    };
    const handleDate = (e) => {
        const newForm = JSON.parse(JSON.stringify(editForm));
        newForm.date = e.target.value;
        setEditForm(newForm);
    };   
    const editOperation = async () => {
        try{
            await axios.put('http://localhost:3000/operation/' + params.id, editForm);

            swal('YAY!', 'Operation edited', 'success');

            props.history.push('/operations/lists');
        }
        catch(e){
            swal('Oops!', e.response.data, 'error');
        }
    }
    return(
        <div>
            <div>
                <h1 className='title'>EDIT OPERATION:</h1>
            </div>
            <div className='flex-container_form'>
                <form>
                    <div>           
                        <input className='form-control' type='text' placeholder='Reason' value={editForm.reason} onChange={handleReason}/>
                    </div>
                    <br />
                    <div className='input-group mb-3'>
                        <span className='input-group-text'>$</span>                      
                        <input className='form-control' type='number' placeholder='0000' value={editForm.amount} onChange={handleAmount}/>
                    </div>
                    <div>
                        <input 
                            className='form-control'
                            type='date'  
                            value={editForm.date}
                            min='2010-01-01'
                            max={'2022-12-31'}
                            onChange={handleDate}/>
                    </div>
                    <br />
                    <div>
                        <input className='form-control' type='text' disabled='disabled'/>
                        <small className='form-text' id='small-info'>(*) Type cannot be changed</small>
                    </div>
                    <br />  
                    <div className='buttons'>
                        <Link to={'/operations/lists'}><button className='btn btn-secondary'>Cancel</button></Link>
                        <button className='btn btn-primary' onClick={editOperation}>Submit</button>
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
}