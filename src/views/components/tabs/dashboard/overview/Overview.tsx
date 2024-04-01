/* eslint-disable no-restricted-globals */
import charts from '../../../../../assets/images/charts.png';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaCheck, FaExclamation } from 'react-icons/fa';

import './Overview.scss';
import Pill from '../../../atoms/pill/Pill';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { triggerGetAllDataDaily } from '../../../../../features/general/general_slice';
import moment from 'moment';
import { AppContext } from '../../../../../context/Context';
import { RootState } from '../../../../../store/store';
import SingleLineLoader from '../../../loaders/single-line-loader/SingleLineLoader';
import Dropdown from '../../../molecules/dropdown/Dropdown';
import Filter from '../../../molecules/filter/Filter';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import Productivity from '../../../main/overview/productivity/Productivity';
import Timelogs from '../../../main/overview/timelogs/Timelogs';
import Average from '../../../main/overview/average/Average';

interface IProps {
  // activeDay: any[];
  // setActiveDay: React.Dispatch<React.SetStateAction<any[]>>;
  // entries: any[];
  // setEntries: React.Dispatch<React.SetStateAction<any[]>>;
  // dropdownSelectedIntervals: {
  //   title: string;
  //   value: string;
  // };
  dropdownOptionsDateDaily: any;
  setDropdownOptionsDateDaily: React.Dispatch<any>;
  dropdownOptionsDateMonthly: any;
  setDropdownOptionsDateMonthly: React.Dispatch<any>;
}
function Overview({
  dropdownOptionsDateDaily,
  setDropdownOptionsDateDaily,
  dropdownOptionsDateMonthly,
  setDropdownOptionsDateMonthly,
}: IProps) {
  // console.log('activeday', activeDay);
  const { theme } = useContext(AppContext);
  const { entries, activeDay, entriesMonthly, activeMonth } = useSelector(
    (state: RootState) => state.general
  );

  const dispatch = useDispatch<any>();
  const { getAllDataDaily, getAllDataMonthly } = useSelector(
    (state: RootState) => state.general
  );
  // console.log('getAllDataDaily', getAllDataDaily);
  const [dailyTimeEstimate, setDailyTimeEstimate] = useState('');
  const [activeTeamMatesDaily, setActiveTeammatesDaily] = useState('');
  const [monthlyTimeEstimate, setMonthlyTimeEstimate] = useState('');
  const [activeTeamMatesMonthly, setActiveTeammatesMonthly] = useState('');
  // temp

  const totalTeammatesSupport = 35;
  // new
  // infoBoard
  const [showDropdownIntervalsInfoBoard, setShowDropdownIntervalsInfoBoard] =
    useState(false);
  const [
    dropdownOptionsIntervalsInfoBoard,
    setDropdownOptionsIntervalsInfoBoard,
  ] = useState([
    { title: 'Daily', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
  ]);
  const [
    dropdownSelectedIntervalsInfoBoard,
    setDropdownSelectedIntervalsInfoBoard,
  ] = useState({
    title: 'Daily',
    value: 'daily',
  });
  // date
  const [showDropdownDateInfoBoard, setShowDropdownDateInfoBoard] =
    useState(false);
  const [dropdownOptionsDateInfoBoard, setDropdownOptionsDateInfoBoard] =
    useState<any>([]);
  const [dropdownSelectedDateInfoBoard, setDropdownSelectedDateInfoBoard] =
    useState<any>({});
  const [activeDayInfoBoard, setActiveDayInfoBoard] = useState<any>([]);
  const [activeMonthInfoBoard, setActiveMonthInfoBoard] = useState<any>([]);
  useEffect(() => {
    if (dropdownSelectedIntervalsInfoBoard.value === 'daily') {
      setDropdownSelectedDateInfoBoard(
        dropdownOptionsDateDaily[dropdownOptionsDateDaily.length - 1]
      );
      setDropdownOptionsDateInfoBoard(dropdownOptionsDateDaily);
    } else {
      setDropdownSelectedDateInfoBoard(
        dropdownOptionsDateMonthly[dropdownOptionsDateMonthly.length - 1]
      );
      setDropdownOptionsDateInfoBoard(dropdownOptionsDateMonthly);
    }
  }, [
    dropdownOptionsDateDaily,
    dropdownOptionsDateMonthly,
    dropdownSelectedIntervalsInfoBoard,
  ]);
  useEffect(() => {
    if (dropdownSelectedIntervalsInfoBoard.value === 'daily') {
      if (entries.length > 0) {
        const activeDayTemp = entries.find(
          (item: any) => item[0] === dropdownSelectedDateInfoBoard.value
        );
        setActiveDayInfoBoard(activeDayTemp);
      }
    } else if (dropdownSelectedIntervalsInfoBoard.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const activeMonthTemp = entriesMonthly.find(
          (item: any) => item[0] === dropdownSelectedDateInfoBoard?.value
        );
        setActiveMonthInfoBoard(activeMonthTemp);
      }
    }
  }, [dropdownSelectedDateInfoBoard, dropdownSelectedIntervalsInfoBoard]);

  // top
  useEffect(() => {
    if (dropdownSelectedIntervalsInfoBoard.value === 'daily') {
      if (activeDayInfoBoard?.length > 0) {
        const updateStateFunc = () => {
          const arrayOfMillisecs: any = [];
          const x = activeDayInfoBoard[1];
          const entries = Object.entries(x);
          entries.forEach((item: any) => {
            arrayOfMillisecs.push(
              item[1].lastMilliSecs + item[1].milliSecsFromLastHour
            );
          });
          const sum = arrayOfMillisecs.reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue,
            0
          );
          const average = sum / arrayOfMillisecs.length;
          // Convert milliseconds to moment duration
          const duration = moment.duration(average);
          // Get hours and minutes from the duration
          const hours = Math.floor(duration.asHours());
          const minutes = duration.minutes();
          setDailyTimeEstimate(`${hours}hrs ${minutes}mins`);
          setActiveTeammatesDaily(entries.length.toString());
        };
        updateStateFunc();
      }
    } else if (dropdownSelectedIntervalsInfoBoard.value === 'monthly') {
      if (activeMonth?.length > 0) {
        const updateStateFunc = () => {
          const arrayOfMillisecs: any = [];
          const x = activeMonth[1];
          console.log('xxxxxxxxxxxxxxx', x);

          const entries = Object.entries(x);
          console.log('entriesxxxxxxxxxxxxxxx', entries);
          entries.forEach((item: any) => {
            arrayOfMillisecs.push(
              item[1].lastMilliSecs + item[1].milliSecsFromLastHour
            );
          });
          const sum = arrayOfMillisecs.reduce(
            (accumulator: number, currentValue: number) =>
              accumulator + currentValue,
            0
          );
          const average = sum / arrayOfMillisecs.length;
          // Convert milliseconds to moment duration
          const duration = moment.duration(average);
          // Get hours and minutes from the duration
          const hours = Math.floor(duration.asHours());
          const minutes = duration.minutes();
          setMonthlyTimeEstimate(`${hours}hrs ${minutes}mins`);
          setActiveTeammatesMonthly(entries.length.toString());
        };
        updateStateFunc();
      }
    }
  }, [
    activeDayInfoBoard,
    activeMonthInfoBoard,
    dropdownSelectedIntervalsInfoBoard,
  ]);


  return (
    <div className='overview-component'>
      <div className='stats-con'>
        <div className='filters-con'>
          <div className='filters-wrapper'>
            <Dropdown
              showDropdown={showDropdownIntervalsInfoBoard}
              setShowDropdown={setShowDropdownIntervalsInfoBoard}
              dropdownSelected={dropdownSelectedIntervalsInfoBoard}
              setDropdownSelected={setDropdownSelectedIntervalsInfoBoard}
              dropdownOptions={dropdownOptionsIntervalsInfoBoard}
            >
              <Filter
                setShowDropdown={setShowDropdownIntervalsInfoBoard}
                dropdownSelected={dropdownSelectedIntervalsInfoBoard}
              />
            </Dropdown>
            {dropdownOptionsDateInfoBoard.length > 0 && (
              <Dropdown
                showDropdown={showDropdownDateInfoBoard}
                setShowDropdown={setShowDropdownDateInfoBoard}
                dropdownSelected={dropdownSelectedDateInfoBoard}
                setDropdownSelected={setDropdownSelectedDateInfoBoard}
                dropdownOptions={dropdownOptionsDateInfoBoard}
              >
                <Filter
                  setShowDropdown={setShowDropdownDateInfoBoard}
                  dropdownSelected={dropdownSelectedDateInfoBoard}
                />
              </Dropdown>
            )}
          </div>
        </div>
        <div className='stats-wrapper'>
          <div className='stats'>
            <div className='stat'>
              {/* <p className='title'>All teammates</p> */}
              <p className='title'>Total teamates</p>
              <p className='info'>Total Teammates</p>
              <div className='details'>
                <div className='detail'>
                  <div className='value'>{totalTeammatesSupport}</div>
                  {/* <div className='text'>
                  <Pill text='Active' variant='success' icon />
                </div> */}
                </div>
              </div>
            </div>
            <div className='stat stat-2'>
              {/* <p className='title'>All teammates</p> */}
              <p className='title'>Active teamates</p>
              <p className='info'>Signed in</p>
              <div className='details'>
                <div className='detail'>
                  <div className='value'>
                    {getAllDataDaily.status === 'base' ||
                    getAllDataDaily.status === 'loading' ||
                    getAllDataMonthly.status === 'base' ||
                    getAllDataMonthly.status === 'loading' ? (
                      <>
                        <SingleLineLoader />
                      </>
                    ) : getAllDataDaily.status === 'successful' ||
                      getAllDataMonthly.status === 'successful' ? (
                      <>
                        {dropdownSelectedIntervalsInfoBoard.value === 'daily'
                          ? activeTeamMatesDaily
                          : activeTeamMatesMonthly}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='text'>
                    <Pill
                      text={
                        dropdownSelectedIntervalsInfoBoard.value === 'daily'
                          ? 'Signed in today'
                          : 'Signed in this month'
                      }
                      variant='success'
                      icon
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='stat'>
              <p className='title'>Inactive</p>
              <p className='info'>Inactive</p>
              <div className='details'>
                <div className='detail'>
                  <div className='value'>
                    {getAllDataDaily.status === 'base' ||
                    getAllDataDaily.status === 'loading' ||
                    getAllDataMonthly.status === 'base' ||
                    getAllDataMonthly.status === 'loading' ? (
                      <>
                        <SingleLineLoader />
                      </>
                    ) : getAllDataDaily.status === 'successful' ||
                      getAllDataMonthly.status === 'successful' ? (
                      <>
                        {dropdownSelectedIntervalsInfoBoard.value ===
                          'daily' && (
                          <>
                            {totalTeammatesSupport -
                              Number(activeTeamMatesDaily)}
                          </>
                        )}
                        {dropdownSelectedIntervalsInfoBoard.value ===
                          'monthly' && (
                          <>
                            {totalTeammatesSupport -
                              Number(activeTeamMatesMonthly)}
                          </>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='text'>
                    <Pill text='Not signed in' variant='danger' icon />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='estimate'>
            <div className='stat'>
              <p className='title'>
                {dropdownSelectedIntervalsInfoBoard.value === 'daily'
                  ? 'Daily time estimate'
                  : 'Monthly time estimate'}
              </p>
              <p className='info'>
                {dropdownSelectedIntervalsInfoBoard.value === 'daily'
                  ? 'Daily time estimate'
                  : 'Monthly time estimate'}
              </p>
              <div className='details'>
                <div className='detail'>
                  <div className='value'>
                    {getAllDataDaily.status === 'base' ||
                    getAllDataDaily.status === 'loading' ||
                    getAllDataMonthly.status === 'base' ||
                    getAllDataMonthly.status === 'loading' ? (
                      <>
                        <SingleLineLoader />
                      </>
                    ) : getAllDataDaily.status === 'successful' ||
                      getAllDataMonthly.status === 'successful' ? (
                      <>
                        {dropdownSelectedIntervalsInfoBoard.value === 'daily'
                          ? dailyTimeEstimate
                          : monthlyTimeEstimate}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className='text'>
                    <Pill text='Across all teammates ' variant='info' icon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='charts'>
        <Productivity
          dropdownOptionsDateDaily={dropdownOptionsDateDaily}
          setDropdownOptionsDateDaily={setDropdownOptionsDateDaily}
          dropdownOptionsDateMonthly={dropdownOptionsDateMonthly}
          setDropdownOptionsDateMonthly={setDropdownOptionsDateMonthly}
        />
        <Timelogs
          dropdownOptionsDateDaily={dropdownOptionsDateDaily}
          setDropdownOptionsDateDaily={setDropdownOptionsDateDaily}
          dropdownOptionsDateMonthly={dropdownOptionsDateMonthly}
          setDropdownOptionsDateMonthly={setDropdownOptionsDateMonthly}
        />
        <Average
          dropdownOptionsDateDaily={dropdownOptionsDateDaily}
          setDropdownOptionsDateDaily={setDropdownOptionsDateDaily}
          dropdownOptionsDateMonthly={dropdownOptionsDateMonthly}
          setDropdownOptionsDateMonthly={setDropdownOptionsDateMonthly}
        />
      </div>
    </div>
  );
}

export default Overview;
