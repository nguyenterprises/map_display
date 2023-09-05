import React, { useEffect } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store';
import './mainStyles.css'
import Listings from '../../components/listings/listings/Listings';
import Map from '../../components/map/Map';
import useWidth from '../../ui/useWidth';
import FiltersSection from '../../components/filters/FiltersSection';
import useMeasure from 'react-use-measure';
import useHeight from '../../ui/useHeight';
import Detail from '../../components/listings/detail/Detail';

function Main() {

  const snap = useSnapshot(state);
  const width = useWidth();
  const [headerRef, bounds] = useMeasure();
  const [obRef, obBounds] = useMeasure();
  const height = useHeight();

  const listingAreaWidth = {
    width: (width < 1007) ? `${width}px` : '775px'
  }
  const headerStyles = {
    height: height < 850 ? '17vh' : '12vh'
  }
  const mainStyles = {
    height: height < 850 ? '83vh' : '88vh'
  }

  useEffect(() => {
    state.headerHeight = bounds.height;
    state.obHeight = obBounds.height;
  },[width, height, snap])
  
  return (
    <>
        <header style={headerStyles} ref={headerRef}>
            <div id='filters-area'>
                <FiltersSection />
            </div>
        </header>
        <main style={mainStyles}>
            { width < 1007 ? 
            <>
                {snap.mapOnly && 
                    <div id='map-area'>
                        <Map />
                    </div>
                }
                {!snap.mapOnly && <>
                    {/* <div style={{display: 'none'}}>
                        <Map />
                    </div> */}
                    <div id='listing-area' style={listingAreaWidth}>
                        <Listings />
                    </div></>
                }
                {!snap.detailPage &&
                    <div id='only-button' ref={obRef}>
                        {(!snap.detailPage && !snap.smallSortButton) && <button onClick={()=> state.mapOnly = (!snap.mapOnly) }>{!snap.mapOnly ? 'Map' : 'List'}</button>}
                        {(!snap.mapOnly && width < 557) && <button onClick={()=> state.smallSortButton = !state.smallSortButton}>{!snap.smallSortButton ? 'Sort' : 'Apply Sort'}</button>}
                    </div>
                }
                {snap.detailPage && <Detail />}
            </>
            :
            <>
                <div id='map-area'>
                    <Map />
                </div>
                <div id='listing-area' style={listingAreaWidth}>
                    {snap.properties && <Listings />}
                </div>
                {snap.detailPage && <Detail />}
            </>
            }
        </main>
        
    </>
  )
}

export default Main
