import { proxy } from 'valtio';

const state = proxy({
    place_name: "",
    place_type: "",
    latitude: "",
    longitude: "",
    bounds: [],
    properties: [],
    preFiltered: [],
    buyOrRent: "buy",
    cityName: "",
    stateName: "",
    isMain: false,
    loading: false,
    mapOnly: false,
    zoomed: false,
    zoomedProperties: [],
    geoFocus: false,
    headerHeight: "",
    obHeight: "",
    smallSortButton: false,
    contact: false,
    tour: false,
    detailPage: false,
    detailId: "",
    detailAddress: "",
    scheduledShowing: {},
    buttonScheduled: { clicked: false, dateSet: false },
    messageSubmitted: false
});

export default state