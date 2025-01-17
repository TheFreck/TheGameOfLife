import { useCallback, useEffect, useState } from 'react';
import './App.css';
import LoopContainer from './components/loopContainer';

function App() {
    const [appId,setAppId] = useState(0);

    useEffect(() => {
        if(appId === 0){
            init(id => {
                setAppId(id);
            })
        }
        else return () => console.log("app not ready");
    },[]);

    const init = (cb) => {
        let id = Math.floor(Math.random()*111);
        cb(id);
    }

    const LoopContainerCallback = useCallback(() => appId !== undefined && appId !== 0 && <LoopContainer appId={appId} />,[appId]);

    return <LoopContainerCallback />
}

export default App;