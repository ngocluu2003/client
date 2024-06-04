// src/components/FilterBar.js
import React from 'react';

function FilterBar({ filter, setFilter }) {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <button
        className={`px-4 py-2 rounded ${filter === 'Free' ? 'bg-royal-green-900 text-white' : 'text-md text-royal-green-900  hover:text-gold-900'}`}
        onClick={() => setFilter('Free')}
      >
        Free
      </button>
      <button
        className={`px-4 py-2 rounded ${filter === 'Paid' ? 'bg-royal-green-900 text-white' : 'text-md text-royal-green-900  hover:text-gold-900'}`}
        onClick={() => setFilter('Paid')}
      >
        Paid
      </button>
      <button
        className={`px-4 py-2 rounded ${filter === 'All' ? 'bg-royal-green-900 text-white' : 'text-md text-royal-green-900  hover:text-gold-900'}`}
        onClick={() => setFilter('All')}
      >
        All
      </button>
    </div>
  );
}

export default FilterBar;
