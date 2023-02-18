import React from "react";
import "./List.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { IBlog } from "../models/Interfaces";
import { BlogAPI } from "../global/BlogAPI";

type BLOG = {
    blog: IBlog
};

export const List = ({ blog }: BLOG) => {
    const { isLoading, isError, error } = BlogAPI.useFetchAllQuery();
    const [deleteBlog] = BlogAPI.useDeleteMutation();

    React.useEffect(() => {
        isError && toast.error("There was an Error!");
    }, [isError]);

    if (isLoading) <h1>Loading...</h1>;

    const excerpt = (str: string, count: number) => {
        if (str.length > count) {
            str = str.substring(0, count) + " ...";
        }
        return str;
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure to delete?")) {
            await deleteBlog(id);
            toast.success("Blog was deleted!");
        }
    };

    return (
        <React.Fragment>
            <section>
                <img src={blog.imageURL} alt="" />
                <h1>{blog.title}</h1>
                <p>{blog.description}</p>
                <button 
                    onClick={() => handleDelete(blog.id!)}
                    >Delete
                </button>
                <Link to={`/update/${blog.id}`}>
                    <button
                        >Update
                    </button>
                </Link>
            </section>
        </React.Fragment>
    );
};



