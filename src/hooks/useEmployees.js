import { useState, useEffect } from 'react';

const LOCAL_STORAGE_KEY_EMPLOYEES = 'hierarchy-employees-v1';
const LOCAL_STORAGE_KEY_TEAMS = 'hierarchy-teams-v1';

const positionHierarchy = [
'Team member',
'Team leader',
'Head of staff/HR',
'Head of engineering',
'Head of design',
'CEO',
];

const canMoveEmployeeToTeam = (employee, targetTeam) => {
if (!employee || !targetTeam) return false;
if (employee.position.includes('staff/HR') || employee.position === 'Team member' || employee.position === 'Team leader') {
if (targetTeam.headPosition === 'Head of design' && employee.position.includes('staff/HR')) {
return false;
}
}
return true;
};

export const useEmployees = () => {
const [employees, setEmployees] = useState([]);
const [teams, setTeams] = useState([]);

useEffect(() => {
const storedEmps = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_EMPLOYEES));
const storedTeams = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_TEAMS));
if (storedEmps) setEmployees(storedEmps);
else {
setEmployees([
{ id: '1', name: 'Rajesh Kumar', phone: '9876543210', email: 'rajesh.kumar@example.com', position: 'CEO', team: 'Executive' },
{ id: '2', name: 'Sunita Singh', phone: '9123456780', email: 'sunita.singh@example.com', position: 'Head of staff/HR', team: 'HR Team 1' },
{ id: '3', name: 'Amit Verma', phone: '9988776655', email: 'amit.verma@example.com', position: 'Team leader', team: 'HR Team 1' },
{ id: '4', name: 'Rohit Sharma', phone: '9123987654', email: 'rohit.sharma@example.com', position: 'Team member', team: 'HR Team 1' },
{ id: '5', name: 'Neha Gupta', phone: '9876501234', email: 'neha.gupta@example.com', position: 'Head of engineering', team: 'Engineering Team 1' },
{ id: '6', name: 'Suresh Reddy', phone: '9000112233', email: 'suresh.reddy@example.com', position: 'Team leader', team: 'Engineering Team 1' },
{ id: '7', name: 'Priya Jain', phone: '9500123456', email: 'priya.jain@example.com', position: 'Team member', team: 'Engineering Team 1' },
{ id: '8', name: 'Anita Desai', phone: '9012345678', email: 'anita.desai@example.com', position: 'Head of design', team: 'Design Team 1' },
{ id: '9', name: 'Vikram Patil', phone: '9876509876', email: 'vikram.patil@example.com', position: 'Team leader', team: 'Design Team 1' },
{ id: '10', name: 'Sonal Mehta', phone: '9988778899', email: 'sonal.mehta@example.com', position: 'Team member', team: 'Design Team 1' },
]);
}
if (storedTeams) setTeams(storedTeams);
else {
setTeams([
{ id: 'team1', name: 'Executive', headPosition: 'CEO' },
{ id: 'team2', name: 'HR Team 1', headPosition: 'Head of staff/HR' },
{ id: 'team3', name: 'Engineering Team 1', headPosition: 'Head of engineering' },
{ id: 'team4', name: 'Design Team 1', headPosition: 'Head of design' },
]);
}
}, []);

useEffect(() => {
localStorage.setItem(LOCAL_STORAGE_KEY_EMPLOYEES, JSON.stringify(employees));
}, [employees]);

useEffect(() => {
localStorage.setItem(LOCAL_STORAGE_KEY_TEAMS, JSON.stringify(teams));
}, [teams]);

const addEmployee = (employee) => {
setEmployees(prev => [...prev, employee]);
};

const updateEmployee = (updatedEmployee) => {
setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
};

const removeEmployee = (id) => {
setEmployees(prev => prev.filter(emp => emp.id !== id));
};

const addTeam = (team) => {
setTeams(prev => [...prev, team]);
};

const updateTeam = (updatedTeam) => {
setTeams(prev => prev.map(t => t.id === updatedTeam.id ? updatedTeam : t));
};

const removeTeam = (id) => {
setTeams(prev => prev.filter(t => t.id !== id));
};

const promoteEmployee = (id) => {
setEmployees(prev =>
prev.map(emp => {
if (emp.id === id) {
const idx = positionHierarchy.indexOf(emp.position);
if (idx < 0 || idx >= positionHierarchy.length - 1) return emp;
const newPosition = positionHierarchy[idx + 1];
return { ...emp, position: newPosition };
}
return emp;
})
);
};

const moveEmployeeToTeam = (employeeId, newTeamName) => {
const employee = employees.find(e => e.id === employeeId);
const newTeam = teams.find(t => t.name === newTeamName);
if (!employee || !newTeam) return;

if (!canMoveEmployeeToTeam(employee, newTeam)) {
alert('Cannot move HR employee to Design team.');
return;
}
updateEmployee({ ...employee, team: newTeamName });
};

return {
employees,
teams,
addEmployee,
updateEmployee,
removeEmployee,
addTeam,
updateTeam,
removeTeam,
promoteEmployee,
moveEmployeeToTeam,
};
};
