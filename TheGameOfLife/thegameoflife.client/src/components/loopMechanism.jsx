import react, { useCallback, useContext, useEffect, useRef, useState } from "react";
import LoopContext from "../contexts/loopContext";
import loopHelpers from "../logic/loopHelpers";
import LoopBody from "./loopBody";
import LifeContainer from "./lifeContainer";

export const LoopMechanism = ({ isRunning, loopContainerId }) => {
    const { loopRef,setFrame } = useContext(LoopContext);
    const [mechanismId,setMechanismId] = useState(0);

    useEffect(() => {
        if(loopRef === undefined || loopContainerId === undefined || loopContainerId === 0) return;
        setMechanismId(loopContainerId);
        
            if (isRunning) {
                loopRef.current.intId = setInterval(march, 100, fr => {
                    setComplete(true, () => {
                        return;
                    });
                });
            }
            else {
                clearInterval(loopRef.current.intId);
            }
        return () => {
            clearInterval(loopRef?.current?.intId);
        }
    }, []);

    const updateFrame = async (val,cb) => {
        loopRef.current.loopFrame = val;
        setFrame(val);
        await cb(val);
    }

    const updateGrid = async (val,cb) => {
        loopRef.current.grid = val;
        await cb(loopRef.current.grid);
    }

    const setComplete = (val,cb) => {
        loopRef.current.loopComplete = val;
        cb();
    }

    const march = async (cb) => {
        if (loopRef && loopRef.current && loopRef.current.loopComplete !== undefined) {
            await setComplete(false, async val => {
                await loopHelpers.calculateFrame(loopRef.current.loopFrame,loopRef.current.grid, num => {
                    updateFrame(num.frame,fr => {
                        updateGrid(num.grid,gen => {
                            cb(gen);
                        })
                    });
                })
            });
        }
        else {
            // wait 
        }
    }



    return mechanismId !== 0 && <LifeContainer mechanismId={mechanismId} />
}

export default LoopMechanism;