import React from 'react';
import { CATEGORIES } from '../data/topics';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4 my-8">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            activeCategory === category
              ? 'bg-accent-primary text-primary shadow-md transform scale-105'
              : 'bg-white text-primary border border-secondary/20 hover:border-accent-primary hover:text-accent-secondary'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
