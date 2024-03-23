import React from 'react';
import './Status.scss';

interface IProps {
  variant: string;
}

const Status = ({ variant }: IProps) => {
  return (
    <div
      className={`status-component ${
        variant === 'success' ? 'success' : variant === 'danger' ? 'danger' : ''
      }`}
    ></div>
  );
};

export default Status;
