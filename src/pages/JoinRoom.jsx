import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../api/supabase";

export default function JoinRoom() {
  const { roomId: paramRoomId } = useParams();
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(paramRoomId || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  // 🧠 Auto-login if user has already joined this room
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("secret_santa_user"));
    if (savedUser && savedUser.room_id) {
      navigate(`/dashboard/${savedUser.room_id}`);
    }
  }, [navigate]);

  async function handleJoin() {
    if (!roomId || !name || !email) {
      setStatus("Please fill in all fields (Room ID, Name, Email).");
      return;
    }

    setStatus("Joining room...");

    // Check if the room exists
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
      localStorage.setItem(
        "secret_santa_user",
        JSON.stringify({ id: data.id, room_id: roomId, name, email })
      );
      setStatus("Joined successfully!");
      navigate(`/dashboard/${roomId}`);
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Join a Secret Santa Room</h2>

      {!paramRoomId && (
        <input
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value.trim())}
          style={{ display: "block", margin: "10px auto", padding: "8px" }}
        />
      )}

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
        Join Room
      </button>

      {status && <p>{status}</p>}
    </div>
  );
}
