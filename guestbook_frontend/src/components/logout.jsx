import { useEffect } from "react";

export const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("token");
        window.location = "/login";
    }, []);
    return null;
};

