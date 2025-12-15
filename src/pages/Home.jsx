import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main style={{ textAlign: "center", padding: "40px" }}>
      <h1>🎅 Secret Santa</h1>
      <p>Host a game or join one below!</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/create">Create a Room</Link> |{" "}
        <Link to="/join">Join a Room</Link>  {/* ✅ fix: no “/demo” */}
      </div>
    </main>
  );
}

