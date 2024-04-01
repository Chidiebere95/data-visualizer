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
import Dropdown from '../dropdown/Dropdown';
import Filter from '../filter/Filter';
interface IProps {
  staff?: any;
  setActiveTab?: React.Dispatch<React.SetStateAction<string>>;

  dropdownOptionsDateDaily: any;
  setDropdownOptionsDateDaily: React.Dispatch<any>;
  dropdownOptionsDateMonthly: any;
  setDropdownOptionsDateMonthly: React.Dispatch<any>;
}
function OverviewTeammate({
  staff,
  setActiveTab,
  dropdownOptionsDateDaily,
  setDropdownOptionsDateDaily,
  dropdownOptionsDateMonthly,
  setDropdownOptionsDateMonthly,
}: IProps) {
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);
  const { entries, activeDay, entriesMonthly } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch<any>();
  const { getAllDataDaily } = useSelector((state: RootState) => state.general);
  // console.log('getAllDataDaily', getAllDataDaily);
  const [dailyTimeEstimate, setDailyTimeEstimate] = useState('');
  const [activeTeamMatesDaily, setActiveTeammatesDaily] = useState('');
  // temp

  const [barchartData, setBarchartData] = useState<any>([]);
  const [barchartDataTimelogs, setBarchartDataTimelogs] = useState<any>([]);

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
  //       barchartData.labels.push(item.labels);
  //       barchartData.datasets[0].data.push(item.dataSets);
  //       setBarchartData(barchartData);
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

  const tempArray: any = [];
  const [activityLogTableData, setActivityLogTableData] = useState<any>([]);
  useEffect(() => {
    if (tempArray.length > 0) {
      // console.log('staff', staff);
      const activityLogTableDataTemp = tempArray.map((item: any) => {
        // console.log('item##########', item);

        const minTime = item.supportAction[0].timeLog;
        const dateMinTime = moment(minTime);
        const minTimeData = dateMinTime.format('h:mma');
        // maxTime
        const maxTime =
          item.supportAction[staff[1].supportAction.length - 1].timeLog;
        const dateMaxTime = moment(maxTime);
        const maxTimeData = dateMaxTime.format('h:mma');
        // time
        const time = item.minTime;
        const time2 = moment(time);
        const time3 = time2.format('MMMM Do, YYYY');
        // todays session
        const startDateTime = moment(
          item.lastMilliSecs + item.milliSecsFromLastHour
        );
        // const endDateTime = moment(staff[1].maxTime);

        // Calculate the difference in milliseconds
        const durationMs = Number(startDateTime);

        // Convert milliseconds to hours, minutes, and seconds
        const hours = Math.floor(durationMs / (1000 * 60 * 60));
        const minutes = Math.floor(
          (durationMs % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

        // Format the result
        const formattedDuration = `${hours}hrs, ${minutes}mins, ${seconds}s`;
        return { minTimeData, maxTimeData, time3, formattedDuration };
      });
      setActivityLogTableData(activityLogTableDataTemp);
    }
  }, [tempArray.length]);

  const entriesDailyData = Object.entries(getAllDataDaily.data);
  // console.log('entriesDailyData', entriesDailyData);
  entriesDailyData.forEach((item: any) => {
    const usersData = Object.entries(item[1]);

    // console.log('usersdata', usersData);
    // console.log('usersdata[0]', usersData[0]);
    usersData.forEach((userData: any) => {
      if (userData[0] === staff?.[0]) {
        // console.log('usersdata[0][1]', usersData[0][1]);
        tempArray.push(userData[1]);
      }
    });
  });
  // console.log('temp Array##########', tempArray);

  useEffect(() => {
    const barchartData = {
      labels: [] as string[],
      datasets: [
        {
          data: [] as number[],
          backgroundColor: theme === 'light' ? '#2764FF' : '#E5A889',
          borderColor: '#2764FF',
          fill: false,
          lineTension: 0.4,
          radius: 0,
        },
      ],
    };
    const barChartDataTimelogs = {
      labels: [] as string[],
      datasets: [
        {
          data: [] as number[],
          backgroundColor: theme === 'light' ? '#2764FF' : '#3C828A',
          borderColor: '#2764FF',
          fill: false,
          lineTension: 0.4,
          radius: 0,
        },
      ],
    };

    tempArray.forEach((item: any) => {
      // console.log('item temp array', item);
      const label = item.maxTime.split('T')[0];
      const labelTimelogs = item.maxTime.split('T')[0];

      // console.log('item####', item.timeLogs.length);
      const dataSets =
        (item.lastMilliSecs + item.milliSecsFromLastHour) / (1000 * 60 * 60);
      const dataSetsTimeLogs = item.supportAction.length;

      barchartData.labels.push(label);
      barchartData.datasets[0].data.push(dataSets);
      barChartDataTimelogs.labels.push(labelTimelogs);
      barChartDataTimelogs.datasets[0].data.push(dataSetsTimeLogs);
    });
    // console.log('barchartData', barchartData);
    // console.log('barChartDataTimelogs', barChartDataTimelogs);
    setBarchartData(barchartData);
    setBarchartDataTimelogs(barChartDataTimelogs);
  }, [tempArray.length]);
  // console.log('barchartData', barchartData);
  // console.log('activitiesTableData', activitiesTableData);

  // new
  const [showDropdownIntervalsTeammate, setShowDropdownIntervalsTeammate] =
    useState(false);
  const [
    dropdownOptionsIntervalsTeammate,
    setDropdownOptionsIntervalsTeammate,
  ] = useState([
    { title: 'Daily', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
  ]);
  const [
    dropdownSelectedIntervalsTeammate,
    setDropdownSelectedIntervalsTeammate,
  ] = useState({
    title: 'Daily',
    value: 'daily',
  });
  // date
  const [showDropdownDateTeammate, setShowDropdownDateTeammate] =
    useState(false);
  const [dropdownOptionsDateTeammate, setDropdownOptionsDateTeammate] =
    useState<any>([]);
  const [dropdownSelectedDateTeammate, setDropdownSelectedDateTeammate] =
    useState<any>({});
  const [activeDayTeammate, setActiveDayTeammate] = useState<any>([]);
  const [activeMonthTeammate, setActiveMonthTeammate] = useState<any>([]);
  // console.log('dropdownSelectedDateTeammate', dropdownSelectedDateTeammate);
  // console.log('dropdownOptionsDateTeammate', dropdownOptionsDateTeammate);
  // console.log(
  //   'dropdownSelectedIntervalsTeammate',
  //   dropdownSelectedIntervalsTeammate
  // );
  // console.log('dropdownOptionsDateDaily', dropdownOptionsDateDaily);

  useEffect(() => {
    if (dropdownSelectedIntervalsTeammate.value === 'daily') {
      setDropdownSelectedDateTeammate(
        dropdownOptionsDateDaily[dropdownOptionsDateDaily.length - 1]
      );
      setDropdownOptionsDateTeammate(dropdownOptionsDateDaily);
    } else {
      setDropdownSelectedDateTeammate(
        dropdownOptionsDateMonthly[dropdownOptionsDateMonthly.length - 1]
      );
      setDropdownOptionsDateTeammate(dropdownOptionsDateMonthly);
    }
  }, [dropdownSelectedIntervalsTeammate]);
  useEffect(() => {
    if (dropdownSelectedIntervalsTeammate.value === 'daily') {
      if (entries.length > 0) {
        const activeDayTemp = entries.find(
          (item: any) => item[0] === dropdownSelectedDateTeammate.value
        );
        setActiveDayTeammate(activeDayTemp);
      }
    } else if (dropdownSelectedIntervalsTeammate.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const activeMonthTemp = entriesMonthly.find(
          (item: any) => item[0] === dropdownSelectedDateTeammate.value
        );
        setActiveMonthTeammate(activeMonthTemp);
      }
    }
  }, [
    dropdownSelectedDateTeammate,
    dropdownSelectedIntervalsTeammate,
    entries,
    entriesDailyData,
  ]);
  useEffect(() => {
    if (dropdownSelectedIntervalsTeammate.value === 'daily') {
      if (activeDayTeammate?.length! > 0) {
        const data = activeDayTeammate[1];
        const entries = Object.entries(data);
        setTableData(entries);
      }
    } else if (dropdownSelectedIntervalsTeammate.value === 'monthly') {
      if (activeMonthTeammate?.length! > 0) {
        const data = activeMonthTeammate[1];
        const entries = Object.entries(data);
        setTableData(entries);
      }
    }
  }, [activeDayTeammate, activeMonthTeammate]);

  //
  const [activitiesTableData, setActivitiesTableData] = useState<any>();
  const [activitiesTableData2, setActivitiesTableData2] = useState<any>();

  useEffect(() => {
    if (tempArray.length > 0) {
      // console.log('tempArray', tempArray);
      // console.log('dropdownSelectedDateTeammate', dropdownSelectedDateTeammate);
      const activeItem = tempArray.find(
        (item: any) =>
          item.maxTime.split('T')[0] === dropdownSelectedDateTeammate.value
      );
      console.log('activeItem', activeItem);

      const activitiesTableDataTemp = tempArray.map((item: any) => {
        return {
          date: item.maxTime.split('T')[0],
          supportAction: item.supportAction,
        };
      });
      setActivitiesTableData2(activeItem);
      // const activitiesTableDataTemp2 = activeItem?.supportAction.map((item: any) => {
      //   return {
      //     date: item.maxTime.split('T')[0],
      //     supportAction: item.supportAction,
      //   };
      // });
      const activeDayData = activitiesTableDataTemp.find(
        (item: any) => item.date === activeDay[0]
      );
      setActivitiesTableData(activeDayData);
      // console.log('activitiesTableDataTemp', activitiesTableDataTemp);

      // console.log('activeDayData', activeDayData);
    }
  }, [
    tempArray.length,
    activeDay,
    dropdownSelectedDateTeammate,
    dropdownSelectedIntervalsTeammate,
  ]);
  console.log('active item', activitiesTableData2);

  return (
    <div className='overview-teammate-component'>
      <div className='charts'>
        <section className='header'>
          <p onClick={() => setActiveTab!('main')} className='title'>
            Teammates
          </p>
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
              <p className='value'>{staff?.[0]}</p>
            </div>
            {/* <div className='all-time-est'>
              <p className='title'>All time estimate</p>
              <p className='value'>13hrs 42mins</p>
            </div> */}
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
                                  theme === 'light' ? '#E5A889' : '#373B3F'
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
      <section className='charts-wrapper-2'>
        <p className='title'>Timelogs chart</p>
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
                      data={barchartDataTimelogs}
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
                                theme === 'light' ? '#E5A889' : '#E5A889'
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
      <div className='activity-log'>
        <div className='filters-con'>
          <section className='header'>
            <p className='title'>Activity log</p>
          </section>
        </div>
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
                {activityLogTableData.map((item: any, index: number) => (
                  <tr className='index' key={index}>
                    <td className='td-1'>
                      <span>{staff?.[0]}</span>
                    </td>
                    <td>{item.minTimeData}</td>
                    <td>{item.maxTimeData}</td>
                    <td>{item.time3}</td>
                    <td>{item.formattedDuration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* activities */}
      <div className='activity-log activities '>
        <div className='filters-con'>
          <div className='header'>
            <p className='title section-title'>Activities</p>
          </div>
          <div className='filters-wrapper'>
            {/* <Dropdown
              showDropdown={showDropdownIntervalsTeammate}
              setShowDropdown={setShowDropdownIntervalsTeammate}
              dropdownSelected={dropdownSelectedIntervalsTeammate}
              setDropdownSelected={setDropdownSelectedIntervalsTeammate}
              dropdownOptions={dropdownOptionsIntervalsTeammate}
            >
              <Filter
                setShowDropdown={setShowDropdownIntervalsTeammate}
                dropdownSelected={dropdownSelectedIntervalsTeammate}
              />
            </Dropdown> */}
            {dropdownOptionsDateTeammate.length > 0 && (
              <Dropdown
                showDropdown={showDropdownDateTeammate}
                setShowDropdown={setShowDropdownDateTeammate}
                dropdownSelected={dropdownSelectedDateTeammate}
                setDropdownSelected={setDropdownSelectedDateTeammate}
                dropdownOptions={dropdownOptionsDateTeammate}
              >
                <Filter
                  setShowDropdown={setShowDropdownDateTeammate}
                  dropdownSelected={dropdownSelectedDateTeammate}
                />
              </Dropdown>
            )}
          </div>
        </div>
        <div className='table-wrapper'>
          <div className='table'>
            <table border={1}>
              {/* <caption>Table Caption</caption> */}
              <thead>
                <tr>
                  <th>Visited</th>
                  <th>Activity</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {activitiesTableData2 && (
                  <>
                    {activitiesTableData2.supportAction.map(
                      (item: any, index: number) => {
                        const date = moment(item.timeLog);
                        const formattedTime = date.format('hh:mm a');
                        return (
                          <tr className='index' key={index}>
                            <td className='td-1'>{item.visited}</td>
                            <td>{item.activity}</td>
                            <td>{formattedTime}</td>
                          </tr>
                        );
                      }
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewTeammate;
