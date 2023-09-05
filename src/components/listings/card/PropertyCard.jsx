import React from 'react';
import { propertyDetails } from '../../../functions/propertyDetails';
import { cardWidth } from '../../../ui/cardWidth';
import useWidth from '../../../ui/useWidth'
import './pcStyles.css'

export const PropertyCard = (property) => {

    const pds = propertyDetails(property);
    const width = useWidth();
    const propertyCardStyle = {
        width: `${cardWidth(width)}px`,
        height: '290px',
        borderRadius: '5px',
    }

    return(
        <div style={propertyCardStyle} className='results-card' value={pds.property_id} >
            <img src={pds.imageLink} alt="card-photo" className='card-image' />
            <div className='card-description'>
                <div className='cd-price'>${pds.listPrice}</div>
                {width >= 580 && <>
                    <div className='cd-specs'>{pds.propertySpecs}</div>
                    <div className='cd-address'>{pds.propertyAddress}</div>
                </>}
                {(width < 580 && width >= 445) && <>
                    <div className='cd-specs'>{pds.propertyText}</div>
                    <div className='cd-address'>{pds.addressText}</div>
                </>}
                {width < 445 && <>
                    <div className='cd-specs'>{pds.propertySpecs}</div>
                    <div className='cd-address'>{pds.propertyAddress}</div>
                </>}
            </div>
    
        </div>
    )
  }