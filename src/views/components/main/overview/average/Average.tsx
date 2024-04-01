import React, { useContext, useEffect, useState } from 'react';
import './Average.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { AppContext } from '../../../../../context/Context';
import Dropdown from '../../../molecules/dropdown/Dropdown';
import Filter from '../../../molecules/filter/Filter';
import { DateRangePicker } from 'react-date-range';
import { Bar } from 'react-chartjs-2';

interface IProps {
  dropdownOptionsDateDaily: any;
  setDropdownOptionsDateDaily: React.Dispatch<any>;
  dropdownOptionsDateMonthly: any;
  setDropdownOptionsDateMonthly: React.Dispatch<any>;
}

const Average = ({
  dropdownOptionsDateDaily,
  setDropdownOptionsDateDaily,
  dropdownOptionsDateMonthly,
  setDropdownOptionsDateMonthly,
}: IProps) => {
  const { theme } = useContext(AppContext);
  const { entries, activeDay, entriesMonthly, activeMonth } = useSelector(
    (state: RootState) => state.general
  );
  const { getAllDataDaily, getAllDataMonthly } = useSelector(
    (state: RootState) => state.general
  );
  const [barchartDataAverage, setBarchartDataAverage] = useState<any>([]);
  // update
  const [
    dropdownSelectedIntervalsInfoBoard,
    setDropdownSelectedIntervalsInfoBoard,
  ] = useState({
    title: 'Daily',
    value: 'daily',
  });
  //

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
    if (dropdownSelectedIntervalsInfoBoard.value === 'daily') {
      if (getAllDataDaily.status === 'successful') {
        const y = entries.map((item: any) => {
          const labels: any = [];
          const dataSets: any = [];
          labels.push(item[0]);
          const arrayOfMillisecs: any = [];
          Object.entries(item[1]).forEach((item2: any) => {
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
          return obj;
        });
        // console.log('y', y);
        y.forEach((item: any) => {
          barchartDataAverage.labels.push(item.labels);
          barchartDataAverage.datasets[0].data.push(item.dataSets);
          setBarchartDataAverage(barchartDataAverage);
        });
      }
    } else if (dropdownSelectedIntervalsInfoBoard.value === 'monthly') {
      if (getAllDataMonthly.status === 'successful') {
        const y = entriesMonthly.map((item: any) => {
          const labels: any = [];
          const dataSets: any = [];
          labels.push(item[0]);
          //
          const arrayOfMillisecs: any = [];
          // console.log('item[1]', item[1]);

          Object.entries(item[1]).forEach((item2: any) => {
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
    }
  }, [
    getAllDataDaily,
    entries,
    entriesMonthly,
    dropdownSelectedIntervalsInfoBoard,
  ]);

  return (
    <div className='chart-con '>
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
      t
    </div>
  );
};

export default Average;
