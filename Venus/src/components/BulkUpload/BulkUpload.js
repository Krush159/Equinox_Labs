import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
    // root: {
    //     '& > *': {
    //         margin: theme.spacing(1),
    //     },
    // },
    input: {
        display: 'none',
    },
}));

const BulkUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
    };

    const onSubmit = async e => {
        e.preventDefault();
        console.log("hello")
        const formData = new FormData();
        formData.append('fileKey', file);
            
        await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            }).then(res => {
                const { fileName, filePath } = res.data;
                setUploadedFile({ fileName, filePath });
                setMessage('File Uploaded');
            }).catch(err =>{
                console.log(err)
            });
            
        
    };

    const classes = useStyles();

    return (
        <Fragment>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <div className={classes.root}>
                    <input
                        accept=".xlsx, .xls"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onChange}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            Browse
                        </Button>
                    </label>{" "}
                    <label className='custom-file-label' htmlFor='contained-button-file'>
                        {filename}
                    </label>
                </div>

                <Progress value={uploadPercentage} />

                <input
                    type='submit'
                    value='Upload'
                    id='upload-button'
                    className={classes.input}
                />
                <label htmlFor="upload-button">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                        </Button>
                </label>
            </form>
            
        </Fragment>
    );
};

export default BulkUpload;
