import React from 'react'
import { Geocoder } from '../../components/geocoder/Geocoder'
import './introStyles.css'
import { useSnapshot } from 'valtio'
import state from '../../store';
import useWidth from '../../ui/useWidth'
import useHeight from '../../ui/useHeight'
import hanh from '../../assets/hanh.svg'


function Intro() {
  const snap = useSnapshot(state);
  const width = useWidth();
  const height = useHeight();

  const cpc = {
    width: `${width}px`,
    height: `${height}px`,
    position: 'relative',
  }
  const cPhoto = {
    height: `${height}px`,
    width: '100%',
    objectFit: 'cover',
  }

  return (
    <div id='intro-area'>
        <div style={cpc}>
          {snap.geoFocus && (<div id='cover-overlay-mobile'></div>)}
          <img src='https://res.cloudinary.com/dmjhwxcjh/image/upload/v1685923651/real_estate/cover_dvv8cx.jpg' alt='cover' id='cover-photo' style={cPhoto} />
        </div>
        <div id='title-container'>
          <div>
            <div id='tc-header'>
                <div id='tc-logo'><img src={hanh} alt='hanh' id='hanh-tc' /></div>
                <div id='tc-name'>Elite Properties</div>
            </div>
          </div>
          <div id='title'>Find your next home</div>
          <div id='sub-title'>Enter city or postal code</div>
          <div id='geocoder-container'>
            <Geocoder />
          </div>
        </div>

    </div>
  )
}

export default Intro