export const connectMembers = (members) => {
  const connections = [];
  
  members.forEach(parent => {
    parent.children.forEach(childId => {
      const child = members.find(m => m.id === childId);
      if (child) {
        connections.push(
          <line
            key={`${parent.id}-${childId}`}
            x1={parent.x + 50}
            y1={parent.y + 50}
            x2={child.x + 50}
            y2={child.y + 50}
            stroke="#333"
            strokeWidth="2"
          />
        );
      }
    });
  });

  return connections;
};