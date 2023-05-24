import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const JournalApp = () => {
    const [entries, setEntries] = useState([]);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    useEffect(() => {
        axios.get("/api/entries").then((response) => {
            setEntries(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const entry = {
            title: e.target.title.value,
            body: e.target.body.value,
        };

        axios.post("/api/entries", entry).then((response) => {
            setEntries([...entries, response.data]);
        });

        setIsNotificationOpen(false);
    };

    const handleNotificationClose = () => {
        setIsNotificationOpen(false);
    };

    const renderEntries = () => {
        return entries.map((entry) => (
            <div key={entry.id}>
                <h2>{entry.title}</h2>
                <p>{entry.body}</p>
            </div>
        ));
    };

    const renderNotification = () => {
        return (
            <div>
                <h2>Don't forget to write your journal entry!</h2>
                <button onClick={handleNotificationClose}>Close</button>
            </div>
        );
    };

    return (
        <div>
            <h1>Journal App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="body" placeholder="Body"></textarea>
                <button type="submit">Submit</button>
            </form>
            {isNotificationOpen ? renderNotification() : null}
            <ul>
                {renderEntries()}
            </ul>
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<JournalApp />, rootElement);


export default JournalApp;
