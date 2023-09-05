import React, { useState } from 'react'
import state from '../../../store';
import Select from 'react-select';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { timeConstants } from './constants';
import './calendarStyles.css';
import './cfsStyles.css';

function CalendarForSchedule(formWidth) {

  const [date, setDate] = useState(null);
  const dateSet = new Date();
  const plusDay = new Date(dateSet.setDate(dateSet.getDate() + 1));
  const dateDisplay = date?.toLocaleDateString('en-US', {year: "numeric", month: "numeric", day: "numeric", weekday: "long"});

  const [scheduledTime, setScheduledTime] = useState({ hour: 9, minute: 0 });
  const time = date?.setHours(scheduledTime.hour, scheduledTime.minute);
  const timeSet = new Date(time)
  const timeDisplay = timeSet.toLocaleString('en-US', {year: "numeric", month: "numeric", day: "numeric", weekday: "long", hour: "numeric", minute: "numeric"})
  
  const saStyles = {
    width: `${formWidth * .8}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.25em'
  }
  const timeStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '.5em',
  }
  
  const confirmHandler = () => {
    state.scheduledShowing = { date: date, dateDisplay: dateDisplay, scheduledTime: scheduledTime, timeDisplay: timeDisplay };
    state.buttonScheduled = { clicked: false, dateSet: true };
    state.tour = false;
  }
  return (
    <div className='flex-row gap1 flex-j-center relative'>
      <div className='schedule-area' style={saStyles}>
        <div className='calendar-container'>
          <Calendar
            calendarType='US'
            onChange={setDate}
            value={date}
            minDate={plusDay}
            next2Label={null}
            prev2Label={null}
          />
        </div>
        <div style={timeStyles}>
          <div>Preferred time: </div>
          <div>
            <Select
              onChange={(value) => setScheduledTime(value.value)}
              options={timeConstants}
              defaultValue={timeConstants[0]}
              menuPlacement='auto'
            />
          </div>
        </div>

        {date != null &&
          <div className='text-center'>
            <span className='f-size1-1 f-weight500'>{timeDisplay}</span>
            <div className='btn-reverse' onClick={confirmHandler}>Confirm</div>
          </div>
        }

      </div>

      <div id='fup-btn' className='btn-delete' onClick={()=> {
        state.buttonScheduled.clicked = false;
        state.tour = false;
      }}>
        X
      </div>

    </div>
  )

}

export default CalendarForSchedule


