import React from "react";
import "./List.css";
import { IBlog } from "../models/Interfaces";

type BLOG = {
    blog: IBlog
};

export const List = ({ blog }: BLOG) => {
    return (
        <React.Fragment>
            <h1>{blog.title}</h1>
            <p>{blog.description}</p>
        </React.Fragment>
    );
};



