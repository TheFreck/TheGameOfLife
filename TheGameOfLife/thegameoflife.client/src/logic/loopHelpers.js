import axios from "axios";

const lifeApi = axios.create({
    baseUrl: "https://localhosts/"
});

export default {
    calculateFrame: async (frame,grid,cb) => {
        let lifeMap = grid;
        await lifeApi.post("Life",lifeMap)
        .then(yup => {
            const next = frame+1;
            cb({
                frame:next,
                grid:yup.data
            });
        })
        .catch(nope => console.error("nope: ", nope));
    }
}