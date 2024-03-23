import React from 'react';
import './Search.scss';
import { RiSearchLine } from 'react-icons/ri';

interface IProps {}

const Search = ({}: IProps) => {
  return (
    <div className='search-component'>
      <input type='text' placeholder='Search staff or email' />
      <div className='icon'>
        <RiSearchLine />
      </div>
    </div>
  );
};

export default Search;
