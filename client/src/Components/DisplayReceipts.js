import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const DisplayReceipts = () =>{
    const [AllReceipts,setReceipts] = useState([]);
    const GetReceipts = async() =>{
        try {
            const query = await fetch('http://localhost:5000/receipt/allreceipts',{
                method : 'GET',
                headers : {token : localStorage.token}
            });
            const data = await query.json();
            setReceipts(data);
        } catch (error) {
            console.log(error.message);
        }
    };
    useEffect(()=>{
        GetReceipts();
    },[]);

    

return (

    <Paper elevation={5} className='p-3'>
      <div class='mt-5'> 
          <h1 style = {{textAlign : 'center'}}>All receipts</h1>
           <table class="table container mt-5">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Receipt ID</th>
            <th scope="col">Receipt name</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Date</th>
            <th scope="col">Spent On</th>
            <th scope="col">Spent Charges</th>
            <th scope="col">Approval</th>
            <th scope="col">Refund</th>
          </tr>
        </thead>
        <tbody>
          {AllReceipts.map (receipt =>(
            <tr key = {receipt.rid}>
                <td>{receipt.rid}</td>
                <td>{receipt.receipt_name}</td>
                <td>{receipt.emp_id}</td>
                <td>{receipt.date}</td>
                <td>{receipt.spent_on}</td> 
                <td>{receipt.spent_charges}</td>
                <td> {receipt.approval === 'true' ? <CheckCircleIcon style={{color:'green'}}/> : 
                     receipt.approval === 'false' ? <CancelIcon style={{color:'red'}}/> : <div></div> } </td>
                <td>{receipt.refund === 'true' ? <CheckCircleIcon style={{color:'green'}}/> : 
                     receipt.refund === 'false' ? <CancelIcon style={{color:'red'}}/> : <div></div> }</td>
            </tr>
          ))};
        </tbody>
      </table>
      
      </div>
      </Paper>
    );
};

export default DisplayReceipts;