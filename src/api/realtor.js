import axios from "axios";
import state from "../store";

const rapidAccessToken = import.meta.env.VITE_RAPID_KEY;

export const realtorAPI = async (buyOrRent, cityName, stateName) => {

    state.loading = true;

    const options = {
        method: 'POST',
        url: `https://realtor-com-scraper.p.rapidapi.com/properties/search_to_${buyOrRent}`,
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': `${rapidAccessToken}`,
          'X-RapidAPI-Host': 'realtor-com-scraper.p.rapidapi.com'
        },
        data: {
          city_name: cityName,
          state_slug: stateName,
          postal_code: '',
          offset: 0
        }
      };
      
      try {
          const response = await axios.request(options);
          // console.log(response.data.data.home_search);
          (buyOrRent == 'rent') ? state.preFiltered = removeNullCoordinates(response.data.data.home_search.properties) : state.preFiltered = removeNullCoordinates(response.data.data.home_search.results);
          state.loading = false;
      } catch (error) {
          console.error(error);
      }
}

function removeNullCoordinates(properties) {
  let filteredProperties = properties.filter(property => property.location.address.coordinate != null || property.location.address.coordinate != undefined);
  return filteredProperties
}