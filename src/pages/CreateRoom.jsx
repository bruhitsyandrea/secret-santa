import React, { useState } from "react";
import { supabase } from "../api/supabase";

export default function CreateRoom() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roomId, setRoomId] = useState(null);
  const [status, setStatus] = useState("");

  async function handleCreate() {
    if (!name || !email) {
      setStatus("Please fill in both fields.");
      return;
    }

    setStatus("Creating room...");

    const { data, error } = await supabase
      .from("rooms")
      .insert([{ name, host_email: email }])
      .select()
      .single();

    if (error) {
      console.error(error);
      setStatus("Error creating room.");
    } else {
      setRoomId(data.id);
      setStatus("Room created successfully!");
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Create a Room</h2>
      <input
        placeholder="Room name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <input
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px auto", padding: "8px" }}
      />
      <button onClick={handleCreate} style={{ marginTop: "10px" }}>
        Create Room
      </button>

      {status && <p>{status}</p>}
      {roomId && (
        <p>
          Room ID: <strong>{roomId}</strong>
        </p>
      )}
    </div>
  );
}
