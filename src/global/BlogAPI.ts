import { dBase } from "../config/keys";
import { createApi, 
    fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { collection, doc, serverTimestamp, 
    addDoc, getDoc, getDocs, 
    deleteDoc, updateDoc } from "firebase/firestore";
import { IBlog } from "../models/Interfaces";

export const BlogAPI = createApi({
    reducerPath: "BlogAPI",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["Blog"],
    endpoints: (builder) => ({
        fetchAll: builder.query<IBlog[], void>({
            async queryFn() {
                try {
                    const blogRef = collection(dBase, "blogs");
                    const querySnapshot = await getDocs(blogRef);
                    let blogs: IBlog[] = [];
                    querySnapshot?.forEach((doc) => {
                        blogs.push({
                            id: doc.id,
                            ...doc.data()
                        } as IBlog);
                    });
                    return { data: blogs };
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            providesTags: ["Blog"]
        }),
        getOne: builder.query<IBlog, string>({
            async queryFn(id) {
                try {
                    const docRef = doc(dBase, "blogs", id);
                    const snapshot = await getDoc(docRef);
                    const data: IBlog = {
                        ...snapshot.data()
                    } as IBlog
                    return { data: data };
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            providesTags: ["Blog"],
        }),
        create: builder.mutation<string, IBlog>({
            async queryFn(data) {
                try {
                    await addDoc(collection(dBase, "blogs"), {
                        ...data,
                        timestamp: serverTimestamp(),
                    });
                    return { data: "ok" };
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ["Blog"],
        }),
        update: builder.mutation<string, IBlog>({
            async queryFn({ id, ...data }) {
                try {
                    await updateDoc(doc(dBase, "blogs", id), {
                        ...data,
                        timestamp: serverTimestamp(),
                    });
                    return { data: "ok" };
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ["Blog"],
        }),
        delete: builder.mutation<string, string>({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(dBase, "blogs", id));
                    return { data: "ok" };
                } catch (error: any) {
                    return { error: error.message }
                }
            },
            invalidatesTags: ["Blog"],
        })
    }),
});



