import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../../../store'
import useWidth from '../../../ui/useWidth';
import CalendarForSchedule from './CalendarForSchedule';
import './cfsStyles.css';

function Schedule() {

    const snap = useSnapshot(state);
    const width = useWidth();
    const formWidth = width < 481 ? width : (width >= 481 && width <= 750) ? width * .95 : 725;

    const deleteScheduledShowing = () => {
        state.scheduledShowing = { date: null, dateDisplay: null, scheduledTime: null, timeDisplay: null };
        state.buttonScheduled = { clicked: false, dateSet: false };
        state.tour = false;
    }

  return (

    <div id='sched'>
        {snap.buttonScheduled.dateSet && 
            <div className='flex-row gap1'>
                <div>
                    <span className='underline'>Tour requested for:</span>
                    <span className='f-weight500 f-size1-1 margin-left05'>{snap?.scheduledShowing?.timeDisplay}</span>
                </div>
                <div className='flex-row gap025'>
                    <div className='btn-delete' onClick={()=>state.buttonScheduled.clicked = true}>Edit</div>
                    <span className='delete-spacer'> | </span>
                    <div className='btn-delete' onClick={deleteScheduledShowing} >Delete</div>
                </div>
            </div>
        }
        {(!snap.buttonScheduled.dateSet && !snap.buttonScheduled.clicked && !snap.tour) &&
            <div className='btn-reverse f-size1-1' onClick={()=>state.buttonScheduled.clicked = true}>Schedule a tour</div>
        }
        {(snap.buttonScheduled.clicked || snap.tour) && 
            <CalendarForSchedule formWidth={formWidth}/>
        }
    </div>

  )
}

export default Schedule