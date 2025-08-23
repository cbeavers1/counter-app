import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard() {
    const auth = getAuth();
    const user = auth.currentUser;
    const navigate = useNavigate();
    const API_URL = "http://localhost:8080";
    const [clickCount, setClickCount] = useState(0);

    useEffect(() => {
        const fetchClicks = async () => {
            const user = auth.currentUser;
            if (!user) return;

            const idToken = await user.getIdToken();

            try {
                const response = await fetch(`${API_URL}/api/clicks`, {
                    headers: { "Authorization": `Bearer ${idToken}` },
                });

                const data = await response.json();
                 setClickCount(data.clicks);
            } catch (err) {
                console.error("Error fetching click count:", err);
            }
        };

        fetchClicks();
    }, [auth]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User logged out successfully");
            navigate("/login");
        } catch (error) {
        console.error("Error logging out:", error);
        }
    }

    const handleClick = async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user) return;
        
        const idToken = await user.getIdToken();
        try {
            const response = await fetch(`${API_URL}/api/clicks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`,
                },
            });

            await fetch(`${API_URL}/api/clicks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                },
            }); 
            const data = await response.json();
            console.log("Before", clickCount, "After", data)
            setClickCount(data.count);

       } catch (error) {
            console.error("Error updating click count:", error);
       }
    }
    
    return (
        <div>
            <button onClick={handleClick}>Current button count: {clickCount}</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard;