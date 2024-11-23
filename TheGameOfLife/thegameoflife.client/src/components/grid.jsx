import react, { useCallback, useContext, useEffect, useState } from "react";
import Cell from "./cell";
import LoopContext from "../contexts/loopContext";

export const Grid = ({ lifeContainerId }) => {
    const {loopRef,frame} = useContext(LoopContext);
    const [gridId,setGridId] = useState(0);

    useEffect(() => {
        if(loopRef === undefined || loopRef.current === undefined || loopRef.current.grid.length === 0 || lifeContainerId === undefined || lifeContainerId === 0) return;
        setGridId(lifeContainerId);
    },[]);

    const GridCallback = useCallback(() => loopRef.current.grid.map((rows, i) => (
        <div key={i} style={{ display: "flex" }}>
            {
                rows.map((col, j) => (
                    <Cell key={j} x={j} y={i} life={col} gridId={gridId} />
                ))
            }
        </div>
    )));

    return <GridCallback />
}

export default Grid;