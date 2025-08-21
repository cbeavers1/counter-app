import { count } from "firebase/firestore";

function Dashboard() {
    return (
        <div>
            <button>Current button count: {count}</button>
        </div>
    )
}

export default Dashboard;