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
interface IProps {
  // activeDay: any[];
  // setActiveDay: React.Dispatch<React.SetStateAction<any[]>>;
  // entries: any[];
  // setEntries: React.Dispatch<React.SetStateAction<any[]>>;
}
function Overview({}: IProps) {
  // console.log('activeday', activeDay);
  const { theme } = useContext(AppContext);
  const { entries, activeDay } = useSelector(
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
  const [barchartDataAverage, setBarchartDataAverage] = useState<any>([]);
  const totalTeammatesSupport = 35;

  useEffect(() => {
    dispatch(triggerGetAllDataDaily());
  }, []);
  useEffect(() => {
    const barchartDataAverage = {
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
    if (getAllDataDaily.status === 'successful') {
      // new
      // console.log('entries', entries);

      const y = entries.map((item: any) => {
        const labels: any = [];
        const dataSets: any = [];
        labels.push(item[0]);
        //
        const arrayOfMillisecs: any = [];
        // console.log('item[1]', item[1]);

        const averageTemp = Object.entries(item[1]).forEach((item2: any) => {
          arrayOfMillisecs.push(
            item2[1].lastMilliSecs + item2[1].milliSecsFromLastHour
          );
        });
        const sum2 = arrayOfMillisecs.reduce(
          (accumulator: number, currentValue: number) =>
            accumulator + currentValue,
          0
        );
        const average2 = sum2 / arrayOfMillisecs.length;
        dataSets.push(average2);

        const obj = {
          labels: labels[0],
          dataSets: dataSets[0] / (1000 * 60 * 60),
        };
        // console.log('obj', obj);

        return obj;
      });
      // console.log('y', y);
      y.forEach((item: any) => {
        barchartDataAverage.labels.push(item.labels);
        barchartDataAverage.datasets[0].data.push(item.dataSets);
        setBarchartDataAverage(barchartDataAverage);
      });
    }
  }, [getAllDataDaily, entries]);

  useEffect(() => {
    if (activeDay?.length > 0) {
      const updateStateFunc = () => {
        const arrayOfMillisecs: any = [];
        const x = activeDay[1];
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
  }, [activeDay]);

  useEffect(() => {
    const barChartData = {
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
    const barchartDataTimelogs = {
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
    if (activeDay?.length > 0) {
      const usersTemp = Object.entries(activeDay?.[1]);
      console.log('usersTemp', usersTemp);
      let labels: any = [];
      let datasets: any = [];
      let labelsTimelog: any = [];
      let datasetsTimelog: any = [];
      usersTemp.forEach((item: any) => {
        labels.push(item[0]);
        labelsTimelog.push(item[0]);
        datasets.push(
          (item[1].lastMilliSecs + item[1].milliSecsFromLastHour) /
            (1000 * 60 * 60)
        );
        datasetsTimelog.push(item[1].timeLogs.length);
      });
      barChartData.labels = labels;
      barChartData.datasets[0].data = datasets;
      // timelogs
      barchartDataTimelogs.labels = labelsTimelog;
      barchartDataTimelogs.datasets[0].data = datasetsTimelog;
      setBarchartData(barChartData);
      setBarchartDataTimelogs(barchartDataTimelogs);

      console.log('labels', labels);
      console.log('dataSets', datasets);
    }
  }, [activeDay]);

  console.log('barchartData', barchartData);
  console.log('barchartDataTimelogs', barchartDataTimelogs);
  // console.log('getAllDataDaily', getAllDataDaily);

  return (
    <div className='overview-component'>
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
                <div className='value'>{activeTeamMatesDaily}</div>
                <div className='text'>
                  <Pill text='Signed in today' variant='success' icon />
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
                  {totalTeammatesSupport - Number(activeTeamMatesDaily)}
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
            <p className='title'>Daily Time Estimate</p>
            <p className='info'>Daily Time Estimate</p>
            <div className='details'>
              <div className='detail'>
                <div className='value'>{dailyTimeEstimate}</div>
                <div className='text'>
                  <Pill text='Across all teammates ' variant='info' icon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='charts'>
        <div className='incoming'>
          <p className='title'>Productivity Chart</p>
          <div className='charts-wrapper'>
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
          </div>
        </div>
        <div className='incoming timelogs'>
          <p className='title'>Timelogs Chart</p>
          <div className='charts-wrapper'>
            {/* <div className='legend-wrapper'>
              <div className='legend'>
                <div className='color online'></div>
                <p className='text'>Online</p>
              </div>
              <div className='legend'>
                <div className='color away'></div>
                <p className='text'>Away</p>
              </div>
            </div> */}
            <div className='chart'>
              {getAllDataDaily.status === 'base' ||
              getAllDataDaily.status === 'loading' ? (
                <>Loading</>
              ) : getAllDataDaily.status === 'successful' ? (
                <>
                  {barchartDataTimelogs.labels?.length > 0 && (
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
          </div>
        </div>
        <div className='incoming timelogs'>
          <p className='title'>Average Chart</p>
          <div className='charts-wrapper'>
            {/* <div className='legend-wrapper'>
              <div className='legend'>
                <div className='color online'></div>
                <p className='text'>Online</p>
              </div>
              <div className='legend'>
                <div className='color away'></div>
                <p className='text'>Away</p>
              </div>
            </div> */}
            <div className='chart'>
              {getAllDataDaily.status === 'base' ||
              getAllDataDaily.status === 'loading' ? (
                <>Loading</>
              ) : getAllDataDaily.status === 'successful' ? (
                <>
                  {barchartDataAverage.labels?.length > 0 && (
                    <>
                      {
                        <Bar
                          data={barchartDataAverage}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
