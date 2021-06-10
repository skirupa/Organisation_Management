import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth,SetDash }) => {

    const [name, Setname] = useState('');
    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');
    const [designation, Setdesignation] = useState('');
    const [phone, Setphone] = useState('');
    const [dob, Setdob] = useState('');
    const [address, Setaddress] = useState('');
    const [nationality, Setnationality] = useState('');
    const [blood_group, Setbg] = useState('');
    const [emp_type, Setet] = useState('');

    const onSubmitform = async(e) => {
        e.preventDefault();
        try {
            const body = {name,email,password,designation,phone,dob,address,nationality,blood_group,emp_type};
            console.log(body);
            const response = await fetch('http://localhost:5000/auth/register',{
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify(body)
            });
            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem('token',parseRes.token);
                setAuth(true);
                SetDash(designation);
                toast.success('Registered successfully!');
            } else {
                setAuth(false);
                toast.error(parseRes);
            }
            //console.log(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className='container'>
        <h1 className='text-center my-5'>Register</h1>
        <form onSubmit ={onSubmitform}>
        <div className="form-group mt-5">
        <label htmlFor="exampleInputname">Name</label>
        <input type="name" className="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" 
        value = {name} onChange={e => Setname(e.target.value)} />
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email</label>
        <input type="email" className="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
        value = {email} onChange={e => Setemail(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control my-3" id="exampleInputPassword1" placeholder="Enter Password"
        value = {password} onChange={e => Setpassword(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="inputGroupSelect02" className="mb-3">Designation</label>
        <div className="input-group mb-3">
        <select className="custom-select" id="inputGroupSelect02" onChange = {e => Setdesignation(e.target.value)}>
        <option selected value = "1">Choose designation...</option>
        <option value="employee">Employee</option>
        <option value="management">Management</option>
        <option value="finance">Finance</option>
        </select>
        <label className="input-group-text" htmlFor="inputGroupSelect02">Options</label>
        </div>
        </div>
        <div className="form-group"> 

        <label htmlFor="exampleInputphone">Phone </label>
        <input type="text" className="form-control my-3" id="exampleInputphone" placeholder="Enter Phone"
        value = {phone} onChange={e => Setphone(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputdob">Date of Birth</label>
        <input type="date" className="form-control my-3" id="exampleInputdob" placeholder="Enter Date of Birth"
        value = {dob} onChange={e => Setdob(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputaddress">Address</label>
        <input type="text" className="form-control my-3" id="exampleInputaddress" placeholder="Enter Address"
        value = {address} onChange={e => Setaddress(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputnation">Nationality</label>
        <input type="text" className="form-control my-3" id="exampleInputnation" placeholder="Enter Nationality"
        value = {nationality} onChange={e => Setnationality(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputbg">Blood group</label>
        <input type="text" className="form-control my-3" id="exampleInputbg" placeholder="Enter Blood group"
        value = {blood_group} onChange={e => Setbg(e.target.value)}/>
        </div>
        <div className="form-group">
        <label htmlFor="exampleInputemptype">Employee Type</label>
        <input type="text" className="form-control my-3" id="exampleInputemptype" placeholder="Enter employee type"
        value = {emp_type} onChange={e => Setet(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to='/login'>Login</Link>
        </div>
    )
};

export default Register;


