import React, { useEffect, useState } from "react";
import { supabase } from "../api/supabase";
import { assignPairs } from "../utils/assignPairs";
import { sendEmail } from "../api/email"; // you’ll make this next

export default function Dashboard({ roomId }) {
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
    if (error) console.error(error);
    else setParticipants(data);
  }

  async function startSecretSanta() {
    if (participants.length < 2) {
      setStatus("Need at least 2 participants!");
      return;
    }

    const pairs = assignPairs(participants);

    setStatus("Assigning and sending emails...");

    // Save to DB + send email for each
    for (const pair of pairs) {
      const giver = participants.find((p) => p.id === pair.giverId);
      const receiver = participants.find((p) => p.id === pair.receiverId);

      await supabase
        .from("participants")
        .update({ assigned_to: pair.receiverId })
        .eq("id", pair.giverId);

      await sendEmail({
        to: giver.email,
        subject: "🎅 Your Secret Santa Assignment!",
        html: `<p>Hi ${giver.name},<br />You’ll be gifting to <b>${receiver.name}</b>! 🎁</p>`,
      });
    }

    setStatus("All assignments complete!");
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Host Dashboard</h2>
      <p>Participants: {participants.length}</p>
      <button onClick={startSecretSanta}>Start Secret Santa</button>
      {status && <p>{status}</p>}
    </div>
  );
}
