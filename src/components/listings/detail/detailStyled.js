export const detailStyled = (width, bounds, currentPic) => {
  return {
      dcStyles: {
        position: 'relative',
        width: width < 1024 ? '100%' : width > 1400 ? '1250px' : `${width *.85}px`,
        height: '100%',
        zIndex: '1',
        display: 'flex',
        alignItems: width < 768 ? 'center' : "",
        flexDirection: width < 768 ? 'column' : 'row',
      },
      dcInfo: {
        width: width < 768 ? '98%' : '500px',
        padding: '0 1em',
        backgroundColor: '#F9F9F9',
        overflowY: 'auto'
      },
      track: {
        backgroundColor: '#F9F9F9',
        overflowX: 'hidden',
        position: 'relative',
      },
      slider: {
        display: width < 768 ? 'flex' : 'block',
        transition: 'transform 1s ease-in-out',
        transform: `translateX(-${bounds.width * currentPic}px)`
      },
      dciTop: {
        width: `${bounds.width - 500}px`,
        display: width < 768 ? 'none' : 'block',
      },
      dciBottom: {
        display: width > 900 || width < 768 ? 'flex' : 'block',
        justifyContent: 'space-between',
        transform: width > 900 ? 'translateY(-1.5px)' : "",
        gap: width < 768 ? '' : '4px'
      },
      dciBImages: {
        width: width < 768 ? `${bounds.width}px` : width > 900 ? `${((bounds.width - 500) / 2) - 2.5}px` : `${bounds.width - 500}px`
      },
      cbStyles: {
        position: 'absolute',
        top:  width > 1023 ? '20px' : '0',
        left: width > 1023 ? `${bounds.right + 10}px` : `${bounds.right - 60}px`,
        zIndex: '1',
      },
      nextButtonStyles: {
        fontSize: '3rem',
        color: '#F9F9F9',
        backgroundColor: 'rgba(0,0,0,.3)',
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: '5px',
      },
      prevButtonStyles: {
        fontSize: '3rem',
        color: '#F9F9F9',
        backgroundColor: 'rgba(0,0,0,.3)',
        position: 'absolute',
        left: '0',
        top: '50%',
        transform: 'translateY(-50%) rotate(180deg)',
        borderRadius: '5px',
      },
      imagesLargeStyles: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, .9)',
        zIndex: '2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3px',
        overflowY: 'auto'
      },
      iLImageStyles: {
        width: `${bounds.width}px`,
      }
  }
}