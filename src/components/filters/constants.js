export const bedOptions = [
    { value: null, label: 'Any+ Bedrooms' },
    { value: '1', label: '1+ Bedrooms' },
    { value: '2', label: '2+ Bedrooms' },
    { value: '3', label: '3+ Bedrooms' },
    { value: '4', label: '4+ Bedrooms' },
    { value: '5', label: '5+ Bedrooms' },
]
export const bathOptions = [
  { value: null, label: 'Any+ Bathrooms' },
  { value: '1', label: '1+ Bathrooms' },
  { value: '2', label: '2+ Bathrooms' },
  { value: '3', label: '3+ Bathrooms' },
  { value: '4', label: '4+ Bathrooms' },
]

export const homeOptions = [
  { value: ['single_family', 'condo_townhome_rowhome_coop', 'townhomes', 'duplex_triplex', 'multi_family', 'condos', 'coop'], label: 'All Home Types' },
  { value: 'single_family', label: 'Houses' },
  { value: ['condo_townhome_rowhome_coop', 'townhomes', 'duplex_triplex'], label: 'Townhomes' },
  { value: 'multi_family', label: 'Multi-family' },
  { value: ['condos', 'coop'], label: 'Condos/Coops' },
]

export const homeType = [
  { value: 'single_family', label: 'Single Family House' },
  { value: 'condo_townhome_rowhome_coop', label: 'Townhome' },
  { value: 'townhomes', label: 'Townhome' },
  { value: 'duplex_triplex', label: 'Townhome' },
  { value: 'multi_family', label: 'Multi-family' },
  { value: 'condos', label: 'Condominium' },
  { value: 'coop', label: 'Coop' },
]