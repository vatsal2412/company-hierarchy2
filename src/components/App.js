import React, 
{ 
  useState,
   useMemo   
} 
from 'react';
import Hierarchy from './Hierarchy';
import EmployeeForm from './EmployeeForm';
import TeamForm from './TeamForm';
import Filter from './Filter';
import { useEmployees } from '../hooks/useEmployees';
const App = () => {
  const {
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
  } = useEmployees();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [filterText, setFilterText] = useState('');
  const filteredEmployees = useMemo(() => {
    if (!filterText.trim()) return employees;
    const lower = filterText.toLowerCase();
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(lower) ||
      emp.phone.includes(lower) ||
      emp.email.toLowerCase().includes(lower)
    );
  }, [employees, filterText]);
  const employeesToShow = useMemo(() => {
    if (!selectedTeam) return filteredEmployees;
    if (selectedTeam.type === 'position') {
      if (selectedTeam.position === 'CEO') {
        return filteredEmployees;
      }
      const headTeams = teams.filter(team => team.headPosition === selectedTeam.position).map(t => t.name);
      return filteredEmployees.filter(emp => headTeams.includes(emp.team));
    } else if (selectedTeam.type === 'team') {
      return filteredEmployees.filter(emp => emp.team === selectedTeam.name);
    }
    return filteredEmployees;
  }, [selectedTeam, filteredEmployees, teams]);
  const handleTeamSelect = (type, data) => {
    setSelectedTeam({ type, ...data });
  };

  return (
    <div style={{ maxWidth: 960, margin: 'auto', padding: 20 }}>
      <h1>Company Hierarchy</h1>
      <Filter filterText={filterText} setFilterText={setFilterText} />
      <div style={{ display: 'flex', marginTop: 20, gap: 30 }}>
        <div style={{ flex: 1, minWidth: 320 }}>
          <Hierarchy
            employees={employeesToShow}
            teams={teams}
            onTeamSelect={handleTeamSelect}
            onPromote={promoteEmployee}
            onRemove={removeEmployee}
            onMove={moveEmployeeToTeam}
            onUpdateEmployee={updateEmployee}
          />
        </div>
        <div style={{ flex: '0 0 300px' }}>
          <EmployeeForm onAdd={addEmployee} teams={teams} />
          <TeamForm onAdd={addTeam} teams={teams} onEdit={updateTeam} />
        </div>
      </div>
    </div>
  );
};
export default App;