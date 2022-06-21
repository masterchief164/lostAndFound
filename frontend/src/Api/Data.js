import axios from "axios";

const fetchFound = async () => {
    try {
        const res = await axios.get("http://localhost:8000/found", { withCredentials: true });
        if (res.status === 200) {
            return res.data;
        }
    } catch (err) {
        console.log(err);
        return [];
    }
};

const fetchLost = async () => {
    try {
        const res = await axios.get("http://localhost:8000/lost", { withCredentials: true });
        if (res.status === 200) {
            return res.data;
        }
    } catch (err) {
        console.log(err);
        return [];
    }
};

const sendAuthorizationCode = async (code, setUser) => {
    try {
        const res = await axios.post("http://localhost:8000/auth/googleLogin", { tokenId: code }, { withCredentials: true });
        setUser(res.data.userData);
    } catch (err) {
        console.log(err);
    }
};

const logout = async (setUser) => {
    await axios.get("http://localhost:8000/auth/logout", { withCredentials: true })
        .then((response) => {
            if (response.status === 200) {
                console.log("logged out");
                localStorage.removeItem("userDataLost");
                setUser(null);
            }
        });
};

export { fetchFound, fetchLost, sendAuthorizationCode, logout };
