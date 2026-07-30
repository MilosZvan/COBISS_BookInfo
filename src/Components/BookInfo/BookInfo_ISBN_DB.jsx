import React, { useState, useEffect } from "react";
import "./BookInfo.scss";

const BookInfo_ISBN_DB= ({ isbn }) => {
    const [title, setTitle] = useState("");
    const [titleLong, setTitleLong] = useState("");
    const [authors, setAuthors] = useState("");
    const [datePublished, setDatePublished] = useState("");
    const [language, setLanguage] = useState("");
    const [pages, setPages] = useState("");
    const [synopsis, setSynopsis] = useState("");

    useEffect(() => {
        if (!isbn) return;

        const headers = {
            "Content-Type": "application/json",
            "Authorization": "70756_d42c0c0b13abd5c29b26f5d225eb400e"
        };
        const url = `https://api2.isbndb.com/book/${isbn}`;
        //console.log(url);
        //console.log(headers);

        fetch(url,  { headers })
            .then(res => res.json())
            .then(json => {
                console.log("Single_Book:", json);

                const book = json.book;

                setTitle(book?.title                      || "No title found");
                setTitleLong(book?.title_long             || "No title_long found");
                setAuthors(book?.authors?.join(", ")      || "No authors found");
                setDatePublished(book?.date_published     || "No Date found");
                setLanguage(book?.language                || "No language found");
                setPages(book?.pages                      || "No pages found");
                setSynopsis(book?.synopsis                || "No synopsis found");

            })
            .catch(error => console.error('Error:', error));

    }, [isbn]); // IMPORTANT

    return  <div>
                <div className="book-info">
                    <h1>{isbn}                   </h1>
                    <h1>{authors}: {title}       </h1>
                    <div className="book-details">
                        <p>Leto: {datePublished}</p>
                        <p>Language: {language}</p>
                        <p>Pages: {pages}</p>
                    </div>
                    <div>{synopsis}</div>
                </div>
            </div>
};

export default BookInfo_ISBN_DB;