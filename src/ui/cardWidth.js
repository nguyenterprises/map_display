export const cardWidth = (width) => {
    let dir;
    switch(true) {
        case (width >= 1007):
        dir = 355;
        break;
        case (width < 1007 && width >= 580):
        dir = width * .475;
        break;
        case (width < 580):
        dir = width * .95;
        break;
        default:
        dir = 355;
    }
    return dir
}