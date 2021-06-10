import { Paper,Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Profile from './Profile';


const DisplayReceipts_fin = () =>{

    const [AllReceipts,setReceipts] = useState([]);

    const GetReceipts = async() =>{
        try {
            const query = await fetch('http://localhost:5000/receipt/allreceipts_fin',{
                method : 'GET'
            });
            const data = await query.json();
            console.log(data);
            setReceipts(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const UpdateRefund_true = (rid) => {
      try {
        const body = {refund: true,rid};
        console.log(body);
        const query = fetch('http://localhost:5000/receipt/update_refund',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},                    
                    // token : localStorage.token,
          body : JSON.stringify(body)
        });
        console.log(body);
      } catch (error) {
        console.log(error.message);
      }
    };

    const UpdateRefund_false = (rid) => {
      try {
        const body = {refund: false,rid};
        console.log(body);
        const query = fetch('http://localhost:5000/receipt/update_refund',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},                    
                    // token : localStorage.token,
          body : JSON.stringify(body)
        });
        console.log(body);
      } catch (error) {
        console.log(error.message);
      }
    };


    const [Mydata, Setmydata] = useState([]);
  
    const Get_Employee = async(id) => {
      try {
        const query = await fetch(`http://localhost:5000/auth/employee_details/${id}`);
        const data = await query.json();
        Setmydata(data);
        console.log(data);
      } catch (error) {
        console.error(error.message);
      } 
    };

    useEffect(()=>{
        GetReceipts();
    },[]);


return (
    <div>

    {AllReceipts.map (receipt => (
        <Paper elevation={5} className='p-3 mb-5'>
          <h3>Receipt #{receipt.rid}</h3>
        <div key = {receipt.rid} > 

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Receipt ID</span>
            </div>
            <input type="text" value={receipt.rid} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </div>


          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Receipt Name</span>
            </div>
            <input type="text" value={receipt.receipt_name} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Employee ID</span>
            </div>
            <input type="text" value={receipt.emp_id} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
            </div>
            <input type="text" value={receipt.date} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Spent On</span>
            </div>
            <input type="text" value={receipt.spent_on} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Spent Charges</span>
            </div>
            <input type="text" value={receipt.spent_charges} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
          </div>

          <Grid container spacing={3}>
          <Grid item>
          <a href={`./uploads/${receipt.receipt_name}`} >
            <button className="btn btn-primary mr-3" type="button">View Receipt</button>
          </a>
          </Grid>
          <Grid item>
          <button className="btn btn-info ml-3" type="button" data-toggle="collapse"  onClick={() => Get_Employee(receipt.emp_id)} data-target={`#fin${receipt.rid}`}>
            View Employee details
          </button>
          </Grid>

          <Grid item>
          <button type="button" class="btn btn-success" onClick={()=> UpdateRefund_true(receipt.rid)}>
            Grant Refund
          </button>
          </Grid>
          <Grid item>
          <button type="button" class="btn btn-danger" onClick={()=> UpdateRefund_false(receipt.rid)}>
            Decline Refund
          </button>
          </Grid>

          </Grid>
          <div className="collapse p-5"  id={`fin${receipt.rid}`}>
          <div className="card card-body">
          <Profile Mydata={Mydata}/>
          </div>
          </div>

        </div>
        </Paper>
      ))}
    
    </div>
    );
};

export default DisplayReceipts_fin;
