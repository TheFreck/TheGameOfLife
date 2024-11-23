import { useEffect, useState } from 'react';
import './App.css';
import Cell from './components/cell';
import Grid from './components/grid';
import LifeContainer from './components/lifeContainer';
import LoopContainer from './components/loopContainer';
import axios from "axios";

function App() {
    const [appId,setAppId] = useState(0);

    useEffect(() => {
        setAppId(Math.floor(Math.random()*111));
    },[]);

    return appId !== undefined && appId !== 0 && <LoopContainer appId={appId} />
}

export default App;