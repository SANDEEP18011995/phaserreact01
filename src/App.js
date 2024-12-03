import React, { useState } from "react";
import PhaserGame from "./components/PhaserGame";
import "./App.css";

const App = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [counter, setCounter] = useState(null);

  const startSession = () => {
    const sessionId = Math.random().toString(36).substring(2, 8);
    const randomCounter = Math.floor(Math.random() * (120 - 30 + 1)) + 30;
    setCounter(randomCounter);
    setCurrentSession({
      sessionId,
      startTime: new Date().toLocaleTimeString(),
      endTime: null,
    });
  };

  const handleGameEnd = () => {
    if (counter === 0) {
      setSessions((prev) => [
        ...prev,
        { ...currentSession, endTime: new Date().toLocaleTimeString() },
      ]);
      setCurrentSession(null);
    }
  };

  React.useEffect(() => {
    if (counter === null) return;

    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  return (
    <div className="app">
      <div className="left-panel">
        <h1>React-Phaser Task</h1>
        <button onClick={startSession} disabled={currentSession}>
          Start Session
        </button>
        <div>
          <h2>Current Session</h2>
          {currentSession ? (
            <div>
              <p>Session ID: {currentSession.sessionId}</p>
              <p>Start Time: {currentSession.startTime}</p>
              <p>Counter: {counter} seconds</p>
            </div>
          ) : (
            <p>No active session</p>
          )}
        </div>
        {currentSession && <PhaserGame onGameEnd={handleGameEnd} />}
      </div>
      <div className="right-panel">
        <h2>Session History</h2>
        <ul>
          {sessions.map((session, index) => (
            <li key={index}>
              <strong>Session ID:</strong> {session.sessionId} <br />
              <strong>Start:</strong> {session.startTime} <br />
              <strong>End:</strong> {session.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
