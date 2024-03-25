/* eslint-disable no-restricted-globals */
import charts from '../../../../../assets/images/charts.png';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { FaCheck, FaChevronRight, FaExclamation } from 'react-icons/fa';

import './OverviewTeammate.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';
import { triggerGetAllDataDaily } from '../../../../features/general/general_slice';
import moment from 'moment';
import { AppContext } from '../../../../context/Context';
import { RootState } from '../../../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
interface IProps {
  activeDay: any[];
  setActiveDay: React.Dispatch<React.SetStateAction<any[]>>;
  entries: any[];
  setEntries: React.Dispatch<React.SetStateAction<any[]>>;
}
function OverviewTeammate({
  activeDay,
  setActiveDay,
  entries,
  setEntries,
}: IProps) {
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);
  const { state } = useLocation();
  // console.log('state', state);
  const { staff } = state;

  const dispatch = useDispatch<any>();
  const { getAllDataDaily } = useSelector((state: RootState) => state.general);
  // console.log('getAllDataDaily', getAllDataDaily);
  const [dailyTimeEstimate, setDailyTimeEstimate] = useState('');
  const [activeTeamMatesDaily, setActiveTeammatesDaily] = useState('');
  // temp

  const [barchartData, setBarchartData] = useState<any>([]);
  const [totalTeammatesSupport, setTotalTeamatesSupport] = useState(20);

  const barChartData2 = {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        backgroundColor: theme === 'light' ? '#2764FF' : '#85D1F0',
        borderColor: '#2764FF',
        fill: false,
        lineTension: 0.4,
        radius: 0,
      },
    ],
  };

  // useEffect(() => {
  //   dispatch(triggerGetAllDataDaily());
  // }, []);
  // useEffect(() => {
  //   if (getAllDataDaily.status === 'successful') {
  //     // new
  //     const y = entries.map((item: any) => {
  //       const labels: any = [];
  //       const dataSets: any = [];
  //       labels.push(item[0]);
  //       //
  //       const arrayOfMillisecs: any = [];
  //       // console.log('item[1]', item[1]);

  //       const averageTemp = Object.entries(item[1]).forEach((item2: any) => {
  //         arrayOfMillisecs.push(
  //           item2[1].lastMilliSecs + item2[1].milliSecsFromLastHour
  //         );
  //       });
  //       const sum2 = arrayOfMillisecs.reduce(
  //         (accumulator: number, currentValue: number) =>
  //           accumulator + currentValue,
  //         0
  //       );
  //       const average2 = sum2 / arrayOfMillisecs.length;
  //       dataSets.push(average2);

  //       const obj = {
  //         labels: labels[0],
  //         dataSets: dataSets[0] / (1000 * 60 * 60),
  //       };
  //       // console.log('obj', obj);

  //       return obj;
  //     });
  //     // console.log('y', y);
  //     y.forEach((item: any) => {
  //       barChartData2.labels.push(item.labels);
  //       barChartData2.datasets[0].data.push(item.dataSets);
  //       setBarchartData(barChartData2);
  //     });
  //   }
  // }, [getAllDataDaily]);

  // useEffect(() => {
  //   if (activeDay.length > 0) {
  //     const updateStateFunc = () => {
  //       const arrayOfMillisecs: any = [];
  //       const x = activeDay[1];
  //       const entries = Object.entries(x);
  //       entries.forEach((item: any) => {
  //         arrayOfMillisecs.push(
  //           item[1].lastMilliSecs + item[1].milliSecsFromLastHour
  //         );
  //       });
  //       const sum = arrayOfMillisecs.reduce(
  //         (accumulator: number, currentValue: number) =>
  //           accumulator + currentValue,
  //         0
  //       );
  //       const average = sum / arrayOfMillisecs.length;
  //       // Convert milliseconds to moment duration
  //       const duration = moment.duration(average);
  //       // Get hours and minutes from the duration
  //       const hours = Math.floor(duration.asHours());
  //       const minutes = duration.minutes();
  //       setDailyTimeEstimate(`${hours}hrs ${minutes}mins`);
  //       setActiveTeammatesDaily(entries.length.toString());
  //     };
  //     updateStateFunc();
  //   }
  // }, [activeDay]);
  // new
  const [tableData, setTableData] = useState<Array<any>>([]);

  // console.log('staff', staff);

  const minTime = staff[1].timeLogs[0];
  const dateMinTime = moment(minTime);
  const minTimeData = dateMinTime.format('h:mma');
  // maxTime
  const maxTime = staff[1].timeLogs[staff[1].timeLogs.length - 1];
  const dateMaxTime = moment(maxTime);
  const maxTimeData = dateMaxTime.format('h:mma');
  // time
  const time = staff[1].minTime;
  const time2 = moment(time);
  const time3 = time2.format('MMMM Do, YYYY');
  // todays session
  const startDateTime = moment(
    staff[1].lastMilliSecs + staff[1].milliSecsFromLastHour
  );
  // const endDateTime = moment(staff[1].maxTime);

  // Calculate the difference in milliseconds
  const durationMs = Number(startDateTime);

  // Convert milliseconds to hours, minutes, and seconds
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

  // Format the result
  const formattedDuration = `${hours}hrs, ${minutes}mins, ${seconds}s`;

  // added

  //
  const entriesDailyData = Object.entries(getAllDataDaily.data);
  // console.log('entriesDailyData', entriesDailyData);
  const tempArray: any = [];
  entriesDailyData.forEach((item: any) => {
    const usersData = Object.entries(item[1]);

    // console.log('usersdata', usersData);
    console.log('usersdata[0]', usersData[0]);
    usersData.forEach((userData: any) => {
      if (userData[0] === staff[0]) {
        // console.log('usersdata[0][1]', usersData[0][1]);

        tempArray.push(userData[1]);
      }
    });
  });

  useEffect(() => {
    tempArray.forEach((item: any) => {
      console.log('item temp array', item);
      const label = item.maxTime.split('T')[0];
      console.log('label', label);
      const dataSets =
        (item.lastMilliSecs + item.milliSecsFromLastHour) / (1000 * 60 * 60);

      barChartData2.labels.push(label);
      barChartData2.datasets[0].data.push(dataSets);
    });
    setBarchartData(barChartData2);
    console.log('tempArray', tempArray);
  }, [tempArray.length]);

  return (
    <div className='overview-teammate-component'>
      <div className='charts'>
        <section className='header'>
          <p className='title'>Teammates</p>
          <span>
            <FaChevronRight />
          </span>
          <p className='details'>Details</p>
        </section>
        <section className='teammate-details'>
          <p className='section-title'>Employee details</p>
          <div className='details'>
            <div className='email'>
              <p className='title'>Email address:</p>
              <p className='value'>{staff[0]}</p>
            </div>
            <div className='all-time-est'>
              <p className='title'>All time estimate</p>
              <p className='value'>13hrs 42mins</p>
            </div>
          </div>
        </section>
        <section className='charts-wrapper'>
          <p className='title'>Productivity chart</p>
          <div className='chart'>
            {getAllDataDaily.status === 'base' ||
            getAllDataDaily.status === 'loading' ? (
              <>Loading</>
            ) : getAllDataDaily.status === 'successful' ? (
              <>
                {barchartData.labels?.length > 0 && (
                  <>
                    {
                      <Bar
                        data={barchartData}
                        options={{
                          plugins: {
                            legend: {
                              display: false,
                            },
                            tooltip: {
                              yAlign: 'bottom',
                              titleColor: '#000',
                              bodyColor: '#000',
                              backgroundColor: 'whitesmoke',
                              padding: 10,
                            },
                          },
                          scales: {
                            y: {
                              border: {
                                display: false,
                              },
                              grid: {
                                display: false,
                              },
                              ticks: {
                                crossAlign: 'far',
                                padding: 10,
                                color: `${
                                  theme === 'light' ? '#1C2127' : '#1C2127'
                                }`,
                                font: {
                                  size: 14,
                                },
                              },
                            },
                            x: {
                              border: {
                                display: false,
                              },
                              ticks: {
                                color: `${
                                  theme === 'light' ? '#1C2127' : '#1C2127'
                                }`,
                              },
                              grid: {
                                display: false,
                                color: `${
                                  theme === 'light' ? '#F1F1F1' : '#373B3F'
                                }`,
                              },
                            },
                          },
                          layout: {
                            padding: {
                              top: 30,
                              left: 20,
                            },
                          },
                          indexAxis: 'x',
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                        // height={360}
                      />
                    }
                  </>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </section>
      </div>
      <div className='activity-log'>
        <section className='header'>
          <p className='title'>Activity log</p>
        </section>
        <div className='table-wrapper'>
          <div className='table'>
            <table border={1}>
              {/* <caption>Table Caption</caption> */}
              <thead>
                <tr>
                  <th>ActiEmailvity</th>
                  <th>First sign in</th>
                  <th>Last sign in</th>
                  <th>Date</th>
                  <th>All time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='td-1'>
                    <span>{staff[0]}</span>
                  </td>
                  <td>{minTimeData}</td>
                  <td>{maxTimeData}</td>
                  <td>{time3}</td>
                  <td>{formattedDuration}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTeammate;
