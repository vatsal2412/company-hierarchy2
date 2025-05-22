import React, { useState } from 'react';

const TeamForm = ({ onAdd, teams, onEdit }) => {
const [name, setName] = useState('');
const [headPosition, setHeadPosition] = useState('Head of staff/HR');

const handleSubmit = e => {
e.preventDefault();
if (!name) {
alert('Team name required');
return;
}

const exists = teams.find(t => t.name.toLowerCase() === name.toLowerCase());
if (exists) {
alert('Team name already exists');
return;
}
onAdd({ id: Date.now().toString(), name, headPosition });
setName('');
};

return (
<form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
<h3>Add Team</h3>
<label>
Team Name:
<input value={name} onChange={e => setName(e.target.value)} required />
</label>
<br />
<label>
Head Position:
<select value={headPosition} onChange={e => setHeadPosition(e.target.value)} required>
<option value="Head of staff/HR">Head of staff/HR</option>
<option value="Head of engineering">Head of engineering</option>
<option value="Head of design">Head of design</option>
</select>
</label>
<br />
<button type="submit" style={{ marginTop: 10 }}>Add Team</button>
</form>
);
};

export default TeamForm;