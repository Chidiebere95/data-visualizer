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
interface IProps {
  // activeDay: any[];
  // setActiveDay: React.Dispatch<React.SetStateAction<any[]>>;
}
function Teammates({}: IProps) {
  const navigate = useNavigate();
  const { entries, activeDay } = useSelector(
    (state: RootState) => state.general
  );
  const params = useParams();
  console.log('params', params);

  const { getAllDataDaily } = useSelector((state: RootState) => state.general);
  const [tableData, setTableData] = useState<Array<any>>([]);
  useEffect(() => {
    if (activeDay?.length! > 0) {
      const data = activeDay[1];
      const entries = Object.entries(data);
      setTableData(entries);
      console.log('data', data);
      console.log('entries', entries);
    }
  }, [activeDay]);
  console.log('activeday', activeDay);
  const [activeTab, setActiveTab] = useState('main');

  return (
    <>
      {activeTab === 'main' && (
        <div className='teammates-component'>
          <div className='header'>
            <div className='title-wrapper'>
              <p className='title'>Teamates</p>
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
                    <th>All time</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((staff: any, index: number) => {
                    console.log('staff', staff);

                    // mintime
                    const minTime = staff[1].timeLogs[0];
                    const dateMinTime = moment(minTime);
                    const minTimeData = dateMinTime.format('h:mma');
                    // maxTime
                    const maxTime =
                      staff[1].timeLogs[staff[1].timeLogs.length - 1];
                    const dateMaxTime = moment(maxTime);
                    const maxTimeData = dateMaxTime.format('h:mma');
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
                            onClick={() =>
                              navigate(`teammates/${staff[0]}`, {
                                state: {
                                  staff,
                                },
                              })
                            }
                            // onClick={(  ) => setActiveTab('details')}
                          >
                            {staff[0]}
                          </span>
                        </td>
                        <td>{minTimeData}</td>
                        <td>{maxTimeData}</td>
                        <td>{formattedDuration2}</td>
                        <td>5hrs 43mins</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {activeTab === 'details' && <Teammate />}
    </>
  );
}

export default Teammates;
