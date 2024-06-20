import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import Newslatter from "../Admin/Newslatter";
import ManageSlot from "../Trainer/ManageSlot";
import Profile from "../User/Profile";

const DashboardHome = () => {
    const {role} = useContext(AuthContext)

    if(role === "Admin"){
        return <Newslatter/>
    }
    if(role === "Trainer"){
        return <ManageSlot/>
    }
    if(role === "User"){
        return <Profile/>
    }
};

export default DashboardHome;