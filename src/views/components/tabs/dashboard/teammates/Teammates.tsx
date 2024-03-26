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
interface IProps {
  // activeDay: any[];
  // setActiveDay: React.Dispatch<React.SetStateAction<any[]>>;
  dropdownSelectedIntervals: {
    title: string;
    value: string;
  };
}
function Teammates({ dropdownSelectedIntervals }: IProps) {
  const navigate = useNavigate();
  const { entries, activeDay, activeMonth } = useSelector(
    (state: RootState) => state.general
  );
  const params = useParams();
  // console.log('params', params);
  const { getAllDataDaily } = useSelector((state: RootState) => state.general);
  const [tableData, setTableData] = useState<Array<any>>([]);
  useEffect(() => {
    if (dropdownSelectedIntervals.value === 'daily') {
      if (activeDay?.length! > 0) {
        const data = activeDay[1];
        const entries = Object.entries(data);
        setTableData(entries);
      }
    } else if (dropdownSelectedIntervals.value === 'monthly') {
      if (activeMonth?.length! > 0) {
        const data = activeMonth[1];
        const entries = Object.entries(data);
        setTableData(entries);
      }
    }
  }, [activeDay, activeMonth, dropdownSelectedIntervals]);
  // console.log('activeday', activeDay);
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
            <div className='search-wrapper'>
              <Search />
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
                    <th>Today's session</th>
                    <th>Activities</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((staff: any, index: number) => {
                    console.log('staff', staff);

                    // mintime
                    const minTime = staff[1].timeLogs[0];
                    const dateMinTime = moment(minTime);
                    const minTimeData = dateMinTime.format(
                      dropdownSelectedIntervals.value === 'daily'
                        ? 'h:mma'
                        : 'dddd, Do MMM, h:mma'
                    );
                    const minTimeDataDiff = getTimeAgo(minTime);
                    // new

                    // maxTime
                    const maxTime =
                      staff[1].timeLogs[staff[1].timeLogs.length - 1];
                    const dateMaxTime = moment(maxTime);
                    const maxTimeData = dateMaxTime.format(
                      dropdownSelectedIntervals.value === 'daily'
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
                            {dropdownSelectedIntervals.value === 'monthly' && (
                              <p className='time'>{minTimeDataDiff}</p>
                            )}
                          </div>
                        </td>
                        <td className='td-3'>
                          <div className='td-content'>
                            <p className='time'>{maxTimeData}</p>
                            {dropdownSelectedIntervals.value === 'monthly' && (
                              <p className='time'>{maxTimeDataDiff}</p>
                            )}
                          </div>
                        </td>
                        <td>{formattedDuration2}</td>
                        <td>{staff[1].timeLogs.length}</td>
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
          // activeDay={activeDay}
          // setActiveDay={setActiveDay}
          // entries={entries}
          // setEntries={setEntries}
        />
      )}
    </>
  );
}

export default Teammates;
