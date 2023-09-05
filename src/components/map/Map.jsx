import React, { useState, useEffect, useRef } from 'react'
import { useSnapshot } from 'valtio'
import state from '../../store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { mapParams } from './mapParams';
import { mapLayer, onHoverSB } from '../../functions/mapLayer';

import useWidth from '../../ui/useWidth'
import { mapWidth } from '../../ui/mapWidth';
import './mapStyles.css'


function Map() {

    const snap = useSnapshot(state);
    const map = useRef(null);
    const resultsRef = useRef(null)
    const resultsLayer = L.layerGroup();
    const width = useWidth();
    const [internalZoom, setInternalZoom] = useState(false);
    const [internalMove, setInternalMove] = useState(false);

    const mapContainerStyles = {
        width: `${mapWidth(width)}px`,
        height: '100vh',
        zIndex: '0',
    }

    useEffect(() => {
        if (map.current) return;
        map.current = L.map('map-container', mapParams(snap));
        
    },[]);

    // pan to location area and add layer to map
    useEffect(() => {
        setInternalZoom(false);
        setInternalMove(false);
        // if there is a previous layer, remove it
        (resultsRef.current) && map.current.removeLayer(resultsRef.current);

        // map.current.panTo([ snap.latitude, snap.longitude], 12);
        map.current.fitBounds([[snap.bounds[1], snap.bounds[0]], [snap.bounds[3], snap.bounds[2]]], {padding: [0,0]});
        
        const results = snap.properties;
        mapLayer(results, L, resultsLayer);
        if (results.length > 0) resultsRef.current = resultsLayer.addTo(map.current);
        if (!snap.mapOnly) onHoverSB(L, map);

        map.current.on('zoomend resize', function() {
            // revised listings display based on zoom or resize
            (width < 1007 && !snap.mapOnly) ? state.zoomedProperties = snap.properties :
            state.zoomedProperties = newLayerArray();    
            // setting state.zoomed = true here will not work properly - must set internal useState of zoom(setInternalZoom) to true
            setInternalZoom(true);        
        });
        map.current.on('moveend', function() {
            // revised listings display based on zoom or resize
            (width < 1007 && !snap.mapOnly) ? state.zoomedProperties = snap.properties :
            state.zoomedProperties = newLayerArray();     
            // setting state.zoomed = true here will not work properly - must set internal useState of zoom(setInternalZoom) to true
            setInternalMove(true);        
        });
    },[snap.properties, width]);

    useEffect(() => {
        if (internalZoom) state.zoomed = true;
        if (internalMove) state.zoomed = true;
    },[internalZoom, internalMove])

    function newLayerArray() {
        let newBounds = map.current.getBounds();
        const filteredLayerArray = snap.properties.filter(p =>
            p.location.address.coordinate.lat < newBounds._northEast.lat && p.location.address.coordinate.lat > newBounds._southWest.lat && p.location.address.coordinate.lon < newBounds._northEast.lng && p.location.address.coordinate.lon > newBounds._southWest.lng
        )
        return filteredLayerArray
    }



  return (
        <div style={mapContainerStyles} id='map-container' />
  )
}

export default Map