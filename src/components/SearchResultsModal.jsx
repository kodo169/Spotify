import React from 'react';
import clsx from 'clsx';
import style from './SearchResultsModal.module.scss';

export default function SearchResultsModal({ isOpen, onClose, results }) {
  if (!isOpen) return null;

  return (
    <div className={clsx(style.container)}>
      <div className={clsx(style.modalOverlay)} onClick={onClose}>
      <div className={clsx(style.modalContent)} onClick={(e) => e.stopPropagation()}>
        <h2>Search Results</h2>
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <img src={result.imageUrl} alt={result.name} />
              <span>{result.name}</span>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
    </div>
  );
}
