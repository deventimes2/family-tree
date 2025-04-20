import React, { useState } from 'react';
import Member from './Member';
import Form from './Form';
import { connectMembers } from '../utils/helpers';

const FamilyTree = () => {
  const [members, setMembers] = useState([]);
  const [draggingId, setDraggingId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (id, e) => {
    setDraggingId(id);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;
    
    const dx = e.clientX - position.x;
    const dy = e.clientY - position.y;
    
    setMembers(members.map(member => {
      if (member.id === draggingId) {
        return {
          ...member,
          x: member.x + dx,
          y: member.y + dy
        };
      }
      return member;
    }));
    
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  return (
    <div 
      className="family-tree" 
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'relative', height: '100vh', width: '100vw' }}
    >
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {connectMembers(members)}
      </svg>
      
      {members.map(member => (
        <Member
          key={member.id}
          member={member}
          onMouseDown={handleMouseDown}
        />
      ))}
      
      <Form members={members} setMembers={setMembers} />
    </div>
  );
};

export default FamilyTree;