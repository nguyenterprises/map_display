import React, { useEffect } from 'react'
import './movementStyles.css'
import { useSnapshot } from 'valtio'
import state from '../../store';
import useMeasure from 'react-use-measure';
import useWidth from '../../ui/useWidth';
import useHeight from '../../ui/useHeight';
import { movementPhotos } from './movementPhotos';
import { Geocoder } from '../../components/geocoder/Geocoder';
import './introStyles.css';
import { BsHouseDoor, BsFillHouseHeartFill  } from 'react-icons/bs';
import { BiBuildingHouse } from 'react-icons/bi';
import { MdHouseboat, MdOutlineLiving, MdOutlineDining, MdLiving } from 'react-icons/md';
import { GiFamilyHouse } from 'react-icons/gi';
import { FaCouch } from 'react-icons/fa';
import hanh from '../../assets/hanh.svg';

function Movement() {
    const snap = useSnapshot(state);
    const [galleryRef, bounds] = useMeasure();
    const width = useWidth();
    const height = useHeight();

    useEffect(()=> {
        const gallery = document.getElementById("gallery");

        window.addEventListener("mousemove", (e) => {
            const mouseX = e.clientX, mouseY = e.clientY;
            const xDecimal = mouseX / window.innerWidth, yDecimal = mouseY / window.innerHeight;
            const maxX = gallery.offsetWidth - window.innerWidth, maxY = gallery.offsetHeight - window.innerHeight;
            const panX = maxX * xDecimal * -1, panY = maxY * yDecimal * -1;
            gallery.animate({
                transform: `translate(${panX}px, ${panY}px)`
            }, {
                duration: 4000,
                fill: "forwards",
                easing: "ease"
            })
        })
        window.removeEventListener("mousemove", (e) => {
            const mouseX = e.clientX, mouseY = e.clientY;
            const xDecimal = mouseX / width, yDecimal = mouseY / height;
            const maxX = bounds.width - width, maxY = bounds.height - height;
            const panX = maxX * xDecimal * -1, panY = maxY * yDecimal * -1;
            gallery.animate({
                transform: `translate(${panX}px, ${panY}px)`
            }, {
                duration: 4000,
                fill: "forwards",
                easing: "ease"
            })
        })
    },[]);

    const tcStyles = {
        position: 'fixed',
        left: `${width/2}px`,
        top: `${height/2}px`,
        transform: 'translate(-50%, -50%)',
        fontSize: '2.5rem',
        fontWeight: '700',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '.15em',
        padding: '1em 2em',
        whiteSpace: 'nowrap',
        zIndex: '2',
        border: '1px solid black',
        borderRadius: '10px',
        background: 'linear-gradient(180deg, rgba(255, 255, 255, .87) 50%, rgba(0, 0, 0, .3) 100%)',
        backdropFilter: 'blur(3px)'
    }
    
  return (
    <div id='movement-body'>
        {snap.geoFocus && (<div id='cover-overlay-desktop'></div>)}
        <div style={tcStyles} id='tc-styles'>
          <div>
            <div id='mb-header'>
                <div id='mb-logo'><img src={hanh} alt='hanh' id='hanh-lg' /></div>
                <div id='mb-name'>Elite Properties</div>
            </div>
          </div>
          <div id='mb-title'>Find your next home</div>
          <div id='mb-sub-title'>Enter city or postal code</div>
          <div id='geocoder-container'>
            <Geocoder />
          </div>
        </div>
        <div id="gallery" ref={galleryRef}>
            <div className="tile">
                <BsHouseDoor className='movement-icon' />
                <img src={movementPhotos[6].source} />
            </div>
            <div className="tile">
                <BsFillHouseHeartFill className='movement-icon' />
                <img src={movementPhotos[0].source} />
            </div>
            <div className="tile">
                <MdHouseboat className='movement-icon' />
                <img src={movementPhotos[8].source} />
            </div>
            <div className="tile">
                <FaCouch className='movement-icon' />
                <img src={movementPhotos[1].source} />
            </div>
            <div className="tile">
                <MdLiving className='movement-icon' />
                <img src={movementPhotos[7].source} />
            </div>
            <div className="tile">
                <MdOutlineLiving className='movement-icon' />
                <img src={movementPhotos[5].source} />
            </div>
            <div className="tile">
                <MdOutlineDining className='movement-icon' />
                <img src={movementPhotos[3].source} />
            </div>
            <div className="tile">
                <BiBuildingHouse className='movement-icon' />
                <img src={movementPhotos[2].source} />
            </div>
            <div className="tile">
                <GiFamilyHouse className='movement-icon' />
                <img src={movementPhotos[4].source} />
            </div>
        </div>

    </div>
  )
}

export default Movement