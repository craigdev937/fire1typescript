import React from "react";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams, useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, 
    getDownloadURL } from "firebase/storage";
import { fStorage } from "../config/keys";
import { BlogAPI } from "../global/BlogAPI";

export const AddEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const blogID = id !== undefined ? String(id) : "";
    const [data, setData] = React.useState({
        id: "", title: "", description: ""
    });
    const [file, setFile] = React.useState<any | null>(null);
    let [progress, setProgress] = React.useState<number | null>(null);
    const { data: blog } = BlogAPI.useGetOneQuery(blogID);
    const [addBlog] = BlogAPI.useCreateMutation();
    const [updateBlog] = BlogAPI.useUpdateMutation();
    const { title, description } = data;

    React.useEffect(() => {
        if (blogID && blog) {
            setData({...blog});
        }
    }, [blogID, blog]);

    React.useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(fStorage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on("state_changed", 
            (snapshot) => {
                progress = (snapshot.bytesTransferred / 
                    snapshot.totalBytes) * 100;
                console.log(`Upload is ${progress} % done`);
                setProgress(progress);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is Paused");
                        break;
                    case "running":
                        console.log("Upload is Running");
                        break;
                    default:
                        break;
                }
            }, (error) => {
                console.log(error.message)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadURL) => {
                    toast.info("Image Upload Successfully!");
                    setData((prev) => ({...prev, imgURL: downloadURL}));
                });
            })
        };
        file && uploadFile();
    }, [file]);

    const handleChange = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({...data, 
            [event.target.name]: event.target.value});
    };

    const handleFile = 
    (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files![0]);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (title && description) {
            if (!id) {
                await addBlog(data);
                toast.success("Blog Added Successfully!");
                navigate("/");
            } else {
                await updateBlog(data);
                toast.success("Blog Added Successfully!");
                navigate("/");
            }
        };
    };

    return (
        <React.Fragment>
            <h1>{blogID ? "Update Blog" : "Create Blog"}</h1>
            <input 
                required
                placeholder="Enter the Title"
                type="text" 
                name="title"
                value={data.title}
                onChange={handleChange}
            />
            <input 
                required
                placeholder="Enter the Description"
                type="text" 
                name="description"
                value={data.description}
                onChange={handleChange}
            />
            <input 
                type="file" 
                onChange={handleFile}
            />
            <button 
                type="submit"
                disabled={progress !== null && progress < 100}
            >
                {blogID ? "Update" : "Submit"}
            </button>
        </React.Fragment>
    );
};


