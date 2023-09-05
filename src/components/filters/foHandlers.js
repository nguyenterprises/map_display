export const filtersButtonHandler = () => {
    document.getElementById('filters-row').style.visibility = 'visible';
    document.getElementById('filters-button').style.display = 'none';
    document.getElementById('filters-close').style.display = 'block';

}
export const applyButtonHandler = () => {
    document.getElementById('filters-row').style.visibility = 'hidden';
    document.getElementById('filters-button').style.display = 'block';
    document.getElementById('filters-close').style.display = 'none';
}
export const closeButtonHandler = () => {
    document.getElementById('filters-row').style.visibility = 'hidden';
    document.getElementById('filters-button').style.display = 'block';
    document.getElementById('filters-close').style.display = 'none';
}