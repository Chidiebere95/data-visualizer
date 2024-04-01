import React, { useContext, useEffect, useState } from 'react';
import './Timelogs.scss';
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

const Timelogs = ({
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
  const [barchartDataTimelogs, setBarchartDataTimelogs] = useState<any>([]);

  // timelogs chart
  const [
    showDropdownIntervalsTimelogsChart,
    setShowDropdownIntervalsTimelogsChart,
  ] = useState(false);
  const [
    dropdownOptionsIntervalsTimelogsChart,
    setDropdownOptionsIntervalsTimelogsChart,
  ] = useState([
    { title: 'Daily', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
  ]);
  const [
    dropdownSelectedIntervalsTimelogsChart,
    setDropdownSelectedIntervalsTimelogsChart,
  ] = useState({
    title: 'Daily',
    value: 'daily',
  });
  // date
  const [showDropdownDateTimelogsChart, setShowDropdownDateTimelogsChart] =
    useState(false);
  const [
    dropdownOptionsDateTimelogsChart,
    setDropdownOptionsDateTimelogsChart,
  ] = useState<any>([]);
  const [
    dropdownSelectedDateTimelogsChart,
    setDropdownSelectedDateTimelogsChart,
  ] = useState<any>({});
  const [activeDayTimelogsChart, setActiveDayTimelogsChart] = useState<any>([]);
  const [activeMonthTimelogsChart, setActiveMonthTimelogsChart] = useState<any>(
    []
  );

  useEffect(() => {
    if (dropdownSelectedIntervalsTimelogsChart.value === 'daily') {
      setDropdownSelectedDateTimelogsChart(
        dropdownOptionsDateDaily[dropdownOptionsDateDaily.length - 1]
      );
      setDropdownOptionsDateTimelogsChart(dropdownOptionsDateDaily);
    } else {
      setDropdownSelectedDateTimelogsChart(
        dropdownOptionsDateMonthly[dropdownOptionsDateMonthly.length - 1]
      );
      setDropdownOptionsDateTimelogsChart(dropdownOptionsDateMonthly);
    }
  }, [
    dropdownOptionsDateDaily,
    dropdownOptionsDateMonthly,
    dropdownSelectedIntervalsTimelogsChart,
  ]);
  useEffect(() => {
    if (dropdownSelectedIntervalsTimelogsChart.value === 'daily') {
      if (entries.length > 0) {
        const activeDayTemp = entries.find(
          (item: any) => item[0] === dropdownSelectedDateTimelogsChart.value
        );
        setActiveDayTimelogsChart(activeDayTemp);
      }
    } else if (dropdownSelectedIntervalsTimelogsChart.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const activeMonthTemp = entriesMonthly.find(
          (item: any) => item[0] === dropdownSelectedDateTimelogsChart.value
        );
        setActiveMonthTimelogsChart(activeMonthTemp);
      }
    }
  }, [
    dropdownSelectedDateTimelogsChart,
    dropdownSelectedIntervalsTimelogsChart,
  ]);
  useEffect(() => {
    let barchartDataTimelogs = {
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
    if (dropdownSelectedIntervalsTimelogsChart.value === 'daily') {
      if (activeDayTimelogsChart?.length > 0) {
        const usersTemp = Object.entries(activeDayTimelogsChart?.[1]);
        let labels: any = [];
        let datasets: any = [];
        let labelsTimelog: any = [];
        let datasetsTimelog: any = [];
        usersTemp.forEach((item: any) => {
          labels.push(item[0].split('@')[0]);
          labelsTimelog.push(item[0].split('@')[0]);
          datasets.push(
            (item[1].lastMilliSecs + item[1].milliSecsFromLastHour) /
              (1000 * 60 * 60)
          );
          datasetsTimelog.push(item[1].supportAction.length);
        });
        barchartDataTimelogs.labels = labelsTimelog;
        barchartDataTimelogs.datasets[0].data = datasetsTimelog;
        // Function to sort the data and labels
        const sortData = (data: number[], labels: string[]) => {
          // Create an array of objects with value and label
          const dataWithLabels = data.map((value, index) => ({
            value,
            label: labels[index],
          }));

          // Sort the array based on the value in descending order
          dataWithLabels.sort((a, b) => b.value - a.value);

          // Extract the sorted values and labels
          const sortedData = dataWithLabels.map((item) => item.value);
          const sortedLabels = dataWithLabels.map((item) => item.label);

          // Return the sorted data and labels
          return { sortedData, sortedLabels };
        };

        // Sort the data and labels
        const { sortedData, sortedLabels } = sortData(
          barchartDataTimelogs.datasets[0].data,
          barchartDataTimelogs.labels
        );

        // Update the barchartDataTimelogs object with sorted data and labels
        barchartDataTimelogs = {
          ...barchartDataTimelogs,
          labels: sortedLabels,
          datasets: [
            {
              ...barchartDataTimelogs.datasets[0],
              data: sortedData,
            },
          ],
        };
        setBarchartDataTimelogs(barchartDataTimelogs);
      }
    } else if (dropdownSelectedIntervalsTimelogsChart.value === 'monthly') {
      if (activeMonthTimelogsChart?.length > 0) {
        const usersTemp = Object.entries(activeMonthTimelogsChart?.[1]);
        let labels: any = [];
        let datasets: any = [];
        let labelsTimelog: any = [];
        let datasetsTimelog: any = [];
        usersTemp.forEach((item: any) => {
          labels.push(item[0].split('@')[0]);
          labelsTimelog.push(item[0].split('@')[0]);
          datasets.push(
            (item[1].lastMilliSecs + item[1].milliSecsFromLastHour) /
              (1000 * 60 * 60)
          );
          datasetsTimelog.push(item[1].supportAction.length);
        });
        barchartDataTimelogs.labels = labelsTimelog;
        barchartDataTimelogs.datasets[0].data = datasetsTimelog;
        // Function to sort the data and labels
        const sortData = (data: number[], labels: string[]) => {
          // Create an array of objects with value and label
          const dataWithLabels = data.map((value, index) => ({
            value,
            label: labels[index],
          }));

          // Sort the array based on the value in descending order
          dataWithLabels.sort((a, b) => b.value - a.value);

          // Extract the sorted values and labels
          const sortedData = dataWithLabels.map((item) => item.value);
          const sortedLabels = dataWithLabels.map((item) => item.label);

          // Return the sorted data and labels
          return { sortedData, sortedLabels };
        };

        // Sort the data and labels
        const { sortedData, sortedLabels } = sortData(
          barchartDataTimelogs.datasets[0].data,
          barchartDataTimelogs.labels
        );

        // Update the barchartDataTimelogs object with sorted data and labels
        barchartDataTimelogs = {
          ...barchartDataTimelogs,
          labels: sortedLabels,
          datasets: [
            {
              ...barchartDataTimelogs.datasets[0],
              data: sortedData,
            },
          ],
        };
        setBarchartDataTimelogs(barchartDataTimelogs);
      }
    }
  }, [
    activeDayTimelogsChart,
    activeMonthTimelogsChart,
    dropdownSelectedIntervalsTimelogsChart,
  ]);
  return (
    <div className='chart-con timelogs'>
      <div className='title-wrapper'>
        <p className='title'>Timelogs Chart</p>
        <div className='filters-wrapper'>
          <Dropdown
            showDropdown={showDropdownIntervalsTimelogsChart}
            setShowDropdown={setShowDropdownIntervalsTimelogsChart}
            dropdownSelected={dropdownSelectedIntervalsTimelogsChart}
            setDropdownSelected={setDropdownSelectedIntervalsTimelogsChart}
            dropdownOptions={dropdownOptionsIntervalsTimelogsChart}
          >
            <Filter
              setShowDropdown={setShowDropdownIntervalsTimelogsChart}
              dropdownSelected={dropdownSelectedIntervalsTimelogsChart}
            />
          </Dropdown>
          {dropdownOptionsDateTimelogsChart.length > 0 && (
            <Dropdown
              showDropdown={showDropdownDateTimelogsChart}
              setShowDropdown={setShowDropdownDateTimelogsChart}
              dropdownSelected={dropdownSelectedDateTimelogsChart}
              setDropdownSelected={setDropdownSelectedDateTimelogsChart}
              dropdownOptions={dropdownOptionsDateTimelogsChart}
            >
              <Filter
                setShowDropdown={setShowDropdownDateTimelogsChart}
                dropdownSelected={dropdownSelectedDateTimelogsChart}
              />
            </Dropdown>
          )}
        </div>
      </div>
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
      P
    </div>
  );
};

export default Timelogs;
