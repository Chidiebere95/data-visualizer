import React, { useContext, useEffect, useState } from 'react';
import './Productivity.scss';
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

const Productivity = ({
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
  const [barchartData, setBarchartData] = useState<any>([]);

  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const handleSelect = (ranges: any) => {
    setSelectedRange([ranges.selection]);
  };
  // productivity chart
  const [
    showDropdownIntervalsProductivityChart,
    setShowDropdownIntervalsProductivityChart,
  ] = useState(false);
  const [
    dropdownOptionsIntervalsProductivityChart,
    setDropdownOptionsIntervalsProductivityChart,
  ] = useState([
    { title: 'Daily', value: 'daily' },
    { title: 'Monthly', value: 'monthly' },
  ]);
  const [
    dropdownSelectedIntervalsProductivityChart,
    setDropdownSelectedIntervalsProductivityChart,
  ] = useState({
    title: 'Daily',
    value: 'daily',
  });
  // date
  const [
    showDropdownDateProductivityChart,
    setShowDropdownDateProductivityChart,
  ] = useState(false);
  const [
    dropdownOptionsDateProductivityChart,
    setDropdownOptionsDateProductivityChart,
  ] = useState<any>([]);
  const [
    dropdownSelectedDateProductivityChart,
    setDropdownSelectedDateProductivityChart,
  ] = useState<any>({});
  const [activeDayProductivityChart, setActiveDayProductivityChart] =
    useState<any>([]);
  const [activeMonthProductivityChart, setActiveMonthProductivityChart] =
    useState<any>([]);

  useEffect(() => {
    if (dropdownSelectedIntervalsProductivityChart.value === 'daily') {
      setDropdownSelectedDateProductivityChart(
        dropdownOptionsDateDaily[dropdownOptionsDateDaily.length - 1]
      );
      setDropdownOptionsDateProductivityChart(dropdownOptionsDateDaily);
    } else {
      setDropdownSelectedDateProductivityChart(
        dropdownOptionsDateMonthly[dropdownOptionsDateMonthly.length - 1]
      );
      setDropdownOptionsDateProductivityChart(dropdownOptionsDateMonthly);
    }
  }, [
    dropdownOptionsDateDaily,
    dropdownOptionsDateMonthly,
    dropdownSelectedIntervalsProductivityChart,
  ]);
  useEffect(() => {
    if (dropdownSelectedIntervalsProductivityChart.value === 'daily') {
      if (entries.length > 0) {
        const activeDayTemp = entries.find(
          (item: any) => item[0] === dropdownSelectedDateProductivityChart.value
        );
        setActiveDayProductivityChart(activeDayTemp);
      }
    } else if (dropdownSelectedIntervalsProductivityChart.value === 'monthly') {
      if (entriesMonthly.length > 0) {
        const activeMonthTemp = entriesMonthly.find(
          (item: any) => item[0] === dropdownSelectedDateProductivityChart.value
        );
        setActiveMonthProductivityChart(activeMonthTemp);
      }
    }
  }, [
    dropdownSelectedDateProductivityChart,
    dropdownSelectedIntervalsProductivityChart,
  ]);
  useEffect(() => {
    let barChartData = {
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
    if (dropdownSelectedIntervalsProductivityChart.value === 'daily') {
      if (activeDayProductivityChart?.length > 0) {
        const usersTemp = Object.entries(activeDayProductivityChart?.[1]);
        let labels: any = [];
        let datasets: any = [];
        usersTemp.forEach((item: any) => {
          labels.push(item[0].split('@')[0]);
          datasets.push(
            (item[1].lastMilliSecs + item[1].milliSecsFromLastHour) /
              (1000 * 60 * 60)
          );
        });
        barChartData.labels = labels;
        barChartData.datasets[0].data = datasets;
        // console.log('productivity', barchartData);
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
          barChartData.datasets[0].data,
          barChartData.labels
        );

        // Update the barChartData object with sorted data and labels
        barChartData = {
          ...barChartData,
          labels: sortedLabels,
          datasets: [
            {
              ...barChartData.datasets[0],
              data: sortedData,
            },
          ],
        };

        setBarchartData(barChartData);
      }
    } else if (dropdownSelectedIntervalsProductivityChart.value === 'monthly') {
      if (activeMonthProductivityChart?.length > 0) {
        const usersTemp = Object.entries(activeMonthProductivityChart?.[1]);
        let labels: any = [];
        let datasets: any = [];
        usersTemp.forEach((item: any) => {
          labels.push(item[0].split('@')[0]);
          datasets.push(
            (item[1].lastMilliSecs + item[1].milliSecsFromLastHour) /
              (1000 * 60 * 60)
          );
        });
        barChartData.labels = labels;
        barChartData.datasets[0].data = datasets;
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
          barChartData.datasets[0].data,
          barChartData.labels
        );

        // Update the barChartData object with sorted data and labels
        barChartData = {
          ...barChartData,
          labels: sortedLabels,
          datasets: [
            {
              ...barChartData.datasets[0],
              data: sortedData,
            },
          ],
        };

        setBarchartData(barChartData);
      }
    }
  }, [activeDayProductivityChart, activeMonthProductivityChart]);
  return (
    <div className='chart-con-productivity'>
      <div className='title-wrapper'>
        <p className='title'>Productivity Chart</p>
        <div className='filters-wrapper'>
          <Dropdown
            showDropdown={showDropdownIntervalsProductivityChart}
            setShowDropdown={setShowDropdownIntervalsProductivityChart}
            dropdownSelected={dropdownSelectedIntervalsProductivityChart}
            setDropdownSelected={setDropdownSelectedIntervalsProductivityChart}
            dropdownOptions={dropdownOptionsIntervalsProductivityChart}
          >
            <Filter
              setShowDropdown={setShowDropdownIntervalsProductivityChart}
              dropdownSelected={dropdownSelectedIntervalsProductivityChart}
            />
          </Dropdown>
          {dropdownOptionsDateProductivityChart.length > 0 && (
            <Dropdown
              showDropdown={showDropdownDateProductivityChart}
              setShowDropdown={setShowDropdownDateProductivityChart}
              dropdownSelected={dropdownSelectedDateProductivityChart}
              setDropdownSelected={setDropdownSelectedDateProductivityChart}
              dropdownOptions={dropdownOptionsDateProductivityChart}
            >
              <Filter
                setShowDropdown={setShowDropdownDateProductivityChart}
                dropdownSelected={dropdownSelectedDateProductivityChart}
              />
            </Dropdown>
          )}
          {/* <DateRangePicker ranges={selectedRange} onChange={handleSelect} /> */}
        </div>
      </div>
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
  );
};

export default Productivity;
