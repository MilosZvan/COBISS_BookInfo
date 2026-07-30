import React, {useState, useEffect} from "react";

const BookInfo_COBISS = ({ cobiss }) => {
    //const [data, setData] = useState({});
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (!cobiss) return;

        const url = `https://plus.cobiss.net/cobiss/si/sl/data/cobib/${cobiss}`;
        console.log("Fetching:", url);

        fetch(url, { method: "GET"})
            .then(res => res.json())
            .then(data => {

                console.log("COBISS response:", data)

                setTitle(data?.Naslov || "No title found");
                setAuthor(data?.Avtor || "No author found");
                setDescription(data?.Opis_gradiva || "No description found");

            })
            .catch(err => console.log("COBISS error:", err));
    },[cobiss])
    return (
        <div>
            <h2>{title}</h2>
            <p><strong>Avtor:</strong> {author}</p>
            <p><strong>Opis:</strong> {description}</p>
        </div>
    )
}

export default BookInfo_COBISS;

