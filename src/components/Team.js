import React from 'react';
import EmployeeNode from './EmployeeNode';

const Team = ({
team,
employees,
onTeamSelect,
onPromote,
onRemove,
onMove,
onUpdateEmployee,
}) => {

const handleDrop = e => {
e.preventDefault();
const draggedEmployeeId = e.dataTransfer.getData('drag-employee-id');
if (draggedEmployeeId) {
onMove(draggedEmployeeId, team.name);
}
};

const handleDragOver = e => e.preventDefault();

return (
<div
style={{
paddingLeft: 20,
borderLeft: '3px solid #0055cc',
marginBottom: 20,
}}
onDrop={handleDrop}
onDragOver={handleDragOver}
>
<h3
style={{ cursor: 'pointer', color: '#007acc' }}
onClick={() => onTeamSelect('team', { name: team.name })}
>
Team: {team.name}
</h3>
<p><i>Leader:</i></p>
{employees
.filter(emp => emp.position === 'Team leader')
.map(leader => (
<EmployeeNode
key={leader.id}
employee={leader}
onPromote={onPromote}
onRemove={onRemove}
onMove={onMove}
onUpdateEmployee={onUpdateEmployee}
/>
))}
<p><i>Members:</i></p>
{employees
.filter(emp => emp.position === 'Team member')
.map(member => (
<EmployeeNode
key={member.id}
employee={member}
onPromote={onPromote}
onRemove={onRemove}
onMove={onMove}
onUpdateEmployee={onUpdateEmployee}
/>
))}
</div>
);
};

export default Team;