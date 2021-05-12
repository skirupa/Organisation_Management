import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) =>{

    const [name, Setname] = useState('');
    const [email, Setemail] = useState('');
    const [password, Setpassword] = useState('');

    const onSubmitform = async(e) => {
        e.preventDefault();
        try {
            const body = {name, email, password};
            const response = await fetch('http://localhost:5000/auth/register',{
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify(body)
            });
            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem('token',parseRes.token);
                setAuth(true);
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
        <div>
        <h1 className='text-center my-5'>Register</h1>
        <form onSubmit ={onSubmitform}>
        <div className="form-group mt-5">
        <label for="exampleInputname">Name</label>
        <input type="name" class="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" 
        value = {name} onChange={e => Setname(e.target.value)} />
        </div>
        <div className="form-group">
        <label for="exampleInputEmail1">Email</label>
        <input type="email" className="form-control my-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
        value = {email} onChange={e => Setemail(e.target.value)}/>
        </div>
        <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" className="form-control my-3" id="exampleInputPassword1" placeholder="Enter Password"
        value = {password} onChange={e => Setpassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
        <Link to='/login'>Login</Link>
        </div>
    )
};

export default Register;