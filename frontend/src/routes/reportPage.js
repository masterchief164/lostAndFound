import React from 'react'
import Axios from 'axios';
import "../stylesheets/reportPage.css"

const ReportPage = () => {

   const [postData, setPostData] = React.useState({firstName:"" , lastName:"", roll:"", phone:"",title:"", description:"",  location:"", type:"lost"});
   const [selectedFile, setSelectedFile] = React.useState("");  

   const clickHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('upload_preset', "vaogtmy6");
    let res,image="";
    try {
      res = await Axios.post('https://api.cloudinary.com/v1_1/singhutkarshh/image/upload', formData);  
    } catch (error) {
        console.log(error);
        return;
    }

    if(res.status == 200){
        console.log("success",res.data.secure_url);
        image = res.data.secure_url;
    }
    else return;
    setPostData({firstName:"" , lastName:"", roll:"", phone:"",title:"", description:"" , location:"", type:""});
    setSelectedFile("");

    try {
        let data = postData;
        data.image = image;
        let res = await Axios.post('http://localhost:8000/report/form',data);
        console.log(res.data);
    } 
    catch (error) {
            console.log(error);
    }
   }



  return (
    <section className='reportForm'>
    <div class="container">
        <form action="#">
            <div class="form first">
                <div class="details personal">
                    <span class="title">Personal Details</span>

                    <div class="fields">
                        <div class="input-field">
                            <label>First Name</label>
                            <input type="text" placeholder="Enter your first name" name='firstName' value={postData.firstName} onChange={(e)=>setPostData({...postData,firstName:e.target.value})} required />
                        </div>

                        <div class="input-field">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter your last name" name='lastname' value={postData.lastName} onChange={(e)=>setPostData({...postData,lastName:e.target.value})} required />
                        </div>

                        <div class="input-field">
                            <label>Institute Roll Number</label>
                            <input type="text" placeholder="Enter roll number" name='roll' value={postData.roll} onChange={(e)=>setPostData({...postData,roll:e.target.value})} required />
                        </div>

                        <div class="input-field">
                            <label>Mobile Number</label>
                            <input type="text" placeholder="Enter mobile number" name='phone' value={postData.phone} onChange={(e)=>setPostData({...postData,phone:e.target.value})} required />
                        </div>

                    </div>
                </div>

                <div class="details ID">
                    <span class="title">Report Details</span>

                    <div class="fields">
                    <div class="input-field">
                            <label>Report Type</label>
                            <select name='type' defaultValue="lost" value={postData.type} onChange={(e)=>setPostData({...postData,type: e.target.value})} required>
                                <option disabled  selected>Select Type</option>
                                <option value="lost" >Lost</option>
                                <option value="found">found</option>
                            </select>
                        </div>

                        <div class="input-field">
                            <label>Title</label>
                            <input type="text" placeholder="eg: I lost my laptop charger  in cc" name='title' value={postData.title} onChange={(e)=>setPostData({...postData,title:e.target.value})} required />
                        </div>
                        <div class="input-field">
                            <label>Location</label>
                            <input type="text" placeholder="Enter last location you remember" name='location' value={postData.location} onChange={(e)=>setPostData({...postData,location:e.target.value})} required />
                        </div>

                        <div class="input-field" style={{width: "calc(2*100% / 3 + 15px)"}}>
                            <label>Item Description</label>
                            <textarea type="text" required rows={5} name='description' value={postData.description} onChange={(e)=>setPostData({...postData,description:e.target.value})}/>
                        </div>
                        <br />
                        
                    </div>
                   <div  className='btnBox'>
                         <div className='image-field'>
                            <label >Upload Image</label>
                            <input type='file' className='image-field'  name="image"  onChange={(e)=>setSelectedFile(e.target.files[0])} required />
                        </div>
                        <button class="nextBtn" onClick={(e)=>clickHandler(e)}>
                            <span class="btnText">Next</span>
                            <i class="uil uil-navigator"></i>
                        </button>
                    </div>
                </div> 
            </div>

        </form>
    </div>
</section>
  )
}

export default ReportPage