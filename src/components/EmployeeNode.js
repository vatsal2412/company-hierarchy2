import React from 'react';

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
userSelect: 'none',
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

export default EmployeeNode;