/* eslint-disable no-restricted-globals */
import charts from '../../../../../assets/images/charts.png';
import { FaCheck, FaExclamation } from 'react-icons/fa';

import './Teammates.scss';
import Pill from '../../../atoms/pill/Pill';
import Search from '../../../molecules/search/Search';
import Status from '../../../atoms/status/Status';

function Teammates() {
  // const navigate = useNavigate();

  return (
    <div className='teammates-component'>
      <div className='header'>
        <div className='title-wrapper'>
          <p className='title'>All teamates</p>
          <Pill text='14 online' variant='success' />
        </div>
        <div className='filters-wrapper'>
          <div className='search-wrapper'>
            <Search />
          </div>
        </div>
      </div>
      <div className='table-wrapper'>
        <div className='table'>
          <table border={1}>
            {/* <caption>Table Caption</caption> */}
            <thead>
              <tr>
                <th>Name of teammate</th>
                <th>Status</th>
                <th>Email</th>
                <th>Last sign in</th>
                <th>Today's session</th>
                <th>All time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='td-1'>
                  <div className='td-content'>
                    <div className='img'>
                      <span>BS</span>
                    </div>
                    Brooklyn Simmons
                  </div>
                </td>
                <td className='td-2'>
                  <div className='td-content'>
                    <Status variant='success' />
                    <Pill text='Online' variant='success' />
                  </div>
                </td>
                <td>kenzi.lawson@example.com</td>
                <td>Today at 11:52pm</td>
                <td>5hrs 43mins</td>
                <td>5hrs 43mins</td>
              </tr>
              <tr>
                <td className='td-1'>
                  <div className='td-content'>
                    <div className='img'>
                      <span>BS</span>
                    </div>
                    Brooklyn Simmons
                  </div>
                </td>
                <td className='td-2'>
                  <div className='td-content'>
                    <Status variant='success' />
                    <Pill text='Online' variant='success' />
                  </div>
                </td>
                <td>kenzi.lawson@example.com</td>
                <td>Today at 11:52pm</td>
                <td>5hrs 43mins</td>
                <td>5hrs 43mins</td>
              </tr>
              <tr>
                <td className='td-1'>
                  <div className='td-content'>
                    <div className='img'>
                      <span>BS</span>
                    </div>
                    Brooklyn Simmons
                  </div>
                </td>
                <td className='td-2'>
                  <div className='td-content'>
                    <Status variant='success' />
                    <Pill text='Online' variant='success' />
                  </div>
                </td>
                <td>kenzi.lawson@example.com</td>
                <td>Today at 11:52pm</td>
                <td>5hrs 43mins</td>
                <td>5hrs 43mins</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teammates;
