import react, { useEffect, useState } from "react";
import LifeGrid from "./LifeGrid";

export const LifeContainer = ({mechanismId}) => {
    const [lifeContainerId, setLifeContainerId] = useState(0);

    useEffect(() => {
        if(mechanismId !== undefined && mechanismId !== 0){
            setLifeContainerId(mechanismId);
        }
        else return;
    },[]);

    return <div>
        {lifeContainerId !== undefined && lifeContainerId !== 0 && <lifeGrid lifeContainerId={lifeContainerId} />}
    </div>
}

export default LifeContainer;