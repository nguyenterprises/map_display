import React from 'react';
import { useSnapshot } from 'valtio'
import state from '../store';
import { propertyMapDetails } from "./propertyDetails";
import Detail from '../components/listings/detail/Detail';

export function mapLayer(results, L, resultsLayer) {  
    
    for (let s = 0; s < results.length; s++) {
      let resultsId = results[s].property_id;
      const pds = propertyMapDetails(results[s]);
      let popUpContent = 
        `<div class='details-popup'>
                <img src='${pds.imageLink}' alt='property-image' class='dp-property-image'/>
            <div class='dp-details'>
                <div><strong>$${pds.price}</strong></div>
                <div>${pds.propertyBeds} beds, ${pds.propertyBaths} baths</div>
                <div>${pds.propertySqft} sqft</div>
        </div>`
    
      let resultsIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class='marker-pin-outside'><div class='marker-pin' value='${resultsId}'></div></div>`,
        iconSize: [30, 42],
        iconAnchor: [15, 42]
      });
      let resultsLatitude = results[s].location.address.coordinate.lat;
      let resultsLongitude = results[s].location.address.coordinate.lon;
    
      const resultsMarker = L.marker([ resultsLatitude, resultsLongitude ], { icon:resultsIcon, alt:resultsId, riseOnHover:true }).bindPopup(popUpContent,{offset:[0,-15],closeButton:false})
      resultsMarker.on({ 
        mouseover: function() { 
            this.openPopup(); 
            const onSidebarList = document.querySelectorAll(`.results-card[value='${resultsMarker.options.alt}']`);
            let i;
            for (i=0; i<onSidebarList.length; i++) {
                onSidebarList[i].style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.4)';
                onSidebarList[i].style.color = 'rgba(0,106,255,1)';
            }   
            const markerHighlight = document.querySelectorAll(`.marker-pin[value='${resultsMarker.options.alt}']`);
            let m;
            for (m=0; m<markerHighlight.length; m++) {
                markerHighlight[m].style.background = 'red';
            }   

        },
        mouseout: function() { 
            this.closePopup();
            const offSidebarList = document.querySelectorAll('.results-card');      
            let i;
            for (i=0; i<offSidebarList.length; i++) {
              offSidebarList[i].style.boxShadow = '';
              offSidebarList[i].style.color = '';
            }
            const markerHighlightOff = document.querySelectorAll('.marker-pin');      
            let m;
            for (m=0; m<markerHighlightOff.length; m++) {
              markerHighlightOff[m].style.background = 'rgba(0,106,255,1)';
            }
        },
        click: function() { 
         openDetailOnClick(resultsMarker.options.alt);
        }
      })
      resultsMarker.addTo(resultsLayer)
    }
    // console.log(resultsLayer)
    return resultsLayer;
}
const openDetailOnClick = (propertyid) => {
  state.detailPage = true
  state.detailId = propertyid;
}


export function onHoverSB(L, map) {
    const sbHoverPopup = L.popup({closeButton: false, offset:[0,0]});

    document.querySelector('#listbox').addEventListener('mouseover', (s) => { 
        let lat = s.target.getAttribute('lat');
        let lng = s.target.getAttribute('long');
        const coordslice = L.latLng( lat, lng );
        let imagelink = s.target.getAttribute('imagelink');
        let price = s.target.getAttribute('price');
        let propertybeds = s.target.getAttribute('propertybeds');
        let propertybaths = s.target.getAttribute('propertybaths');
        let propertysqft = s.target.getAttribute('propertysqft');
        let propertyid = s.target.getAttribute('propertyid');
        let mapPopUpContent = 
        `<div class='details-popup'>
                <img src='${imagelink}' alt='property-image' class='dp-property-image'/>
            <div class='dp-details'>
                <div><strong>$${price}</strong></div>
                <div>${propertybeds} beds, ${propertybaths} baths</div>
                <div>${propertysqft} sqft</div>
        </div>`
        if (coordslice) sbHoverPopup.setLatLng(coordslice).setContent(mapPopUpContent).openOn(map.current) ;
        
    })
    document.querySelector('#listbox').addEventListener('mouseleave', (s) => { 
      sbHoverPopup.removeFrom(map.current);
    }) 

}

export function onMouseOverSB(e) {
  let propertyid = e.currentTarget.getAttribute('propertyid');
  const markerHighlight = document.querySelectorAll(`.marker-pin[value='${propertyid}']`);
  let m;
  for (m=0; m<markerHighlight.length; m++) {
      markerHighlight[m].style.background = 'red';
  }  
}
export function onMouseOutSB(e) {
  let propertyid = e.currentTarget.getAttribute('propertyid');
  const markerHighlightOff = document.querySelectorAll(`.marker-pin[value='${propertyid}']`);
  let m;
  for (m=0; m<markerHighlightOff.length; m++) {
      markerHighlightOff[m].style.background = 'rgba(0,106,255,1)';
  }
}