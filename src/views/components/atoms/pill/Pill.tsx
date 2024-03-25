import React from 'react';
import './Pill.scss';
import { FaCheck } from 'react-icons/fa';

interface IProps {
  text: string;
  variant: string;
  icon?: boolean;
}

const Pill = ({ text, variant, icon }: IProps) => {
  return (
    <div
      className={`pill-component ${
        variant === 'success'
          ? 'success'
          : variant === 'danger'
          ? 'danger'
          : variant === 'info'
          ? 'info'
          : ''
      }`}
    >
      {icon && (
        <div className='icon'>
          <FaCheck />
        </div>
      )}
      <p>{text}</p>
    </div>
  );
};

export default Pill;
