import axios from "axios";

const fetchFound = async () => {
    try {
        const res = await axios.get("http://localhost:8000/found", { withCredentials: true })
        if(res.status === 200) {
            return res.data;
        }
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

const fetchLost = async () => {
    try {
        const res = await axios.get("http://localhost:8000/lost", { withCredentials: true })
        if(res.status === 200) {
            return res.data;
        }
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

export { fetchFound, fetchLost };
