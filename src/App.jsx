import { useState } from "react";
import 'sass-reset';
import './Main.scss'
import Header from "./Components/Header/Header.jsx";
import BookList from "./Components/Book_List_Item/BookList.jsx";
import BookList_COBISS from "./Components/Book_List_Item/BookList_COBISS.jsx";

import BookSearch from "./Components/BookSearch/BookSearch.jsx";
import BookSearch_COBISS from "./Components/BookSearch/BookSearch_COBISS.jsx";
import BookInfo_ISBN_DB from "./Components/BookInfo/BookInfo_ISBN_DB.jsx";
import BookInfoOpenLibrary from "./Components/BookInfo/BookInfoOpenLibrary.jsx";
//import BookInfo_GoogleAPI from "./Components/BookInfo_COBISS/BookInfo_GoogleAPI.jsx";
//import BookInfo_COBISS from "./Components/BookInfo_COBISS/BookInfo_COBISS.jsx";

import Footer from "./Components/Footer/Footer.jsx";
import BookInfo_COBISS from "./Components/BookInfo/BookInfo_COBISS.jsx";

function App() {
    const [isbn, setIsbn] = useState("");
    const [cobiss, setCobiss] = useState("");

    return (
        <section id="center">
            <Header />

            <BookSearch_COBISS onSearch={setCobiss} />
            <BookList_COBISS cobiss={cobiss} />

            <BookSearch onSearch={setIsbn} />
            <BookInfo_ISBN_DB isbn={isbn} />

            <BookList/>

            <Footer />
        </section>
    );
}

export default App;

//<BookList />
//<BookInfo_COBISS cobiss={cobiss} />
//<BookInfo_ISBN_DB isbn={isbn} />
//<BookSearch onSearch={setIsbn} />
//<BookInfoOpenLibrary isbn={isbn} />