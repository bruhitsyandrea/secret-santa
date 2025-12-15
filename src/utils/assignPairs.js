// Randomly assign each participant to another
export function assignPairs(participants) {
    const givers = [...participants];
    const receivers = [...participants];
  
    // Shuffle receivers
    for (let i = receivers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [receivers[i], receivers[j]] = [receivers[j], receivers[i]];
    }
  
    // Avoid self-assignment
    for (let i = 0; i < givers.length; i++) {
      if (givers[i].id === receivers[i].id) {
        return assignPairs(participants); // retry if conflict
      }
    }
  
    return givers.map((g, i) => ({
      giverId: g.id,
      receiverId: receivers[i].id,
    }));
  }
  