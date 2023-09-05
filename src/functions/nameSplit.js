export const stateNameSplit = (place_name, place_type) => {
    const placeNameSplit = place_name.split(",");
    let stateName;
    (place_type == 'postcode') ? stateName = placeNameSplit[1].slice(0,-6) : stateName = placeNameSplit[1];
    return stateName;
}

export const cityNameSplit = (place_name) => {
    const placeNameSplit = place_name.split(",");
    const cityName = placeNameSplit[0];
    return cityName;
}