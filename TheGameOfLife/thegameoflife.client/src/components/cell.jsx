import react, { useCallback, useContext, useEffect, useState } from "react";
import LoopContext from "../contexts/loopContext";

export const Cell = ({life, gridId,x,y}) => {
    const {loopRef} = useContext(LoopContext);
    const [alive,setAlive] = useState(life);
    const [cellId,setCellId] = useState(0);

    useEffect(() => {
        if(gridId !== undefined && gridId !== 0){
            setCellId(gridId);
        }
        else return;
    },[]);

    const clickCell = () => {
        setAlive(!alive);
        loopRef.current.grid[y][x] = !loopRef.current.grid[y][x];
    }

    const CellCallback = useCallback(() => <div onClick={clickCell} style={{background: alive ? "black" : "white", width: "10px", height: "10px", border: "solid", borderWidth: "1px"}}></div>,[alive]);

    return <CellCallback />
}

export default Cell;