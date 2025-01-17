import react, { useCallback, useContext, useEffect, useState } from "react";

export const Cell = ({loopRef,col,x,y}) => {
    const [alive,setAlive] = useState(col);
    const [cellId,setCellId] = useState(0);

    useEffect(() => {
        if(loopRef.current){
            setCellId(`(${x},${y})`);
            setAlive(loopRef.current.data.grid[y][x]);
        }
        else return;
    },[]);

    const clickCell = () => {
        setAlive(!alive);
        loopRef.current.data.grid[y][x] = !loopRef.current.data.grid[y][x];
    }

    const CellCallback = useCallback(() => <div onClick={clickCell} style={{background: alive ? "black" : "white", width: "10px", height: "10px", border: "solid", borderWidth: "1px"}}></div>,[alive]);

    return <CellCallback />
}

export default Cell;