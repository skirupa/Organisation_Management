import React, {useState,useEffect} from 'react';
import { toast } from 'react-toastify';


const Dashboard = ({ setAuth }) =>{

    const [name, Setname] = useState('');

    async function getname() {
        try {
            const response = await fetch('http://localhost:5000/dashboard',{
                method : 'GET',
                headers : { token : localStorage.token }
            });
            const Parseres = await response.json();
            //console.log(Parseres);
            Setname(Parseres.user_name);
        } catch (error) {
            console.error(error.message);
        }
    };
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setAuth(false);
        toast.success('Logged out successfully!');
    };

    useEffect(() => {
        getname();
    },[]);
    return (
        <div>
        <h1>Dashboard {name}</h1>
        <button className='btn-btn-primary' onClick={e => logout(e)} >Logout</button>
        </div>
    )
};

export default Dashboard;