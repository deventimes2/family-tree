import React from 'react';

const Member = ({ member, onMouseDown }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: member.x,
        top: member.y,
        padding: '10px',
        border: '2px solid #333',
        borderRadius: '5px',
        backgroundColor: '#fff',
        cursor: 'move',
      }}
      onMouseDown={(e) => onMouseDown(member.id, e)}
    >
      <div>{member.name}</div>
      {member.partner && <div>Partner: {member.partner}</div>}
    </div>
  );
};

export default Member;