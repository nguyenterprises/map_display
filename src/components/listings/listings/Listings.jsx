import React, { useState, useEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../../store'
import Select from 'react-select';

import { PropertyCard } from '../card/PropertyCard'
import { onMouseOutSB, onMouseOverSB } from '../../../functions/mapLayer'
import { propertiesDisplay } from '../../../functions/propertiesDisplay'
import millify from 'millify'
import useWidth from '../../../ui/useWidth';

import './listingsStyles.css'
import ClipLoader from 'react-spinners/ClipLoader'
import comingSoon from '../../../assets/comingSoon.jpg'


const sortOptions = [
  { order: 'ascending', value: 'list_price_asc', label: 'Price(Low to High)' },
  { order: 'descending', value: 'list_price_dsc', label: 'Price(High to Low)' },
  { order: 'descending', value: 'beds_dsc', label: 'Bedrooms' },
  { order: 'descending', value: 'baths_dsc', label: 'Bathrooms' },
  { order: 'descending', value: 'sqft_dsc', label: 'Square Feet' },
]

function Listings() {

  const snap = useSnapshot(state);
  const rentBuy = (snap.buyOrRent == 'buy') ? 'Homes For Sale' : 'Rental Listings'
  const [properties, setProperties] = useState(snap.properties);
  const [sortBy, setSortBy] = useState(sortOptions[1]);
  const [sortProperties, setSortProperties] = useState(properties);

  const width = useWidth();
 
  useEffect(() => {
    (snap.zoomed) ? setProperties(snap.zoomedProperties) : setProperties(snap.properties);
  },[snap.zoomedProperties, snap.properties, snap.zoomed]);

  useEffect(()=>{
    const display = propertiesDisplay(properties, sortBy)
    setSortProperties(display)
  },[sortBy, properties])

  const smallSortStyles = {
    position: 'absolute',
    bottom: `${snap.obHeight + 20}px`,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,.6)',
    width: '90%',
    padding: '20px',
    borderRadius: '5px',
    zIndex: 1,
  }

  const LcSort = () => (
    <div id='lc-sort'>
      <div>Sort</div>
      <Select
        onChange={(value) => setSortBy(value)}
        options={sortOptions}
        defaultValue={sortOptions[1]}
        menuPlacement='auto'
        value={sortBy}
      />
    </div>
  )

  const detailHandler = (e) => {
    state.detailPage = true
    const propertyid = e.currentTarget.getAttribute('propertyid');
    state.detailId = propertyid;
  }

  return (
    <div>
     
      <div id='listings-header'>
        <div id='listings-title'>{snap.cityName}, {snap.stateName} {rentBuy} {width < 557 && <>&#40;{properties.length}&#41;</>}</div>
        {width > 556 &&
          <div id='listings-cat'>
            <div>{properties.length} results</div>
            <LcSort />
          </div>
        }
      </div>
      <div className='propertyListingStyles' id='listbox'>
          {snap.loading ? 
            <div id='loader-container'>
              <ClipLoader color={'rgba(0,0,0,.6'} size={60} />
            </div>
          : 
            sortProperties.length < 1 ?
              <div>No properties available</div>
            :
              sortProperties.map(p => (
                <div key={p.property_id} style={{ position: 'relative' }}>
                  <div
                    className='coordinates-overlay'
                    lat={p.location.address.coordinate.lat}
                    long={p.location.address.coordinate.lon}
                    imagelink={p.primary_photo?.href == null ? comingSoon : p.primary_photo?.href}
                    price={p.list_price == null ? '--' : millify(p.list_price)}
                    propertybeds={p.description.beds == null ? '--' : p.description.beds}
                    propertybaths={p.description.baths == null ? '--' : p.description.baths}
                    propertysqft={p.description.sqft == null ? '--' : p.description.sqft}
                    propertyid={p.property_id}
                    onMouseOver={onMouseOverSB}
                    onMouseOut={onMouseOutSB}
                    onClick={detailHandler}
                  />
                  <PropertyCard property={p} />
                </div>
              ))
          }
      </div>
      {snap.smallSortButton && <div style={smallSortStyles}><LcSort /></div>}
    </div>
  )
}

export default Listings