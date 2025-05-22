import React from 'react';
import Team from './Team';


const positionLevels = [
'Team member',
'Team leader',
'Head of staff/HR',
'Head of engineering',
'Head of design',
'CEO',
];

const Hierarchy = ({
employees,
teams,
onTeamSelect,
onPromote,
onRemove,
onMove,
onUpdateEmployee,
}) => {

const teamsByHead = {};
teams.forEach(team => {
if (!teamsByHead[team.headPosition]) {
teamsByHead[team.headPosition] = [];
}
teamsByHead[team.headPosition].push(team);
});


const employeesByTeam = {};
employees.forEach(emp => {
if (!employeesByTeam[emp.team]) {
employeesByTeam[emp.team] = [];
}
employeesByTeam[emp.team].push(emp);
});


const heads = [
'CEO',
'Head of staff/HR',
'Head of engineering',
'Head of design',
];

return (
<div>
{heads.map(head => (
<div key={head} style={{ marginBottom: 30 }}>
<h2
style={{ cursor: 'pointer', color: '#0055cc' }}
onClick={() => onTeamSelect('position', { position: head })}
>
{head}
</h2>
{head === 'CEO' ? (

employees
.filter(emp => emp.position === 'CEO')
.map(emp => (
<EmployeeNode
key={emp.id}
employee={emp}
onPromote={onPromote}
onRemove={onRemove}
onMove={onMove}
onUpdateEmployee={onUpdateEmployee}
/>
))
) : (

teamsByHead[head]
? teamsByHead[head].map(team => (
<Team
key={team.id}
team={team}
employees={employeesByTeam[team.name] || []}
onTeamSelect={onTeamSelect}
onPromote={onPromote}
onRemove={onRemove}
onMove={onMove}
onUpdateEmployee={onUpdateEmployee}
/>
))
: <i>No teams under this head</i>
)}
</div>
))}
</div>
);
};

const EmployeeNode = ({
employee,
onPromote,
onRemove,
onMove,
onUpdateEmployee,
}) => {
const canPromote = employee.position !== 'CEO';

const handlePromote = () => {
onPromote(employee.id);
};

const handleRemove = () => {
if (window.confirm(`Remove employee ${employee.name}?`)) {
onRemove(employee.id);
}
};

return (
<div
style={{
paddingLeft: 20,
borderLeft: '2px solid #ccc',
marginBottom: 8,
}}
draggable
onDragStart={e => {
e.dataTransfer.setData('drag-employee-id', employee.id);
}}
>
<strong>{employee.position}:</strong> {employee.name} <br />
<small>
ID: {employee.id} | Phone: {employee.phone} | Email: {employee.email}
</small>
<br />
<button onClick={handlePromote} disabled={!canPromote} style={{ marginRight: 8 }}>
Promote
</button>
<button onClick={handleRemove} style={{ color: 'red' }}>
Remove
</button>
</div>
);
};

export default Hierarchy;
