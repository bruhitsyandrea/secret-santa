import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabase";

export default function Dashboard() {
  const { roomId } = useParams();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    async function fetchParticipants() {
      const { data, error } = await supabase
        .from("participants")
        .select("*")
        .eq("room_id", roomId);
      if (!error) setParticipants(data);
    }
    fetchParticipants();
  }, [roomId]);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🎅 Room Dashboard</h2>
      <p>Room ID: {roomId}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {participants.map((p) => (
          <li key={p.id}>
            {p.name} — {p.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
