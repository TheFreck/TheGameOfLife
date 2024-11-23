import react, { useEffect, useState } from "react";
import LifeContainer from "./lifeContainer";

export const LoopBody = ({mechanismId}) => {
    const [loopBodyId,setLoopBodyId] = useState(0);

    useEffect(() => {
        if(mechanismId !== undefined && mechanismId !== 0){
            setLoopBodyId(mechanismId);
        }
    },[]);

    return loopBodyId !== undefined && loopBodyId !== 0 && <LifeContainer loopBodyId={loopBodyId} />
}

export default LoopBody;