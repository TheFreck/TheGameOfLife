import react, { useCallback, useEffect, useRef, useState } from "react";
import LoopMechanism from "./loopMechanism";
import { Box, Button, Typography } from "@mui/material";

export const LoopContainer = ({ appId }) => {
    const [loopContainerId, setLoopContainerId] = useState(0);
    const [ready,setReady] = useState(false);
    const [gridWidth, setGridWidth] = useState(150);
    const [gridHeight,setGridHeight] = useState(60);
    const loopRef = useRef();

    useEffect(() => {
        if(appId !== 0 && !ready){
            setLoopContainerId(appId);
            init();
            setReady(true);
        }
        return () => {
            setLoopContainerId(0);
        }
    }, []);

    const startStop = () => {
        loopRef.current.isRunning = !loopRef.current.isRunning;
        setReady(!ready);
    }
    
    const init = () => {
        let grid = [];
        for (let i = 0; i < gridHeight; i++) {
            grid.push([]);
            for (let j = 0; j < gridWidth; j++) {
                grid[i].push(false);
            }
        }
        const data = {
            grid,
            grids: [grid]
        };
        loopRef.current = {
            loopId: appId,
            loopFrame: 0,
            intId: 0,
            isRunning: false,
            isComplete: true,
            data
        };
        console.log("init: ", loopRef.current);
        setReady(!ready);
    }

    const LoopMechanismCallback = useCallback(() => loopRef && loopRef.current && loopRef.current.data !== undefined && <LoopMechanism data={loopRef.current.data} loopRef={loopRef} />, [ready, loopContainerId]);

    useEffect(() => {
        if (loopRef.current.loopFrame === 0) {
            if (loopRef.current.isRunning) {
                setIsRunning(false);
            }
        }
    }, [loopRef.current]);

    return <Box>
        <Typography>
            Loop Container
        </Typography>
        <Button
            onClick={startStop}
        >
            {loopRef?.current?.isRunning ? "Stop" : "Start"}
        </Button>
        <Button
            onClick={init}
        >
            Reset
        </Button>
        <LoopMechanismCallback />
    </Box>
}

export default LoopContainer;