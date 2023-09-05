export const mapWidth = (width) => {
    let dir;
    switch(true) {
        case (width >= 1280):
        dir = width - 765;
        break;
        case (width < 1280 && width >= 1007):
        dir = width - 400;
        break;
        case (width < 1007):
        dir = width;
        break;
        default:
        dir = width - 765;
    }
    return dir
}