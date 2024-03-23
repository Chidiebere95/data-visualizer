/* eslint-disable no-restricted-globals */
import charts from '../../../../../assets/images/charts.png';
import { FaCheck, FaExclamation } from 'react-icons/fa';

import './Overview.scss';
import Pill from '../../../atoms/pill/Pill';

function Overview() {
  // const navigate = useNavigate();

  return (
    <div className='overview-component'>
      <div className='stats'>
        <div className='stat'>
          <p className='title'>All teammates</p>
          <p className='info'>Teammates with access on Bugisss</p>
          <div className='details'>
            <div className='detail'>
              <div className='value'>13</div>
              <div className='text'>
                <Pill text='Online' variant='success' icon />
              </div>
            </div>
            <div className='detail'>
              <div className='value'>04</div>
              <div className='text'>
                <Pill text='Away' variant='danger' icon />
              </div>
            </div>
          </div>
        </div>
        <div className='stat stat-2'>
          <p className='title'>Team tasks</p>
          <p className='info'>Estimate of task requests on Bugisss</p>
          <div className='details'>
            <div className='detail'>
              <div className='value'>17</div>
              <div className='text'>Resolved</div>
            </div>
            <div className='detail'>
              <div className='value'>34</div>
              <div className='text'>Replied</div>
            </div>
            <div className='detail'>
              <div className='value'>04</div>
              <div className='text'>Pending</div>
            </div>
          </div>
        </div>
        <div className='stat'>
          <p className='title'>Daily time estimate</p>
          <p className='info'>Time spent on the Bugisss platform</p>
          <div className='details'>
            <div className='detail'>
              <div className='value'>13hrs 42mins</div>
              <div className='text'>Across all teammates </div>
            </div>
          </div>
        </div>
      </div>
      <div className='charts'>
        <div className='incoming'>
          <p className='title'>Incoming conversations</p>
          <div className='charts-wrapper'>
            <div className='legend-wrapper'>
              <div className='legend'>
                <div className='color online'></div>
                <p className='text'>Online</p>
              </div>
              <div className='legend'>
                <div className='color away'></div>
                <p className='text'>Away</p>
              </div>
            </div>
            <div className='chart'>
              <img src={charts} alt='' className='' />
            </div>
          </div>
        </div>
        <div className='temp'></div>
      </div>
    </div>
  );
}

export default Overview;
