import React from 'react'
import { Geocoder } from '../geocoder/Geocoder'
import BorR from './BorR'
import FilterOptions from './FilterOptions'
import useWidth from '../../ui/useWidth'
import hanh from '../../assets/hanh.svg'
import './fsStyles.css'


function FiltersSection() {

  const width = useWidth();

  const fcStyles = {
    display: 'flex',
    flexDirection: width > 1160 && width < 1515 ? 'column' : 'row',
    justifyContent: width > 1160 && width < 1515 ? 'center' : 'space-between',
    gap: width > 1160 && width < 1515 ? '.25em' : '0em',
    alignItems: 'center',
    flexWrap: 'no-wrap',
    padding: width < 650 ? '0 .25em' : '0 1em',
  };
  
  return (
    <div id='filters-container' style={fcStyles}>
        {width > 799 && <div id='fc-header'>
          <div id='fc-logo'><img src={hanh} alt='hanh' id='hanh-med' /></div>
          { width > 1159 && <div id='fc-name'>Elite Properties</div>}
        </div>}
        <div id='filter-items'>
          <div id='fc-geocoder'><Geocoder /></div>
          <BorR />
          <FilterOptions />
        </div>
    </div>
  )
}

export default FiltersSection