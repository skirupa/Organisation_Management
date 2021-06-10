import { Paper,Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import React, { useEffect, useState } from 'react';
import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DisplayReceipts_man = () =>{

    const [AllReceipts,setReceipts] = useState([]);
    const [val, Setvalue] = useState('all');
    
    const classes = useStyles();

    const GetReceipts = async() =>{
        try {
            const query = await fetch('http://localhost:5000/receipt/allreceipts_man',{
                method : 'GET'
            });
            const data = await query.json();
            console.log(data);
            setReceipts(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const UpdateApproval_true = (rid) => {
      try {
        const body = {approval: true,rid};
        console.log(body);
        const query = fetch('http://localhost:5000/receipt/update_approval',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},                    
                    // token : localStorage.token,
          body : JSON.stringify(body)
        });
        console.log(body);
        for (var i = 0; i<AllReceipts.length; i++)
        {
          if(AllReceipts[i].rid === rid){
            AllReceipts[i].approval='true'; break;
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const UpdateApproval_false = (rid) => {
      try {
        const body = {approval: false,rid};
        console.log(body);
        const query = fetch('http://localhost:5000/receipt/update_approval',{
          method : 'POST',
          headers : {'Content-Type' : 'application/json'},                    
                    // token : localStorage.token,
          body : JSON.stringify(body)
        });
        console.log(body);
        for (var i = 0; i<AllReceipts.length; i++)
        {
          if(AllReceipts[i].rid === rid){
            AllReceipts[i].approval='false'; break;
          }
        }
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
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Filter receipts</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value ={val}
          onChange={e => Setvalue(e.target.value)}
        >
          <MenuItem value={'all'}>All</MenuItem>
          <MenuItem value={null}>Pending</MenuItem>
          <MenuItem value={'true'}>Approved</MenuItem>
          <MenuItem value={'false'}>Not approved </MenuItem>
        </Select>
        <FormHelperText>Please select to filter receipts</FormHelperText>
      </FormControl>
      
    {AllReceipts.filter(receipt => (val==='all') || (receipt.approval===val)).map (receipt => (
        <Paper elevation={5} className='p-3 mb-5 mt-5'>
          <h3>Receipt #{receipt.rid}</h3>
        <div key = {receipt.rid} > 

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Receipt ID</span>
            </div>
            <input type="text" value={receipt.rid} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"  readOnly/>
          </div>


          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Receipt Name</span>
            </div>
            <input type="text" value={receipt.receipt_name} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" readOnly/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Employee ID</span>
            </div>
            <input type="text" value={receipt.emp_id} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" readOnly />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Date</span>
            </div>
            <input type="text" value={receipt.date} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" readOnly/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Spent On</span>
            </div>
            <input type="text" value={receipt.spent_on} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" readOnly/>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Spent Charges</span>
            </div>
            <input type="text" value={receipt.spent_charges} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" readOnly/>
          </div>

          <Grid container spacing={3}>
          <Grid item>
          <a href={`./uploads/${receipt.receipt_name}`} >
            <button className="btn btn-primary mr-3" type="button">View Receipt</button>
          </a>
          </Grid>
          <Grid item>
          <button className="btn btn-info ml-3" type="button" data-toggle="collapse" onClick={() => Get_Employee(receipt.emp_id)} data-target={`#emp${receipt.rid}`}>
            View Employee details
          </button>
          </Grid>
          

          {receipt.approval === null ? 
          
          <Grid item>
          <button type="button" class="btn btn-success" onClick={()=> UpdateApproval_true(receipt.rid)}>
            Approved
          </button>
          </Grid>
          : <div></div>}
          {receipt.approval === null ?
          <Grid item>
          <button type="button" class="btn btn-danger" onClick={()=> UpdateApproval_false(receipt.rid)}>
            Not Approved
          </button>
          </Grid>
          
          : <div></div>}

          </Grid>
          <div className="collapse p-5"  id={`emp${receipt.rid}`}>
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

export default DisplayReceipts_man;