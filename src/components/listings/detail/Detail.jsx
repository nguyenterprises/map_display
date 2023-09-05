import React, { useState, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../../store'
import { DetailDescription, DetailSummary } from './detailSumDesc';

import useWidth from '../../../ui/useWidth';
import useMeasure from 'react-use-measure';
import './detailStyles.css'

import hanh from '../../../assets/hanh.svg';
import comingSoon from '../../../assets/comingSoon.jpg';
import { MdNavigateNext } from 'react-icons/md'
import { detailStyled } from './detailStyled';

function Detail() {

  const snap = useSnapshot(state);
  const width = useWidth();
  const [dcRef, bounds] = useMeasure();
  const [propDetails, setPropDetails] = useState();
  const [currentPic, setCurrentPic] = useState(0);
  const [openLargeImages, setOpenLargeImages] = useState(false);
  const ds = detailStyled(width, bounds, currentPic)

  const detailArea = {
    position: 'fixed',
    zIndex: '3',
    width: '100vw',
    height: '100vh',
    transform: `translateY(-${snap.headerHeight}px)`,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  }
  
  useEffect(()=>{
    const findId = snap.properties.find(id => id.property_id == snap.detailId);
    setPropDetails(findId);
  },[snap.detailId])

  const ImageSection = () => (
    <div style={ds.track} id='dc-images'>
      <div style={ds.slider} id='slider'>
        <div style={ds.dciTop}>
          <img src={propDetails?.photos == null ? comingSoon : propDetails?.photos[0]?.href} alt='prop-main-image' id='prop-main-image' onClick={() => setOpenLargeImages(true)} /> 
        </div>
        <div style={ds.dciBottom}>
          {propDetails?.photos?.map((i, index) => 
            <div key={index} style={ds.dciBImages}>
              <img src={i?.href} alt='prop-all-images' className='prop-all-images' value={index} onClick={() => setOpenLargeImages(true)}/>
            </div>
          )}
        </div>
      </div>
      {width < 768 && <>
        {currentPic >= 1 && 
          <button onClick={()=>setCurrentPic(currentPic - 1)}><MdNavigateNext style={ds.prevButtonStyles}/></button>
        }
        {currentPic < 1 && 
          <button onClick={()=>setCurrentPic(currentPic + 1)}><MdNavigateNext style={ds.nextButtonStyles}/></button>
        }
      </>}
    </div>
  ) 

  const ImagesLarge = () => (
    <div style={ds.imagesLargeStyles}>
      {propDetails?.photos?.map((i, index) => 
        <div key={index} style={ds.iLImageStyles}>
          <img src={i?.href} alt='prop-all-images' className='prop-all-images' value={index} />
        </div>
      )}
      <button onClick={() => setOpenLargeImages(false)} style={ds.cbStyles}>X</button>
    </div>
  )

  return (
    <div id='detail-area' style={detailArea}>
      
      <div id='detail-overlay' onClick={() => state.detailPage = false}></div>

      <div id='detail-container' style={ds.dcStyles} ref={dcRef}>
       
        {width > 767 && <ImageSection />}

        <div style={ds.dcInfo}>
          <div id='dci-header'>
            <div id='dci-logo'><img src={hanh} alt='hanh' id='hanh-sm' /></div>
            <div id='dci-name'>Elite Properties</div>
          </div>
          {width < 768 && <ImageSection />}
          <DetailSummary propDetails={propDetails} />
          <DetailDescription  propDetails={propDetails} />
        </div>

      </div>
      {openLargeImages && <ImagesLarge />}
      {!snap.contact && 
        <button onClick={() => state.detailPage = false} style={ds.cbStyles}>X</button>
      }

    </div>
  )
}

export default Detail