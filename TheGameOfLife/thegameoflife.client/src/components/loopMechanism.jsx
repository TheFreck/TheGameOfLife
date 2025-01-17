import react, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {calculateFrame,calculateMultipleFrames} from "../logic/loopHelpers";
import Cell from "./Cell";

export const LoopMechanism = ({ loopRef,data }) => {
    const [frame,setFrame] = useState(0);
    const [genCount,setGenCount] = useState(50);
    const [frameInterval,setFrameInterval] = useState(250);

    useEffect(() => {
        if(loopRef?.current?.loopId !== 0 && loopRef?.current?.loopFrame !== undefined){
            loopRef.current.data = data;
            setFrame(loopRef.current.loopFrame);
            if(loopRef?.current?.isRunning){
                loopRef.current.intId = setInterval(march,frameInterval,cb => {
                    loopRef.current.loopFrame = cb.frame;
                    loopRef.current.data.grid = cb.grid;
                    loopRef.current.isComplete = cb.continue;
                    setFrame(cb.frame);
                    if(!cb.continue) clearInterval(loopRef?.current?.intId);
                });
            }
        }

        return () => clearInterval(loopRef?.current?.intId);
    }, []);

    const march = async (cb) => {
        if(loopRef && loopRef.current && loopRef.current.intId !== 0 && loopRef.current.isComplete){
            loopRef.current.isComplete = false;
            loopRef.current.data = data;
            calculateMultipleFrames(loopRef,genCount,loop => {
                if(loopRef.current.isRunning) loop.continue = true;
                cb(loop);
            })
        }
    }

    const LoopBodyCallback = useCallback(() => loopRef.current.data.grid.map((rows, i) => (
        <div key={i} style={{ display: "flex" }}>
            {
                // console.log(`row[${i}]`, rows)
            }
            {
                rows.map((col, j) => (
                    <Cell key={j} x={j} y={i} loopRef={loopRef} col={col}/>
                ))
            }
        </div>)),[frame]);

    return <LoopBodyCallback />
}

export default LoopMechanism;