/* eslint-disable no-restricted-globals */
import { useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdOutlineSettings } from 'react-icons/md';
import './Dashboard.scss';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import Overview from '../../components/tabs/dashboard/overview/Overview';
import Teammates from '../../components/tabs/dashboard/teammates/Teammates';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveDay,
  setActiveMonth,
  setEntries,
  setEntriesMonthly,
  triggerGetAllDataDaily,
  triggerGetAllDataMonthly,
} from '../../../features/general/general_slice';
import { RootState } from '../../../store/store';
import Search from '../../components/molecules/search/Search';
import Dropdown from '../../components/molecules/dropdown/Dropdown';
import Filter from '../../components/molecules/filter/Filter';
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { getAllDataDaily, getAllDataMonthly } = useSelector(
    (state: RootState) => state.general
  );
  const { entries, activeDay, entriesMonthly } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch<any>();
  // intervals
  const [showDropdownIntervals, setShowDropdownIntervals] = useState(false);
  const [dropdownOptionsIntervals, setDropdownOptionsIntervals] = useState([
    { title: 'Daily', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
  ]);
  const [dropdownSelectedIntervals, setDropdownSelectedIntervals] = useState({
    title: 'Daily',
    value: 'daily',
  });
  // date
  const [showDropdownDate, setShowDropdownDate] = useState(false);
  const [dropdownOptionsDate, setDropdownOptionsDate] = useState<any>([]);
  const [dropdownSelectedDate, setDropdownSelectedDate] = useState<any>({});

  // new
  useEffect(() => {
    if (dropdownSelectedIntervals.value === 'daily') {
      if (getAllDataDaily.status === 'successful') {
        const data = getAllDataDaily.data;
        // console.log(data);
        const entries = Object.entries(data);
        // console.log('entries##########', entries);
        const last = entries[entries.length - 1];
        dispatch(setEntries(entries));
        dispatch(setActiveDay(last));
      }
    } else if (dropdownSelectedIntervals.value === 'monthly') {
      if (getAllDataMonthly.status === 'successful') {
        const data = getAllDataMonthly.data;
        // console.log(data);
        const entries = Object.entries(data);
        console.log('entries##########', entries);
        const last = entries[entries.length - 1];
        dispatch(setEntriesMonthly(entries));
        dispatch(setActiveMonth(last));
      }
    }
  }, [getAllDataMonthly, dropdownSelectedIntervals]);

  useEffect(() => {
    if (dropdownSelectedIntervals.value === 'daily') {
      if (entries.length > 0) {
        const dropdownOptionsDateTemp = entries.map((item: any) => {
          return { title: item[0], value: item[0].toLowerCase() };
        });
        setDropdownOptionsDate(dropdownOptionsDateTemp);
        setDropdownSelectedDate(
          dropdownOptionsDateTemp[dropdownOptionsDateTemp.length - 1]
        );
      }
    } else if (dropdownSelectedIntervals.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const dropdownOptionsDateTemp = entriesMonthly.map((item: any) => {
          return { title: item[0], value: item[0].toLowerCase() };
        });
        setDropdownOptionsDate(dropdownOptionsDateTemp);
        setDropdownSelectedDate(
          dropdownOptionsDateTemp[dropdownOptionsDateTemp.length - 1]
        );
      }
    }
  }, [entries, entriesMonthly, dropdownSelectedIntervals]);
  useEffect(() => {
    if (dropdownSelectedIntervals.value === 'daily') {
      if (entries.length > 0) {
        const activeDayTemp = entries.find(
          (item: any) => item[0] === dropdownSelectedDate.value
        );
        dispatch(setActiveDay(activeDayTemp));
      }
    } else if (dropdownSelectedIntervals.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const activeMonthTemp = entriesMonthly.find(
          (item: any) => item[0] === dropdownSelectedDate.value
        );
        dispatch(setActiveMonth(activeMonthTemp));
      }
    }
  }, [dropdownSelectedDate, dropdownSelectedIntervals]);

  useEffect(() => {
    dispatch(triggerGetAllDataDaily());
    dispatch(triggerGetAllDataMonthly());
  }, []);

  // console.log('activeDay', activeDay);
  // console.log('getAllDataMonthly', getAllDataMonthly);
  console.log('dropdownSelectedIntervals', dropdownSelectedIntervals);

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
          </div>
          <div className='other'>
            {/* {activeTab === 'overview' && ( */}
            <div className='filters-wrapper'>
              <Dropdown
                showDropdown={showDropdownIntervals}
                setShowDropdown={setShowDropdownIntervals}
                dropdownSelected={dropdownSelectedIntervals}
                setDropdownSelected={setDropdownSelectedIntervals}
                dropdownOptions={dropdownOptionsIntervals}
              >
                <Filter
                  setShowDropdown={setShowDropdownIntervals}
                  dropdownSelected={dropdownSelectedIntervals}
                />
              </Dropdown>
              {dropdownOptionsDate.length > 0 && (
                <Dropdown
                  showDropdown={showDropdownDate}
                  setShowDropdown={setShowDropdownDate}
                  dropdownSelected={dropdownSelectedDate}
                  setDropdownSelected={setDropdownSelectedDate}
                  dropdownOptions={dropdownOptionsDate}
                >
                  <Filter
                    setShowDropdown={setShowDropdownDate}
                    dropdownSelected={dropdownSelectedDate}
                  />
                </Dropdown>
              )}
            </div>
            {/* )} */}
            {/* {activeTab === 'teammates' && (
              <div className='search-wrapper'>
                <Search />
              </div>
            )} */}
          </div>
        </div>
        {activeTab === 'overview' && (
          <Overview dropdownSelectedIntervals={dropdownSelectedIntervals} />
        )}
        {activeTab === 'teammates' && (
          <Teammates dropdownSelectedIntervals={dropdownSelectedIntervals} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
