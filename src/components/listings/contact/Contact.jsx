import React from 'react'
import state from '../../../store'
import { useSnapshot } from 'valtio'
import { useForm } from 'react-hook-form';
import Schedule from './Schedule';
import useWidth from '../../../ui/useWidth';
import useHeight from '../../../ui/useHeight';
import { enforceFormat, formatToPhone } from '../../../ui/phoneNumber';
import { contactMeMessage, tourMessage } from './constants';
import './contactStyles.css';

function Contact() {

    const snap = useSnapshot(state);

    const  { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            message: "",
        }
    });
    const width = useWidth();
    const height = useHeight();

    const formWidth = width < 481 ? width : (width >= 481 && width <= 750) ? width * .95 : 725;

    const contactStyles = {
        width: `${formWidth}px`,
        height: width < 481 ? `${height * .95}px` : `${height * .8}px`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#F9F9F9',
        border: '2px solid rgba(25, 54, 148, .8)',
        zIndex: '1',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'auto',
        paddingTop: '1.5em',
        paddingBottom: '1.5em',
    }
    const formStyles = {
        width: `${formWidth * .8}px`,
        display: 'flex',
        flexDirection: 'column',
        gap: '.25em'
    }
   
  return (
    <div style={contactStyles}>

        <div className='form-header'>{(snap.tour || snap.buttonScheduled.dateSet) ? 'Schedule tour' : 'Contact agent'}</div>
        
        <form
            onSubmit={handleSubmit((data) => {
                // console.log('data', data);
                state.contact = false;
                state.messageSubmitted = true;
            })}
            style={formStyles}
        >
            <div className='cfr-lr'>
                <label htmlFor="name" className='c-label'>Name</label>
                <input
                    {...register("name", { required: "Name required." })}
                    placeholder='Enter name'
                    className='c-input'
                    id='name'
                    name='name'
                />
            </div>
            <div className='c-alert'>
                <p>{errors.name?.message}</p>
            </div>

            <div className='cfr-lr'>
                <label htmlFor="phone" className='c-label'>Phone</label>
                <input
                    {...register("phone", { required: "Phone number required.", minLength: { value: 10, message: "Minimum length is 10."} })}
                    placeholder='Enter phone number'
                    className='c-input'
                    id='phone'
                    name='phone'
                    onKeyDown={enforceFormat}
                    onKeyUp={formatToPhone}
                />
            </div>
            <div className='c-alert'>
                <p>{errors.phone?.message}</p>
            </div>
            
            <div className='cfr-lr'>
                <label htmlFor="email" className='c-label'>Email</label>
                <input
                    {...register("email", { required: "Email required.", minLength: { value: 8, message: "Minimum length is 8."} })}
                    placeholder='Enter email address'
                    className='c-input'
                    id='email'
                    name='email'
                />
            </div>
            <div className='c-alert'>
                <p>{errors.email?.message}</p>
            </div>

            <Schedule />

            <div className='cfr-lr'>
                <label htmlFor="message" className='c-label'>Message</label>
                <textarea
                    {...register("message")} 
                    id='m-text'
                    name='message'
                    placeholder={snap?.scheduledShowing?.timeDisplay ? tourMessage(snap?.detailAddress, snap?.scheduledShowing?.timeDisplay) : contactMeMessage(snap?.detailAddress)}
                    maxLength={500}
                    rows='8'
                />
            </div>
            <div className='c-alert'>
                <p>{errors.message?.message}</p>
            </div>

            <button className='sum-btns'>Submit</button>
        </form>

        <button id='close-contact' onClick={()=> {
            state.contact = false;
            state.tour = false;
            state.scheduledShowing = { date: null, dateDisplay: null, scheduledTime: null, timeDisplay: null };
            state.buttonScheduled = { clicked: false, dateSet: false };
        }}>
            X
        </button>

    </div>
  )
}

export default Contact