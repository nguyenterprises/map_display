import React, { useEffect, useRef } from 'react'
import state from '../../store';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { cityNameSplit, stateNameSplit } from '../../functions/nameSplit';
import './geocoderStyles.css'

const geocoderStyles = {
    zIndex: '9'
}

export const Geocoder = () => {

    const geoContainer = useRef(null);
    const geocoder = useRef(null);

    useEffect(() => {
        if (geocoder.current) return;
        geocoder.current = new MapboxGeocoder({
            accessToken: import.meta.env.VITE_MAPBOX_KEY,
            types: 'postcode, district, place, locality, neighborhood',
            countries: 'us'
        });
        geocoder.current.addTo('#geocoder');
    },[])

    useEffect(() => {
        if (!geocoder.current) return;
        geocoder.current.on('result', (e) => {
            state.zoomed = false;
            state.place_name = e.result.place_name;
            state.place_type = e.result.place_type;
            state.latitude = e.result.center[1];
            state.longitude = e.result.center[0];
            state.bounds = e.result.bbox;
            state.cityName = cityNameSplit(e.result.place_name);
            state.stateName = stateNameSplit(e.result.place_name, e.result.place_type);
            if (!state.isMain) state.isMain = true;
            // console.log('result', e.result);
        })
    },[])

    return (
        <div>
            <div onFocus={()=> state.geoFocus = true} onBlur={()=> state.geoFocus = false} style={geocoderStyles} ref={geoContainer} id='geocoder'></div>
        </div>
    )

}
