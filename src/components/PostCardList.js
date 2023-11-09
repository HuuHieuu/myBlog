import React from 'react';
import PostCard from './PostCard';

export default function CardList() {
  const cards = [1, 2, 3, 4, 5, 6]; 

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', padding: '20px' }}>
      {cards.map((card) => (
        <PostCard key={card} />
      ))}
    </div>
  );
}
