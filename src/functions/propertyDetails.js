import { useSnapshot } from 'valtio';
import state from '../store';
import millify from 'millify';
import comingSoon from '../assets/comingSoon.jpg'

export const propertyDetails = ({ property: { property_id, primary_photo, list_price, description, location} }) => {
    const snap = useSnapshot(state);

    const imageLink = primary_photo?.href == null ? comingSoon : primary_photo?.href;
    const price = list_price == null ? '--' : list_price.toLocaleString();
    const listPrice = snap.buyOrRent == 'rent' ? `${price}/mo` : price
    const propertyBeds = description.beds == null ? '--' : description.beds;
    const propertyBaths = description.baths == null ? '--' : description.baths;
    const propertySqft = description.sqft == null ? '--' : description.sqft;
    const propertyText = `${propertyBeds} bds | ${propertyBaths} ba | ${propertySqft} sqft - Type for `;
    const propertySpecs = propertyText.length > 25 ? propertyText.substring(0, 25) + '...' : propertyText
    const addressText = `${location.address.line}, ${location.address.city}, ${location.address.state_code}, ${location.address.postal_code}`
    const propertyAddress = addressText.length > 20 ? addressText.substring(0, 20) + '...' : addressText;
    const latitude = location.address.coordinate.lat;
    const longitude = location.address.coordinate.lon;

    return {
        property_id: property_id,
        imageLink: imageLink,
        price: price,
        listPrice: listPrice,
        propertyBeds: propertyBeds,
        propertyBaths: propertyBaths,
        propertySqft: propertySqft,
        propertyText: propertyText,
        propertySpecs: propertySpecs,
        addressText: addressText,
        propertyAddress: propertyAddress,
        latitude: latitude,
        longitude: longitude
    }
}

export const propertyMapDetails = (results) => {

    const imageLink = results.primary_photo?.href == null ? comingSoon : results.primary_photo?.href;
    const price = results.list_price == null ? '--' : millify(results.list_price);
    const propertyBeds = results.description.beds == null ? '--' : results.description.beds;
    const propertyBaths = results.description.baths == null ? '--' : results.description.baths;
    const propertySqft = results.description.sqft == null ? '--' : results.description.sqft;

    return {
        imageLink: imageLink,
        price: price,
        propertyBeds: propertyBeds,
        propertyBaths: propertyBaths,
        propertySqft: propertySqft,
    }
}