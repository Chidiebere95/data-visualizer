/* eslint-disable no-restricted-globals */
import { useNavigate } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { MdOutlineSettings } from 'react-icons/md';
import './Dashboard.scss';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { IoLockOpenOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import Overview from '../../components/tabs/dashboard/overview/Overview';
import Teammates from '../../components/tabs/dashboard/teammates/Teammates';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveDay,
  setEntries,
  triggerGetAllDataDaily,
} from '../../../features/general/general_slice';
import { RootState } from '../../../store/store';
import { FaChevronDown } from 'react-icons/fa';
import Search from '../../components/molecules/search/Search';
import Dropdown from '../../components/molecules/dropdown/Dropdown';
import Filter from '../../components/molecules/filter/Filter';
function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { getAllDataDaily } = useSelector((state: RootState) => state.general);
  const { entries, activeDay } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch<any>();
  // const [entries, setEntries] = useState<Array<any>>([]);
  // const [activeDay, setActiveDay] = useState<Array<any>>([]);
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

  // new
  useEffect(() => {
    if (getAllDataDaily.status === 'successful') {
      const data = getAllDataDaily.data;
      console.log(data);

      const entries = Object.entries(data);
      console.log(entries);

      const last = entries[entries.length - 1];
      // setEntries(entries);
      // setActiveDay(last);
      dispatch(setEntries(entries));
      dispatch(setActiveDay(last));
    }
  }, [getAllDataDaily]);
  // date
  const [showDropdownDate, setShowDropdownDate] = useState(false);
  const [dropdownOptionsDate, setDropdownOptionsDate] = useState<any>([]);
  const [dropdownSelectedDate, setDropdownSelectedDate] = useState<any>({});
  useEffect(() => {
    if (entries.length > 0) {
      const dropdownOptionsDateTemp = entries.map((item: any) => {
        return { title: item[0], value: item[0].toLowerCase() };
      });
      setDropdownOptionsDate(dropdownOptionsDateTemp);
      setDropdownSelectedDate(
        dropdownOptionsDateTemp[dropdownOptionsDateTemp.length - 1]
      );

      console.log('dropdownOptionsDateTemp', dropdownOptionsDateTemp);
    }
  }, [entries]);
  useEffect(() => {
    if (entries.length > 0) {
      const activeDayTemp = entries.find(
        (item: any) => item[0] === dropdownSelectedDate.value
      );
      console.log('entries', entries);
      console.log('dropdownSelectedDate', dropdownSelectedDate);
      console.log('activeDayTemp', activeDayTemp);

      dispatch(setActiveDay(activeDayTemp));
    }
  }, [dropdownSelectedDate, entries]);

  useEffect(() => {
    dispatch(triggerGetAllDataDaily());
  }, []);

  // console.log('entries', entries);

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
          <div className='search-wrapper'>
            <Search />
          </div>
        </div>
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
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'teammates' && <Teammates />}
      </div>
    </div>
  );
}

export default Dashboard;
