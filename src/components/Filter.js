import React from 'react';
const Filter = ({ filterText, setFilterText }) => {
  return (
    <input
      type="search"
      placeholder="Filter by Name, Phone, or Email"
      value={filterText}
      onChange={e => setFilterText(e.target.value)}
      style={{
        padding: '8px 12px',
        width: '100%',
        fontSize: 16,
        borderRadius: 4,
        border: '1px solid #ccc',
      }}
    />
  );
};
export default Filter;