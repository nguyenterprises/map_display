import React, { useEffect } from 'react'
import state from '../../../store'
import { useSnapshot } from 'valtio'

import Contact from '../contact/Contact';
import { SubmittedMessage } from '../contact/SubmitResponse';
import { titleCase } from '../../../functions/capitalize';
import { sampleVerbiage } from "./sample";
import { homeType } from "../../filters/constants";

import { BiBuilding, BiMoneyWithdraw } from 'react-icons/bi'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsHouse, BsTextareaResize } from 'react-icons/bs'


export const DetailSummary = ({propDetails}) => {
    const snap = useSnapshot(state);

    const priceText = propDetails?.list_price ? propDetails?.list_price?.toLocaleString() : 'No data';
    const bedText = propDetails?.description?.beds ? propDetails?.description?.beds : 'No data';
    const bathText = propDetails?.description?.baths ? propDetails?.description?.baths : 'No data';
    const sqftText = propDetails?.description?.sqft ? propDetails?.description?.sqft.toLocaleString() : 'No data';
    const addressText = `${propDetails?.location?.address?.line}, ${propDetails?.location?.address?.city}, ${propDetails?.location?.address?.state_code}, ${propDetails?.location?.address?.postal_code}`
    const realtor = propDetails?.branding[0]?.name ? titleCase(propDetails?.branding[0]?.name) : null;

    useEffect(() => {
        state.detailAddress = addressText
    },[addressText])

    return (
        <div id='dci-summary'>
            <div id='dci-price'>${priceText}</div>
            <div id='dci-specs'>
            <div id='dci-bd'><b>{bedText}</b> bd</div>
            <div className='divider'>|</div>
            <div id='dci-ba'><b>{bathText}</b> ba</div>
            <div className='divider'>|</div>
            <div id='dci-sqft'><b>{sqftText}</b> sqft</div>
            </div>
            <div id='dci-address'>{addressText}</div>
            <div id='realtor-section'>
                <div id='dci-realtor'>{realtor}</div>
                <div id='summary-btns'>
                    <button className='sum-btns' onClick={()=> {
                        state.contact = true;
                        state.tour = true;
                    }}>
                        Request a tour
                    </button>
                    <button className='sum-btns' onClick={()=> state.contact = true}>Contact agent</button>
                </div>
            </div>
            {snap.contact && <Contact />}
            {snap.messageSubmitted && <SubmittedMessage />}
            {snap.contact && <div id='dci-overlay'></div>}
        </div>
    )
}

export const DetailDescription = ({propDetails}) => {
    const type = propDetails?.description?.type ? homeType?.find(pd => pd.value == propDetails?.description?.type).label : null;
    const yearBuilt = propDetails?.description?.year_built ? propDetails?.description?.year_built : null;
    const prevSoldFor = propDetails?.description?.sold_price ? propDetails?.description?.sold_price.toLocaleString() : null;

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const pso = propDetails?.description?.sold_date ? propDetails?.description?.sold_date : null;
    const d = new Date(pso);
    const prevSoldOn = pso === null ? null : d.toLocaleString('en-US', options);
    const ld = propDetails?.list_date ? propDetails?.list_date : null;
    const l = new Date(ld);
    const listDate = ld === null ? null : l.toLocaleString('en-US', options);

    const lotsqftText = propDetails?.description?.lot_sqft ? propDetails?.description?.lot_sqft.toLocaleString() : null;

    return (
        <div id='dci-description' style={{ overflowY: 'visible' }}>
            <div id='overview'>
              <div className="overview-spec"><BsHouse style={{color: '#193694' }} />{type}</div>
              <div className="overview-spec"><BiBuilding style={{color: '#193694' }} />{yearBuilt === null ? 'No build data' : <>Built in {yearBuilt}</>}</div>
              <div className="overview-spec"><AiOutlineCalendar style={{color: '#193694' }} />{listDate === null ? 'No listed date' : <>Listed on {listDate}</>}</div>
              <div className="overview-spec"><BiMoneyWithdraw style={{color: '#193694' }} />{(prevSoldFor === null || prevSoldOn === null) ? 'No previous sold data' : <>Previously sold for ${prevSoldFor} on {prevSoldOn}</>}</div>
              <div className="overview-spec"><BsTextareaResize style={{color: '#193694' }} />{lotsqftText === null ? 'No lot size data' : <>Lot size {lotsqftText} sqft</>}</div>
            </div>
            <div id='verbiage'>{sampleVerbiage}</div>
        </div>
    )
}