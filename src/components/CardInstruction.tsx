import React from 'react';
import './CardInstruction.css';

interface CardProps {
  image: string;
  heading: string;
  subHeading: string;
  tagNumber: string;
}

const Card: React.FC<CardProps> = ({ image, subHeading1, heading, subHeading, tagNumber }) => {
  return (
    <div className="instructionCard">
      <img src={image} alt="Card" />
      <div className="card-content">
        <p>{subHeading1}</p>
        <h2>{heading}</h2>
        <p>{subHeading}</p>
        <span className="tag">{tagNumber}</span>
      </div>
    </div>
  );
};

export default Card;
