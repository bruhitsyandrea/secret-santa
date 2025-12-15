import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../api/supabase";
import { assignPairs } from "../utils/assignPairs";
import { sendEmail } from "../api/email";

export default function Dashboard() {
  const { roomId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadParticipants();
  }, []);

  async function loadParticipants() {
    const { data, error } = await supabase
      .from("participants")
      .select("*")
      .eq("room_id", roomId);
    if (!error) setParticipants(data || []);
  }

  async function startSecretSanta() {
    if (participants.length < 2) {
      setStatus("Need at least 2 participants!");
      return;
    }

    setStatus("Assigning pairs and sending emails...");

    const pairs = assignPairs(participants);

    // Prepare all update + email tasks in parallel
    const tasks = pairs.map(async (pair) => {
      const giver = participants.find((p) => p.id === pair.giverId);
      const receiver = participants.find((p) => p.id === pair.receiverId);

      // update DB
      await supabase
        .from("participants")
        .update({ assigned_to: receiver.id })
        .eq("id", giver.id);

      // send email
      await sendEmail({
        to: giver.email,
        subject: "🎅 Your Secret Santa Assignment!",
        html: `
          <p>Hi ${giver.name},</p>
          <p>You’ll be gifting to <b>${receiver.name}</b> 🎁</p>
          <p>Be creative, kind, and have fun!</p>
        `,
      });
    });

    await Promise.all(tasks);

    setStatus("✅ All assignments complete and emails sent!");
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>🎅 Room Dashboard</h2>
      <p>Room ID: {roomId}</p>
      <button onClick={startSecretSanta}>Start Secret Santa</button>
      <p>{status}</p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {participants.map((p) => (
          <li key={p.id}>
            {p.name} — {p.email} {p.assigned_to ? "🎁 Assigned" : ""}
          </li>
        ))}
      </ul>
    </div>
  );
}
