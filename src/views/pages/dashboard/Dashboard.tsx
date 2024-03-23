/* eslint-disable no-restricted-globals */
import { useNavigate } from 'react-router-dom';
import { MdOutlineSettings } from 'react-icons/md';
import './Dashboard.scss';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoLockOpenOutline } from 'react-icons/io5';
import { useState } from 'react';
import Overview from '../../components/tabs/dashboard/overview/Overview';
import Teammates from '../../components/tabs/dashboard/teammates/Teammates';
import Search from '../../components/molecules/search/Search';
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className='dashboard-wrapper'>
      <div className='container'>
        <div className='dashboard-header'>
          <p>Roqqu productivity tracker</p>
        </div>
        <div className='dashboard-tabs'>
          <div className='tabs'>
            <div
              onClick={() => setActiveTab('overview')}
              className={`tab ${activeTab === 'overview' && 'active'}`}
            >
              <div className='icon'>
                <RiCompassDiscoverLine />
              </div>
              <p>Overview</p>
            </div>
            <div
              onClick={() => setActiveTab('teammates')}
              className={`tab ${activeTab === 'teammates' && 'active'}`}
            >
              <div className='icon'>
                <HiOutlineUserGroup />
              </div>
              <p>Teammates</p>
            </div>
            <div
              onClick={() => setActiveTab('permissions')}
              className={`tab ${activeTab === 'permissions' && 'active'}`}
            >
              <div className='icon'>
                <IoLockOpenOutline />
              </div>
              <p>Permissions</p>
            </div>
            <div
              onClick={() => setActiveTab('settings')}
              className={`tab ${activeTab === 'settings' && 'active'}`}
            >
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
