import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import useWidth from '../../ui/useWidth';
import { bedOptions, bathOptions, homeOptions } from './constants';
import { filtersButtonHandler, applyButtonHandler, closeButtonHandler } from './foHandlers';


const FilterOptions = () => {

    const snap = useSnapshot(state);
    const animatedComponents = makeAnimated();
    const width = useWidth();

    const optionsStyles = {
      display: 'flex',
      gap: '.5em',
      justifyContent: 'center',
      alignItems: 'center',
    }
    const optionsStylesSmall = {
      position: 'absolute',
      top: `${snap.headerHeight}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '.5em',
      backgroundColor: 'rgba(0, 0, 0,.6)',
      width: '90%',
      padding: '20px',
      borderRadius: '5px',
      zIndex: 1,
      visibility: 'hidden'
    }
    const applyButtonStyles = {
      width: `${width * .35}px`,
      margin: '0 auto'
    }
    const closeButtonStyles = {
      display: 'none',
    }

    const [beds, setBeds] = useState({ value: bedOptions[0].value, label: bedOptions[0].label });
    const [baths, setBaths] = useState({ value: bathOptions[0].value, label: bathOptions[0].label });
    const [type, setType] = useState([{ value: homeOptions[0].value, label: homeOptions[0].label }]);

    useEffect(() => {

      if ((beds.value === null) && (baths.value === null) && (type.value === homeOptions[0].value)) {
        state.properties = snap.preFiltered;
      } else {
        let bedValue = (beds.value != null) ? beds.value : 0;
        let bathValue = (baths.value != null) ? baths.value : 0;
        let homeArray = [];
          for (let v of type) {
            (Array.isArray(v.value)) ? v.value.forEach(vv=>homeArray.push(vv)) : homeArray.push(v.value)
          }
        let homeValue = [...new Set(homeArray)];

        const filteredArray = snap.preFiltered.filter(f => 
          f.description.beds >= bedValue
          &&
          f.description.baths >= bathValue
          &&
          homeValue.includes(f.description.type)
        );
        state.properties = filteredArray;
      }

      state.zoomed = false
      
    },[snap.preFiltered, beds, baths, type])

   
  return (
    <div>
      {width < 623 && <button id='filters-button' onClick={filtersButtonHandler}>Filters</button>}
      {width < 623 && <button id='filters-close' onClick={closeButtonHandler} style={closeButtonStyles}>Close Filters</button>}
      <div id='filters-row' style={width < 623 ? optionsStylesSmall : optionsStyles}>
        <div>
          <Select
            onChange={(value) => setBeds(value)}
            options={bedOptions}
            defaultValue={bedOptions[0]}
          />
        </div>
        <div>
          <Select
            onChange={(value) => setBaths(value)}
            options={bathOptions}
            defaultValue={bathOptions[0]}
          />
        </div>
        <div>
          <Select
            onChange={(value) => setType(value)}
            isMulti
            options={homeOptions}
            defaultValue={homeOptions[0]}
            components={animatedComponents}
          />
        </div>
        {width < 623 && <button id='filters-apply' onClick={applyButtonHandler} style={applyButtonStyles}>Apply Filters</button>}
      </div>
    </div>
  )
}

export default FilterOptions