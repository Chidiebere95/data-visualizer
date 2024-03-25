import React, { ReactNode } from 'react';
import './Dropdown.scss';
import { RiSearchLine } from 'react-icons/ri';
import { FaChevronDown } from 'react-icons/fa';
import OutsideClickHandler from 'react-outside-click-handler';

interface IProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  dropdownSelected: {
    title: string;
    value: string;
  };
  setDropdownSelected: React.Dispatch<
    React.SetStateAction<{
      title: string;
      value: string;
    }>
  >;
  dropdownOptions: {
    title: string;
    value: string;
  }[];
  children: ReactNode;
}

const Dropdown = ({
  showDropdown,
  setShowDropdown,
  setDropdownSelected,
  dropdownOptions,
  children,
  dropdownSelected,
}: IProps) => {
  // console.log('dropdownSelected###', dropdownSelected);

  return (
    <div className='dropdown-component'>
      {children}
      {showDropdown && (
        <div className='dropdown-wrapper'>
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowDropdown(false);
            }}
          >
            <div className='dropdown' style={{ width: '150px' }}>
              {dropdownOptions.map((item: any, index: number) => (
                <div
                  className={`option ${
                    dropdownSelected.value === item.value && 'active'
                  }`}
                  key={index}
                  onClick={() => {
                    setDropdownSelected(item);
                    setShowDropdown(false);
                  }}
                >
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </OutsideClickHandler>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
