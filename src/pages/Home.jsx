import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎅 Secret Santa</h1>
      <p>Create a room and invite your friends!</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/create">Create Room</Link> | <Link to="/join/demo">Join Room</Link>
      </div>
    </main>
  );
}

