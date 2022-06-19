import React, { useCallback } from "react";
import "./Form.css";
import { Alert, CircularProgress, TextField } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Axios from "axios";

const Form = () => {

    const defaultFormData = {
        firstName: "",
        lastName: "",
        title: "",
        description: "",
        location: "",
        itemTag: "",
        type: "Lost",
        dateTime: new Date().toISOString()
            .split(".")[0]
    };

    const [isLoading, setIsLoading] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [postData, setPostData] = React.useState(defaultFormData);
    const [isAlert, setIsAlert] = React.useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
        // setSelectedFile(acceptedFiles[0]);
    }, []);

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        onDrop,
        accepts: "image/*",
        multiple: false
    });

    const reportTypes = [{
        value: "Lost",
        label: "Lost"
    }, {
        value: "Found",
        label: "Found"
    }];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "vaogtmy6");
        let res,
            image = "";
        setIsLoading(true);
        if (selectedFile) {
            try {
                res = await Axios.post(process.env.REACT_APP_CLOUD_BUCKET, formData);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                return;
            }

            if (res && res.status === 200) {
                console.log("success", res.data.secure_url);
                image = res.data.secure_url;
            } else {
                return;
            }
        }
        try {
            let data = postData;
            data.image = image;
            await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/report/form`, data);
            setIsLoading(false);
            setIsAlert(true);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
            // TODO show the alert that save has failed
        }
        setPostData(defaultFormData);
        setSelectedFile("");
    };

    return (<>
        {isAlert ? <Alert severity="success" onClose={() => {
        }}>Your Report was successfully Submitted!</Alert> : ""}
        <section className={"formSection"}>
            {isLoading ? <CircularProgress /> : <div className="formContainer">

                <select value={postData.type} className="selectBox" onChange={(e) => setPostData({
                    ...postData,
                    type: e.target.value
                })}>
                    {reportTypes.map(type => <option className={"optionBox"} key={type.value}
                                                     value={type.value}>{type.label}</option>)}
                </select>

                <div className={"row"}>
                    <TextField margin={"normal"} sx={{ width: "20vw" }} id="outlined-basic"
                               value={postData.firstName}
                               onChange={(e) => setPostData({
                                   ...postData,
                                   firstName: e.target.value
                               })} required={true} label="First Name" variant="outlined" />
                    <TextField margin={"normal"} sx={{ width: "20vw" }} id="outlined-basic"
                               value={postData.lastName}
                               onChange={(e) => setPostData({
                                   ...postData,
                                   lastName: e.target.value
                               })} required={true} label="Last Name" variant="outlined" />
                </div>

                <div className={"row"}>
                    <TextField margin={"normal"} sx={{ width: "20vw" }} id="outlined-basic"
                               value={postData.location}
                               onChange={(e) => setPostData({
                                   ...postData,
                                   location: e.target.value
                               })} required={true} label="Last Seen Place" variant="outlined" />
                    <TextField margin={"normal"} sx={{ width: "20vw" }} id="outlined-basic"
                               type={"datetime-local"}
                               value={postData.dateTime}
                               onChange={(e) => setPostData({
                                   ...postData,
                                   description: e.target.value
                               })} required={true} label="Last Seen Time" variant="outlined" />
                </div>

                <div className={"row"}>
                    <TextField margin={"normal"} sx={{ width: "20vw" }} id="outlined-basic"
                               value={postData.itemTag}
                               onChange={(e) => setPostData({
                                   ...postData,
                                   itemTag: e.target.value
                               })} required={true} label="Item Tag" variant="outlined" />
                    <TextField margin={"normal"} sx={{ width: "20vw" }} id="outlined-basic"
                               value={postData.title}
                               onChange={(e) => setPostData({
                                   ...postData,
                                   title: e.target.value
                               })} required={true} label="Title" variant="outlined" />
                </div>

                <TextField margin={"normal"} multiline={true} minRows={6} sx={{ width: "50vw" }}
                           value={postData.description}
                           onChange={(e) => setPostData({
                               ...postData,
                               description: e.target.value
                           })} required={true}
                           id="outlined-basic" label="Description" variant="outlined" />

                <div className={`dropBox`} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop files here or click to upload</p>
                </div>

                <button className={"submitButton"} onClick={handleSubmit}>Submit</button>
            </div>}
        </section>
    </>);
};

export default Form;
