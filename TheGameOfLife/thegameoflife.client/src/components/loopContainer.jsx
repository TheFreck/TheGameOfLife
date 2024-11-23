import react, { useCallback, useContext, useEffect, useRef, useState } from "react";
import LoopContext from "../contexts/loopContext";
import LoopMechanism from "./loopMechanism";

export const LoopContainer = ({ appId }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [loopContainerId, setLoopContainerId] = useState(0);
    const [frameReset, setFrameReset] = useState(false);
    const [frame,setFrame] = useState(0);
    const loopRef = useRef();

    useEffect(() => {
        loopRef.current = {
            loopId: loopContainerId,
            loopFrame: 0,
            loopComplete: true,
            grid: [],
            intId: 0
        };
        if (appId !== undefined && appId !== 0) {
            setLoopContainerId(appId);
            let grid = [];
            for (let i = 0; i < 100; i++) {
                grid.push([]);
                for (let j = 0; j < 100; j++) {
                    grid[i].push(false);
                }
            }
            loopRef.current.grid = grid;
        }
        return () => setLoopContainerId(0);
    }, []);

    const LoopMechanismCallback = useCallback(() => {
        return <LoopMechanism isRunning={isRunning} loopContainerId={loopContainerId} />
    }, [isRunning, loopContainerId, frameReset]);

    useEffect(() => {
        if (loopRef.current.loopFrame === 0) {
            if (isRunning) {
                setIsRunning(false);
            }
            setFrameReset(!frameReset);
        }
    }, [loopRef.current]);

    return <div>
        <LoopContext.Provider
            value={{ loopRef,frame,setFrame }}
        >
            <button onClick={() => setIsRunning(!isRunning)}>{isRunning ? "Stop" : "Start"}</button>
            <LoopMechanismCallback />
        </LoopContext.Provider>
    </div>
}

export default LoopContainer;