/* eslint-disable no-restricted-globals */
import { useNavigate } from 'react-router-dom';
import { MdOutlineSettings } from 'react-icons/md';
import './Teammate.scss';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoLockOpenOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Overview from '../overview/Overview';
import Teammates from '../teammates/Teammates';
import { useDispatch, useSelector } from 'react-redux';
import { triggerGetAllDataDaily } from '../../../../../features/general/general_slice';
import { RootState } from '../../../../../store/store';
import Search from '../../../molecules/search/Search';
import OverviewTeammate from '../../../molecules/overview-teammate/OverviewTeammate';
function Teammate() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('teammates');
  const { getAllDataDaily } = useSelector((state: RootState) => state.general);

  const dispatch = useDispatch<any>();
  const [entries, setEntries] = useState<Array<any>>([]);
  // new
  const [activeDay, setActiveDay] = useState<Array<any>>([]);
  useEffect(() => {
    if (getAllDataDaily.status === 'successful') {
      const data = getAllDataDaily.data;
      const entries = Object.entries(data);
      setEntries(entries);
      const last = entries[entries.length - 1];
      setActiveDay(last);
    }
  }, [getAllDataDaily]);

  useEffect(() => {
    dispatch(triggerGetAllDataDaily());
  }, []);
  return (
    <div className='teammate-wrapper'>
      <div className='container'>
        <div className='dashboard-header'>
          <p>Roqqu productivity tracker</p>
        </div>
        <div className='dashboard-tabs'>
          <div className='tabs'>
            <div
              onClick={() => navigate('/')}
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
          </div>
          <div className='search-wrapper'>
            <Search />
          </div>
        </div>
        <div className='filters-wrapper'>
          {entries.map((item: any, index: number) => (
            <button
              key={index}
              className={`filter ${activeDay[0] === item[0] && 'active'}`}
              onClick={() => setActiveDay(item)}
            >
              {item[0]}
            </button>
          ))}
        </div>
        {activeTab === 'teammates' && (
          <OverviewTeammate
            // activeDay={activeDay}
            // setActiveDay={setActiveDay}
            // entries={entries}
            // setEntries={setEntries}
          />
        )}
      </div>
    </div>
  );
}

export default Teammate;
