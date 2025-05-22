
import React, { useState } from 'react';

const EmployeeForm = ({ onAdd, teams }) => {
const [name, setName] = useState('');
const [id, setId] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [position, setPosition] = useState('Team member');
const [team, setTeam] = useState(teams[0]?.name || '');

const handleSubmit = e => {
e.preventDefault();
if (!name || !id || !phone || !email || !position || !team) {
alert('Please fill all fields');
return;
}
onAdd({ id, name, phone, email, position, team });
setName('');
setId('');
setPhone('');
setEmail('');
};

return (
<form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8, marginBottom: 20 }}>
<h3>Add Employee</h3>
<label>
Name:
<input value={name} onChange={e => setName(e.target.value)} required />
</label>
<br />
<label>
ID:
<input value={id} onChange={e => setId(e.target.value)} required />
</label>
<br />
<label>
Phone:
<input value={phone} onChange={e => setPhone(e.target.value)} required />
</label>
<br />
<label>
Email:
<input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
</label>
<br />
<label>
Position:
<select value={position} onChange={e => setPosition(e.target.value)} required>
<option value="Team member">Team member</option>
<option value="Team leader">Team leader</option>
<option value="Head of staff/HR">Head of staff/HR</option>
<option value="Head of engineering">Head of engineering</option>
<option value="Head of design">Head of design</option>
<option value="CEO">CEO</option>
</select>
</label>
<br />
<label>
Team:
<select value={team} onChange={e => setTeam(e.target.value)} required>
{teams.map(t => (
<option key={t.id} value={t.name}>
{t.name}
</option>
))}
</select>
</label>
<br />
<button type="submit" style={{ marginTop: 10 }}>Add Employee</button>
</form>
);
};

export default EmployeeForm;