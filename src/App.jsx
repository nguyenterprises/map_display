import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import state from './store';
import Intro from './pages/intro/Intro';
import Main from './pages/main/Main';
import Movement from './pages/intro/Movement';
import useWidth from './ui/useWidth';
import { detectMob, isMobile } from './ui/mobileBrowser';

function App() {

  const snap = useSnapshot(state);
  const width = useWidth();
  const [useMobile, setUseMobile] = useState(false);

  useEffect(() => {
    (detectMob() === true || isMobile() === true) ? setUseMobile(true) : setUseMobile(false);
  },[width, snap.isMain]);

  

  return (
    <div className="App">
      {!snap.isMain ? 
        (!useMobile ? <Movement /> : <Intro />)
      :
        <Main />
      }
    </div>
  )
}

export default App
