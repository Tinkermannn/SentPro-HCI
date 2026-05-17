import React, { useState } from 'react';
import { reviewData } from './data';
import ReviewCard from './ReviewCard';
import LogicModal from './LogicModal';

export default function Dashboard() {
  const [activeModalData, setActiveModalData] = useState(null);

  const handleOpenModal = (data) => {
    setActiveModalData(data);
  };

  const handleCloseModal = () => {
    setActiveModalData(null);
  };

  return (
    <div>
      {reviewData.map((data) => (
        <ReviewCard 
          key={data.id} 
          data={data} 
          onOpenLogicExplanation={() => handleOpenModal(data)} 
        />
      ))}

      {activeModalData && (
        <LogicModal 
          data={activeModalData} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
