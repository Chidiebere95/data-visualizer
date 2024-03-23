import React from 'react';
import './Pill.scss';

interface IProps {
  text: string;
  variant: string;
}

const Pill = ({ text, variant }: IProps) => {

  return (
    <div
      className={`pill-component ${
        variant === 'success' ? 'success' : variant === 'danger' ? 'danger' : ''
      }`}
    >
      {text}
    </div>
  );
};

export default Pill;
