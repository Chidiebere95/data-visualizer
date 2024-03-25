import React, { ReactNode } from 'react';
import './Filter.scss';
import { RiSearchLine } from 'react-icons/ri';
import { FaChevronDown } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';

interface IProps {
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownSelected: {
    title: string;
    value: string;
  };
}

const Filter = ({ setShowDropdown, dropdownSelected }: IProps) => {
  return (
    <button className='filter-component' onClick={() => setShowDropdown(true)}>
      <p>{dropdownSelected.title}</p>
      <span>
        <FaChevronDown />
      </span>
    </button>
  );
};

export default Filter;
