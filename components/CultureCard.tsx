
import React from 'react';
import { CultureItem, CategoryType } from '../types';

interface Props {
  item: CultureItem;
  onClick: (item: CultureItem) => void;
}

export const CultureCard: React.FC<Props> = ({ item, onClick }) => {
  const getCategoryColor = (cat: CategoryType) => {
    switch (cat) {
      case CategoryType.SURNAME: return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case CategoryType.PROVERB: return 'bg-amber-100 text-amber-800 border-amber-200';
      case CategoryType.HISTORY: return 'bg-red-100 text-red-800 border-red-200';
      case CategoryType.BUSINESS: return 'bg-purple-100 text-purple-800 border-purple-200';
      case CategoryType.ENTERTAINMENT: return 'bg-pink-100 text-pink-800 border-pink-200';
      case CategoryType.ART: return 'bg-orange-100 text-orange-800 border-orange-200';
      case CategoryType.LINGUISTIC: return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case CategoryType.GEOGRAPHY: return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case CategoryType.URBAN: return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      onClick={() => onClick(item)}
      className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald-500 transition-all cursor-pointer duration-300 transform hover:-translate-y-1 h-full flex flex-col"
    >
      <div className="mb-4">
        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(item.category)}`}>
          {item.category}
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-600 line-clamp-3 text-sm flex-grow">
        {item.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-gray-50">
        {item.tags.map(tag => (
          <span key={tag} className="text-[10px] bg-gray-50 text-gray-400 px-2 py-1 rounded uppercase tracking-wider font-bold">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
