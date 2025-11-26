import { useEffect, useState } from "react";

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
    };

    return (
        <div className="home-container">
            <div className="home-card">
                <h1>Welcome 👋</h1>

                {user && (
                    <p className="user-email">Logged in as: <strong>{user.email}</strong></p>
                )}

                <button onClick={handleLogout} className="logout-btn">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Home;
