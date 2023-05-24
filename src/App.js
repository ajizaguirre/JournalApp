import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useInterval } from "use-interval";



const JournalApp = () => {
    const [entries, setEntries] = useState([]);
    const [reminderTime, setReminderTime] = useState(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        const intervalId = useEffect(() => {
            setReminderTime(new Date().getTime() + Math.floor(Math.random() * (60 * 60 * 1000)));
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const entry = {
            title: e.target.title.value,
            body: e.target.body.value,
        };

        setEntries([...entries, entry]);
    };

    const renderEntries = () => {
        return entries.map((entry) => (
            <div key={entry.id}>
                <h2>{entry.title}</h2>
                <p>{entry.body}</p>
            </div>
        ));
    };

    const renderReminder = () => {
        if (reminderTime === null) {
            return null;
        }

        return (
            <div>
                <p>You have a reminder to write a journal entry in {new Date(reminderTime).toLocaleTimeString()}.</p>
            </div>
        );
    };

    return (
        <div>
            <h1>Journal App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" />
                <textarea name="body" placeholder="Body"></textarea>
                <input type="submit" value="Submit" />
            </form>
            <button type="button" onClick={() => setStart(false)}>
                Click to stop
            </button>
            <span>{start ? " useInterval started" : " useInterval stopped"}</span>
            {renderEntries()}
            {renderReminder()}
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<JournalApp />, rootElement);
  


export default JournalApp;
