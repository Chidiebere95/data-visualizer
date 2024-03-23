/* eslint-disable no-restricted-globals */
import { useNavigate, useParams } from 'react-router-dom';
import charts from '../../../assets/images/charts.png';
import {
  FaCheck,
  FaExclamation,
  FaEye,
  FaLockOpen,
  FaSearch,
} from 'react-icons/fa';
import { MdOutlineSettings } from 'react-icons/md';

import './Dashboard.scss';

import { FaGear, FaPeopleGroup } from 'react-icons/fa6';
import { RiCompassDiscoverLine, RiSearchLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoLockOpenOutline } from 'react-icons/io5';
import { useState } from 'react';
import Overview from '../../components/tabs/dashboard/overview/Overview';
import Teammates from '../../components/tabs/dashboard/teammates/Teammates';
import Search from '../../components/molecules/search/Search';
function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='dashboard-wrapper'>
      <div className='container'>
        <div className='dashboard-header'>
          <p>Roqqu productivity tracker</p>
        </div>
        <div className='dashboard-tabs'>
          <div className='tabs'>
            <div className={`tab ${activeTab === 'overview' && 'active'}`}>
              <div className='icon'>
                <RiCompassDiscoverLine />
              </div>
              <p>Overview</p>
            </div>
            <div className={`tab ${activeTab === 'teammates' && 'active'}`}>
              <div className='icon'>
                <HiOutlineUserGroup />
              </div>
              <p>Teammates</p>
            </div>
            <div className={`tab ${activeTab === 'permissions' && 'active'}`}>
              <div className='icon'>
                <IoLockOpenOutline />
              </div>
              <p>Permissions</p>
            </div>
            <div className={`tab ${activeTab === 'settings' && 'active'}`}>
              <div className='icon'>
                <MdOutlineSettings />
              </div>
              <p>Settings</p>
            </div>
          </div>
          <div className='search-wrapper'>
            <Search />
          </div>
        </div>
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'teammates' && <Teammates />}
      </div>
    </div>
  );
}

export default Dashboard;
