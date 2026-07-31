import React, { useState, useEffect } from "react";
import "./BookInfo_OpenLibrary.scss";

const BookInfo_OpenLibrary = ({ isbn }) => {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [authors, setAuthors] = useState("");

    useEffect(() => {
        if (!isbn) return;

        const url = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                const details = data[`ISBN:${isbn}`]?.details;
                console.log(details);

                setTitle(details?.title                         || "No title found");
                setSubtitle(details?.subtitle                   || "No subtitle found");

                const authorNames = details?.authors
                    ? details.authors.map(a => a.name).join(", ")
                    : "No authors found";
                setAuthors(authorNames);


            })
            .catch(err => console.log(err));
    }, [isbn]); // IMPORTANT

    return  <div>
                <h1>{title}     </h1>
                <h1>{subtitle}  </h1>
                <h1>{authors}   </h1>
            </div>
};

export default BookInfo_OpenLibrary;