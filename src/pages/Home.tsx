import React from "react";
import { BlogAPI } from "../global/BlogAPI";
import { List } from "../components/List";

export const Home = () => {
    const { data } = BlogAPI.useFetchAllQuery();

    return (
        <React.Fragment>
            {data?.map((blog) => (
                <section key={blog.id}>
                    <List 
                        key={blog.id} blog={blog} 
                    />
                </section>
            ))}
        </React.Fragment>
    );
};


