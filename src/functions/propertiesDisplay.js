export const propertiesDisplay = (properties, sortBy) => {
    const ab = [].concat(properties);
    const descendingListPrice =  ab.sort((a, b) =>  b.list_price - a.list_price);
    const cd = [].concat(properties);
    const ascendingListPrice =  cd.sort((c, d) => c.list_price - d.list_price);
    const ef = [].concat(properties);
    const descendingBedsPrice =  ef.sort((e, f) => f.description.beds - e.description.beds);
    const gh = [].concat(properties);
    const descendingBathsPrice =  gh.sort((g, h) => h.description.baths - g.description.baths);
    const ij = [].concat(properties);
    const descendingSqFtPrice =  ij.sort((i, j) => j.description.sqft - i.description.sqft);
      let dir;
      switch (true) {
        case (sortBy.value == 'list_price_asc'):
          dir = ascendingListPrice;
          break;
        case (sortBy.value == 'list_price_dsc'):
          dir = descendingListPrice;
          break;
        case (sortBy.value == 'beds_dsc'):
          dir = descendingBedsPrice;
          break;
        case (sortBy.value == 'baths_dsc'):
          dir = descendingBathsPrice;
          break;
        case (sortBy.value == 'sqft_dsc'):
          dir = descendingSqFtPrice;
          break;
        default:
          dir = descendingListPrice;
      }
      return dir
}