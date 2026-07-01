import React, { useState } from 'react';
import './OptionCard.css';

interface RoomOption {
  roomNumber: number;
  type: 'sea' | 'extra';
  beds: number;
  score: number;
}

interface OptionCardProps {
  options: RoomOption[];
  onSelect: (roomNumber: number) => void;
  onCancel: () => void;
}

const typeLabels: Record<RoomOption['type'], string> = {
  sea: 'מול הים',
  extra: 'אקסטרה',
};

const OptionCard: React.FC<OptionCardProps> = ({ options, onSelect, onCancel }) => {
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);

  const handleSelect = (roomNumber: number) => {
    setSelectedRoom(roomNumber);
    onSelect(roomNumber);
  };

  return (
    <div className="option-card-container">
      <h2 className="option-card-title">החדרים המוצעים עבורך</h2>
      <p className="option-card-subtitle">
        להלן האפשרויות המתאימות ביותר לפי דרישותיך. בחר את החדר המועדף או בטל.
      </p>

      <div className="option-card-grid">
        {options.map((room) => {
          const isSelected = selectedRoom === room.roomNumber;

          return (
            <div
              key={room.roomNumber}
              className={`option-card${isSelected ? ' option-card--selected' : ''}`}
              dir="rtl"
            >
              {/* תגית סוג חדר */}
              <span className="option-card__badge">
                {typeLabels[room.type]}
              </span>

              {/* ניקוד */}
              <div className="option-card__score-wrapper">
                <div className="option-card__score-circle">
                  <span className="option-card__score-value">{room.score}</span>
                  <span className="option-card__score-label">ניקוד</span>
                </div>
              </div>

              {/* פרטי החדר */}
              <div className="option-card__details">
                <div className="option-card__detail">
                  <span className="option-card__detail-icon">🚪</span>
                  <div>
                    <span className="option-card__detail-label">חדר מס'</span>
                    <span className="option-card__detail-value">{room.roomNumber}</span>
                  </div>
                </div>
                <div className="option-card__detail">
                  <span className="option-card__detail-icon">🛏️</span>
                  <div>
                    <span className="option-card__detail-label">מיטות</span>
                    <span className="option-card__detail-value">{room.beds}</span>
                  </div>
                </div>
              </div>

              {/* כפתור בחירה */}
              <button
                className={`option-card__button${isSelected ? ' option-card__button--selected' : ''}`}
                onClick={() => handleSelect(room.roomNumber)}
                disabled={isSelected}
              >
                {isSelected ? 'נבחר ✓' : 'בחר חדר זה'}
              </button>
            </div>
          );
        })}
      </div>

      {/* כפתור ביטול כללי */}
      <div className="option-card-actions">
        <button className="option-card__cancel" onClick={onCancel}>
          אינני מעוניין, בטל
        </button>
      </div>
    </div>
  );
};

export default OptionCard;