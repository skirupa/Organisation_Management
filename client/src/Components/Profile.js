import { Paper } from '@material-ui/core';
import React, { Fragment } from 'react';


const Profile = ( {Mydata} )  => {
    return(
        <Fragment>
            <Paper elevation={4} className='p-5'>
            <div className='text-center'>
            <img src='/Images/profiles-icon.jpg' alt='No image' height='400px' width='350px' ></img>
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Employee name</span>
            </div>
            <input type="text" value={Mydata.user_name} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
            </div>
            <input type="text" value={Mydata.user_email} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Phone number</span>
            </div>
            <input type="text" value={Mydata.phone} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Address</span>
            </div>
            <input type="text" value={Mydata.address} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Date of Birth</span>
            </div>
            <input type="text" value={Mydata.dob} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Nationality</span>
            </div>
            <input type="text" value={Mydata.nationality} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Blood group</span>
            </div>
            <input type="text" value={Mydata.blood_group} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-default">Employee designation</span>
            </div>
            <input type="text" value={Mydata.user_designation} className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" />
            </div>
            </Paper>
        </Fragment>
    );
};
export default Profile;





