import React,{ useState } from 'react';
import axios from "axios";
import { storage } from "../../firebase/firebase";

const CreatePost= () =>{
    const [Image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [formData,setFormData]=useState({
        text:'',
        subject:'',
        category:'',
        image:''
    });
    const {text,subject,category,image}=formData;

    const onChange=e=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    }
    const handleChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload =() => {
        const UploadTask = storage.ref(`images/${Image.name}`).put(Image);
        UploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            setProgress(progress);
        },
        error => {
            console.log(error);
            alert(error.message);
        },
        () => {
            storage
            .ref("images")
            .child(Image.name)
            .getDownloadURL()
            .then(url => {
                setFormData({...formData,image:url})
            });
        }
        
    );
    console.log("Image uploaded");
    }
    const PostData=async()=>{
        const newPost={
            text,subject,category,image
        };
        try {
            const config={
                headers:{
                    'Content-Type':"application/json"
                }
            };
            const body=JSON.stringify(newPost);
            const res=await axios.post('/api/sell',body,config);
        } catch (err) {
            console.error(err.response.data);
        }
        const config={
            headers:{
                'Content-Type':"application/json"
            }
        };
        console.log("formData",formData);
        const res=await axios.post('/api/sell',formData,config);
        console.log("res.data",res.data);
        setImage(null);
        setProgress(0);
        setFormData({text:'',subject:'',category:'',text:''});
    }
    return (
        <div>
            <h1>Its create post</h1>
            <input type="file"  onChange={handleChange} />
            <br/>
            <progress value={progress} name="progress" max="100" />
            <br/>
            <button type="submit" onClick={handleUpload} >Upload pic</button>
            <br/>
            <input
                type="text"
                placeholder="Enter text"
                onChange={e => onChange(e)}
                name="text"
                value={text}
            />
            <br/>
            <input
                type="text"
                placeholder="Enter subject"
                onChange={e => onChange(e)}
                name="subject"
                value={subject}
            />
            <br/>
            <input
                type="text"
                placeholder="Enter category"
                onChange={e => onChange(e)}
                name="category"
                value={category}
            />
            <br/>
            <button type="submit" onClick={PostData} >Post your ad</button>
        </div>
    );
}

export default CreatePost;