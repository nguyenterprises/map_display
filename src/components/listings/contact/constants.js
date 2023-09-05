

export const contactMeMessage = (address) => {
  return (
    `I am interested in ${address}. Please contact me at your earliest convenience. Thank you.`
  )
}
export const tourMessage = (address, timeDisplay) => {
  return (
    `I'd like to take a look at ${address}. Please let me know if ${timeDisplay} works for you. Thank you.`
  )
}

export const timeConstants = [
    { value: {hour: 9, minute: 0}, label: '9:00 am'},
    { value: {hour: 9, minute: 30}, label: '9:30 am'},
    { value: {hour: 10, minute: 0}, label: '10:00 am'},
    { value: {hour: 10, minute: 30}, label: '10:30 am'},
    { value: {hour: 11, minute: 0}, label: '11:00 am'},
    { value: {hour: 11, minute: 30}, label: '11:30 am'},
    { value: {hour: 12, minute: 0}, label: '12:00 pm'},
    { value: {hour: 12, minute: 30}, label: '12:30 pm'},
    { value: {hour: 13, minute: 0}, label: '1:00 pm'},
    { value: {hour: 13, minute: 30}, label: '1:30 pm'},
    { value: {hour: 14, minute: 0}, label: '2:00 pm'},
    { value: {hour: 14, minute: 30}, label: '2:30 pm'},
    { value: {hour: 15, minute: 0}, label: '3:00 pm'},
    { value: {hour: 15, minute: 30}, label: '3:30 pm'},
    { value: {hour: 16, minute: 0}, label: '4:00 pm'},
    { value: {hour: 16, minute: 30}, label: '4:30 pm'},
    { value: {hour: 17, minute: 0}, label: '5:00 pm'},
    { value: {hour: 17, minute: 30}, label: '5:30 pm'},
    { value: {hour: 18, minute: 0}, label: '6:00 pm'},
    { value: {hour: 18, minute: 30}, label: '6:30 pm'},
    { value: {hour: 19, minute: 0}, label: '7:00 pm'},
    { value: {hour: 19, minute: 30}, label: '7:30 pm'},
    { value: {hour: 20, minute: 0}, label: '8:00 pm'},
    { value: {hour: 20, minute: 30}, label: '8:30 pm'},
    { value: {hour: 21, minute: 0}, label: '9:00 pm'},
    { value: {hour: 21, minute: 30}, label: '9:30 pm'},
]
