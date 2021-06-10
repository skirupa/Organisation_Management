import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({ setAuth,SetDash }) =>{

    const [email,Setemail] = useState('');
    const [password,Setpassword] = useState('');
    const [designation, Setdesignation] = useState('');

    const onSubmitform = async(e) => {
        e.preventDefault();
        try {
            const body = {email, password, designation};
            console.log(body);
            const response = await fetch('http://localhost:5000/auth/login',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify(body)
            });

            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem( 'token',parseRes.token );
                setAuth(true);
                SetDash(designation);
                toast.success('Login successful!');
            }else {
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
        <div className='text-center'>
        <img style={{  
                backgroundImage: `url(${("./Images/login.jpeg")})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
                }} 
            alt='No image'>
        </img>
        </div>
        <h1 className='text-center my-5'>Login</h1>
        <form onSubmit={onSubmitform}>
        <div className="form-group mt-5">
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
        <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to='/register'>Register</Link>
        </div>
    )
};

export default Login;
