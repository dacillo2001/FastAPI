import React from 'react';

function Filter({ setFilter, currentFilter }) {
  return (
    <div className="filter-buttons">
      <button
        className={currentFilter === 'all' ? 'active' : ''}
        onClick={() => setFilter('all')}
      >
        All
      </button>
      <button
        className={currentFilter === 'completed' ? 'active' : ''}
        onClick={() => setFilter('completed')}
      >
        Completed
      </button>
      <button
        className={currentFilter === 'pending' ? 'active' : ''}
        onClick={() => setFilter('pending')}
      >
        Pending
      </button>
    </div>
  );
}
export default Filter;
