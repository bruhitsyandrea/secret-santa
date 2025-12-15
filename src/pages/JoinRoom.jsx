import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabase";

export default function JoinRoom() {
  const { roomId } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  async function handleJoin() {
    if (!name || !email) {
      setStatus("Please fill in both fields.");
      return;
    }

    setStatus("Joining room...");

    // Check that the room exists
    const { data: room, error: roomError } = await supabase
      .from("rooms")
      .select("id")
      .eq("id", roomId)
      .single();

    if (roomError || !room) {
      setStatus("Room not found.");
      return;
    }

    // Add participant
    const { data, error } = await supabase
      .from("participants")
      .insert([{ room_id: roomId, name, email }])
      .select()
      .single();

    if (error) {
      console.error(error);
      setStatus("Error joining room.");
    } else {
      setStatus("Joined successfully!");
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Join Room</h2>
      <p>Room ID: {roomId}</p>

      <input
        placeholder="Your name"
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
      <button onClick={handleJoin} style={{ marginTop: "10px" }}>
        Join
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
