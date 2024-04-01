/* eslint-disable no-restricted-globals */
import charts from '../../../../../assets/images/charts.png';
import { FaCheck, FaExclamation } from 'react-icons/fa';

import './Teammates.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import Teammate from '../teammate/Teammate';
import Search from '../../../molecules/search/Search';
import OverviewTeammate from '../../../molecules/overview-teammate/OverviewTeammate';
import { getTimeAgo } from '../../../../../utils/helpers';
import Dropdown from '../../../molecules/dropdown/Dropdown';
import Filter from '../../../molecules/filter/Filter';
interface IProps {
  dropdownOptionsDateDaily: any;
  setDropdownOptionsDateDaily: React.Dispatch<any>;
  dropdownOptionsDateMonthly: any;
  setDropdownOptionsDateMonthly: React.Dispatch<any>;
}
function Teammates({
  dropdownOptionsDateDaily,
  setDropdownOptionsDateDaily,
  dropdownOptionsDateMonthly,
  setDropdownOptionsDateMonthly,
}: IProps) {
  const navigate = useNavigate();
  const { entries, entriesMonthly, activeDay, activeMonth } = useSelector(
    (state: RootState) => state.general
  );
  const params = useParams();
  // console.log('params', params);
  const { getAllDataDaily } = useSelector((state: RootState) => state.general);
  const [tableData, setTableData] = useState<Array<any>>([]);
  // new
  const [showDropdownIntervalsTeammates, setShowDropdownIntervalsTeammates] =
    useState(false);
  const [
    dropdownOptionsIntervalsTeammates,
    setDropdownOptionsIntervalsTeammates,
  ] = useState([
    { title: 'Daily', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
  ]);
  const [
    dropdownSelectedIntervalsTeammates,
    setDropdownSelectedIntervalsTeammates,
  ] = useState({
    title: 'Daily',
    value: 'daily',
  });
  // date
  const [showDropdownDateTeammates, setShowDropdownDateTeammates] =
    useState(false);
  const [dropdownOptionsDateTeammates, setDropdownOptionsDateTeammates] =
    useState<any>([]);
  const [dropdownSelectedDateTeammates, setDropdownSelectedDateTeammates] =
    useState<any>({});
  const [activeDayTeammates, setActiveDayTeammates] = useState<any>([]);
  const [activeMonthTeammates, setActiveMonthTeammates] = useState<any>([]);

  useEffect(() => {
    if (dropdownSelectedIntervalsTeammates.value === 'daily') {
      setDropdownSelectedDateTeammates(
        dropdownOptionsDateDaily[dropdownOptionsDateDaily.length - 1]
      );
      setDropdownOptionsDateTeammates(dropdownOptionsDateDaily);
    } else {
      setDropdownSelectedDateTeammates(
        dropdownOptionsDateMonthly[dropdownOptionsDateMonthly.length - 1]
      );
      setDropdownOptionsDateTeammates(dropdownOptionsDateMonthly);
    }
  }, [dropdownSelectedIntervalsTeammates]);
  useEffect(() => {
    if (dropdownSelectedIntervalsTeammates.value === 'daily') {
      if (entries.length > 0) {
        const activeDayTemp = entries.find(
          (item: any) => item[0] === dropdownSelectedDateTeammates.value
        );
        setActiveDayTeammates(activeDayTemp);
      }
    } else if (dropdownSelectedIntervalsTeammates.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const activeMonthTemp = entriesMonthly.find(
          (item: any) => item[0] === dropdownSelectedDateTeammates.value
        );
        setActiveMonthTeammates(activeMonthTemp);
      }
    }
  }, [dropdownSelectedDateTeammates, dropdownSelectedIntervalsTeammates]);
  // end of new
  useEffect(() => {
    if (dropdownSelectedIntervalsTeammates.value === 'daily') {
      if (activeDayTeammates?.length! > 0) {
        const data = activeDayTeammates[1];
        const entries = Object.entries(data);
        setTableData(entries);
      }
    } else if (dropdownSelectedIntervalsTeammates.value === 'monthly') {
      if (activeMonthTeammates?.length! > 0) {
        const data = activeMonthTeammates[1];
        const entries = Object.entries(data);
        setTableData(entries);
      }
    }
  }, [activeDayTeammates, activeMonthTeammates]);

  const [activeTab, setActiveTab] = useState('main');
  const [staff, setStaff] = useState<any>([]);

  return (
    <>
      {activeTab === 'main' && (
        <div className='teammates-component'>
          <div className='header'>
            <div className='title-wrapper'>
              <p className='title'>Teamates</p>
            </div>
            <div className='filters-con'>
              <div className='filters-wrapper'>
                <Dropdown
                  showDropdown={showDropdownIntervalsTeammates}
                  setShowDropdown={setShowDropdownIntervalsTeammates}
                  dropdownSelected={dropdownSelectedIntervalsTeammates}
                  setDropdownSelected={setDropdownSelectedIntervalsTeammates}
                  dropdownOptions={dropdownOptionsIntervalsTeammates}
                >
                  <Filter
                    setShowDropdown={setShowDropdownIntervalsTeammates}
                    dropdownSelected={dropdownSelectedIntervalsTeammates}
                  />
                </Dropdown>
                {dropdownOptionsDateTeammates.length > 0 && (
                  <Dropdown
                    showDropdown={showDropdownDateTeammates}
                    setShowDropdown={setShowDropdownDateTeammates}
                    dropdownSelected={dropdownSelectedDateTeammates}
                    setDropdownSelected={setDropdownSelectedDateTeammates}
                    dropdownOptions={dropdownOptionsDateTeammates}
                  >
                    <Filter
                      setShowDropdown={setShowDropdownDateTeammates}
                      dropdownSelected={dropdownSelectedDateTeammates}
                    />
                  </Dropdown>
                )}
              </div>
              {/* <div className='search-wrapper'>
                <Search />
              </div> */}
            </div>
          </div>
          <div className='table-wrapper'>
            <div className='table'>
              <table border={1}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First sign in</th>
                    <th>Last sign in</th>
                    <th>
                      {dropdownSelectedIntervalsTeammates.value === 'daily'
                        ? "Today's session"
                        : "This month's session"}
                    </th>
                    <th>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((staff: any, index: number) => {
                    // console.log('staff', staff);

                    // mintime
                    const minTime = staff[1].supportAction[0].timeLog;
                    const dateMinTime = moment(minTime);
                    const minTimeData = dateMinTime.format(
                      dropdownSelectedIntervalsTeammates.value === 'daily'
                        ? 'h:mma'
                        : 'dddd, Do MMM, h:mma'
                    );
                    const minTimeDataDiff = getTimeAgo(minTime);
                    // new

                    // maxTime
                    // const maxTime =
                    //   staff[1].timeLogs[staff[1].timeLogs.length - 1];
                    const maxTime =
                      staff[1].supportAction[staff[1].supportAction.length - 1]
                        .timeLog;
                    const dateMaxTime = moment(maxTime);
                    const maxTimeData = dateMaxTime.format(
                      dropdownSelectedIntervalsTeammates.value === 'daily'
                        ? 'h:mma'
                        : 'dddd, Do MMM, h:mma'
                    );
                    const maxTimeDataDiff = getTimeAgo(maxTime);
                    // todays session
                    const startDateTime = moment(staff[1].minTime);
                    const endDateTime = moment(staff[1].maxTime);

                    // Calculate the difference in milliseconds
                    const durationMs = endDateTime.diff(startDateTime);

                    // Convert milliseconds to hours, minutes, and seconds
                    const hours = Math.floor(durationMs / (1000 * 60 * 60));
                    const minutes = Math.floor(
                      (durationMs % (1000 * 60 * 60)) / (1000 * 60)
                    );
                    const seconds = Math.floor(
                      (durationMs % (1000 * 60)) / 1000
                    );

                    // Format the result
                    const formattedDuration = `${hours}hrs, ${minutes}mins, ${seconds}s`;
                    // new

                    const milliseconds =
                      staff[1].lastMilliSecs + staff[1].milliSecsFromLastHour;

                    // Convert milliseconds to hours and minutes
                    const hours2 = Math.floor(milliseconds / (1000 * 60 * 60));
                    const minutes2 = Math.floor(
                      (milliseconds % (1000 * 60 * 60)) / (1000 * 60)
                    );

                    // Create a duration object with the hours and minutes
                    const duration = moment.duration({
                      hours: hours2,
                      minutes: minutes2,
                    });
                    // Format the duration
                    const formattedDuration2 = `${duration.hours()}hrs ${duration.minutes()}mins`;

                    return (
                      <tr key={index}>
                        <td className='td-1'>
                          <span
                            // onClick={() =>
                            //   navigate(`teammates/${staff[0]}`, {
                            //     state: {
                            //       staff,
                            //     },
                            //   })
                            // }
                            onClick={() => {
                              setActiveTab('details');
                              setStaff(staff);
                            }}
                          >
                            {staff[0]}
                          </span>
                        </td>
                        <td className='td-2'>
                          <div className='td-content'>
                            <p className='time'>{minTimeData}</p>
                            {dropdownSelectedIntervalsTeammates.value ===
                              'monthly' && (
                              <p className='time'>{minTimeDataDiff}</p>
                            )}
                          </div>
                        </td>
                        <td className='td-3'>
                          <div className='td-content'>
                            <p className='time'>{maxTimeData}</p>
                            {dropdownSelectedIntervalsTeammates.value ===
                              'monthly' && (
                              <p className='time'>{maxTimeDataDiff}</p>
                            )}
                          </div>
                        </td>
                        <td>{formattedDuration2}</td>
                        <td>{staff[1].supportAction.length}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'details' && (
        <OverviewTeammate
          staff={staff}
          setActiveTab={setActiveTab}
          dropdownOptionsDateDaily={dropdownOptionsDateDaily}
          setDropdownOptionsDateDaily={setDropdownOptionsDateDaily}
          dropdownOptionsDateMonthly={dropdownOptionsDateMonthly}
          setDropdownOptionsDateMonthly={setDropdownOptionsDateMonthly}
        />
      )}
    </>
  );
}

export default Teammates;
