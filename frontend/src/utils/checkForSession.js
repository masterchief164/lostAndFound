const checkLogin = (setUser) => {
    let tmp = localStorage.getItem("userDataLost");
    if (tmp != null) {
        tmp = JSON.parse(tmp);
        if (new Date(tmp.exp).getTime() > new Date().getTime()) {
            setUser(JSON.parse(localStorage.getItem("userDataLost")));
        } else {
            localStorage.removeItem("userDataLost");
        }
    }
}

export default checkLogin;
