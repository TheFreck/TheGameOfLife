import axios from "axios";

export const getBaseURL = (cb) => {
    if(process.env.NODE_ENV === "development"){
        cb("https://localhost:7293");
    }
    else if(process.env.NODE_ENV === "production"){
        cb("");
    }
}

export const calculateFrame = async (frame,grid,cb) => {
    getBaseURL(async url => {
        const api = axios.create({
            baseURL: url
        });
        let lifeMap = grid;
        await api.post("Life",lifeMap)
        .then(yup => {
            const next = frame+1;
            cb({
                frame:next,
                grid:yup.data
            });
        })
        .catch(nope => console.error("nope: ", nope));
    })
}

export const calculateMultipleFrames = async (loopRef,count,cb) => {
    getBaseURL(async url => {
        const api = axios.create({
            baseURL: url
        });
        if(loopRef && loopRef.current && loopRef.current.data && loopRef.current.data.grids.length - loopRef.current.loopFrame < count){
            await api.post(`Life/${count}`,loopRef.current.data.grids[loopRef.current.data.grids.length-1])
            .then(yup => {
                for(var i=0; i<yup.data.length; i++){
                    loopRef.current.data.grids.push(yup.data[i]);
                }
            })
            .catch(nope => console.error(nope));
            cb({
                frame: loopRef.current.loopFrame+1,
                grid: loopRef.current.data.grids[loopRef.current.loopFrame]
            });
    
        }
        else{
            // console.log("not called: ", loopRef.current);
            cb({
                frame: loopRef.current.loopFrame+1,
                grid: loopRef.current.data.grids[loopRef.current.loopFrame]
            });
        }
    })
}

export default {
    calculateFrame,
    calculateMultipleFrames
};