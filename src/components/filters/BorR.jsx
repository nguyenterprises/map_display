import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store';
import Select from 'react-select';
import { realtorAPI } from '../../api/realtor';
import { cityNameSplit, stateNameSplit } from '../../functions/nameSplit';


const BorR = () => {

    const snap = useSnapshot(state);

    const handleChange = value => { 
      if (value) {
        // console.log('selected value',value.value);
        state.zoomed = false;
        state.buyOrRent = value.value;
      }
    }

    useEffect(() => {
      realtorAPI(snap.buyOrRent, cityNameSplit(snap.place_name), stateNameSplit(snap.place_name, snap.place_type));
    },[snap.buyOrRent, snap.place_name]);

    const options = [
      { value: 'rent', label: 'For Rent' },
      { value: 'buy', label: 'For Sale' },
    ]
  
  return (
    <div>
      <Select
        onChange={handleChange}
        options={options}
        defaultValue={options[1]}
      />
    </div>
  )

}

export default BorR