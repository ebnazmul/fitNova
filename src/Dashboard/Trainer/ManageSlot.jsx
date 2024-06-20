import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import ManageSlotsCard from "../../Cards/ManageSlotsCard";


const ManageSlot = () => {
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    const {data: slots=[]} = useQuery({
        queryKey: ["slots-data"],
        queryFn: async() => {
            const res = await axiosSecure.get(`/slots/${user.email}`)
            return res.data
        }  
    })


    // console.log(slots);


    return (
        <div className="flex-1">
            <h2 className="text-2xl py-10">Manage Slots</h2>
            {
                slots.map((item, i)=><ManageSlotsCard data={item} key={i}/>)
            }
           
            
        </div>
    );
};

export default ManageSlot;