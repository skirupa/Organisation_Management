import { Paper } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = ( {Mydata} ) => {

    const [spent_on, SetSpenton] = useState('');
    const [spent_charges, Setspentcharges] = useState('');
    const [date, Setdate] = useState('');
    const [file, SetFile] = useState('');
    const [fileName, SetFileName] = useState('Choose file');
    const [uploadedfile, Setuploadedfile] = useState({}); //obj with filename and filepath
    
    const onchange = e => {
        e.preventDefault();
        SetFile(e.target.files[0]);
        SetFileName(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',file);
        formData.append('spent_on',spent_on);
        formData.append('spent_charges',spent_charges);
        formData.append('date',date);
        try {
            console.log(file);
            const res = await axios.post('http://localhost:5000/receipt/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    token : localStorage.token
                }
            });
            const { fileName, filePath } = res.data;
            Setuploadedfile({ fileName, filePath });
            // console.log(uploadedfile);
        } catch (error) {
            if (error.response.status === 500 ) {
                console.log('server error');
            } else {
                console.log(error.response.data.msg);
            }
        }

    };
    return(
        <Fragment>
            <Paper elevation={4} className='p-5'>
            <h2>Add Receipt</h2>

            <form onSubmit={onSubmit}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" >Spent On</span>
            </div>
            <input type="text" class="form-control" placeholder="Spent on" aria-label="Username" 
            value={spent_on} onChange={e => SetSpenton(e.target.value)}/>
            </div>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" >Spent Charges</span>
            </div>
            <input type="text" class="form-control" placeholder="Spent charges" aria-label="Username" 
            value={spent_charges} onChange={e =>Setspentcharges(e.target.value)}/>
            </div>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" >Date</span>
            </div>
            <input type="date" class="form-control" placeholder="date" aria-label="Username" 
            value={date} onChange={e =>Setdate(e.target.value)}/>
            </div>

            <div className="custom-file mt-5">
            <input type="file" className="custom-file-input" id="customFile" onChange={onchange}/>
            </div>
            <input type='submit' value='Upload' className='btn btn-primary btn btn-block mt-4' />
            </form>
            { uploadedfile.fileName ? <div className="row mt-5">
                <div className='col-md-6 m-auto'>
                    <h2 className='text-center'>Your file {uploadedfile.fileName} has been uploaded!</h2>
                    <img style={{ width: '100%' }} src={uploadedfile.filePath} alt='' />
                </div>
            </div> : null }
            </Paper>
        </Fragment>
    )
};

export default FileUpload;

