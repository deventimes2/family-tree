import React, { useState } from 'react';

const Form = ({ members, setMembers }) => {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('child');
  const [selectedMember, setSelectedMember] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !selectedMember) return;

    const newMember = {
      id: Date.now(),
      name,
      x: 500,
      y: 300,
      parents: [],
      children: [],
      partner: null
    };

    setMembers(prev => {
      const updated = [...prev];
      const parent = updated.find(m => m.id === Number(selectedMember));
      
      if (relation === 'child') {
        parent.children.push(newMember.id);
        newMember.parents.push(parent.id);
      } else if (relation === 'partner') {
        parent.partner = name;
        return updated; // Partners share the same node
      }
      
      return [...updated, newMember];
    });

    setName('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'fixed', top: 20, left: 20 }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <select value={relation} onChange={(e) => setRelation(e.target.value)}>
        <option value="child">Add Child</option>
        <option value="partner">Add Partner</option>
      </select>
      <select 
        value={selectedMember} 
        onChange={(e) => setSelectedMember(e.target.value)}
      >
        <option value="">Select Member</option>
        {members.map(member => (
          <option key={member.id} value={member.id}>{member.name}</option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default Form;