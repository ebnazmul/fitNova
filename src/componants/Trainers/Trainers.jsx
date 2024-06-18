import { useQuery } from "@tanstack/react-query";
import TrainerCard from "../../Cards/TrainerCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Loading from "../../Extra/Loading/Loading";


const Trainers = () => {

    const axiosPublic = useAxiosPublic()

    const {data: trainers=[], isLoading} = useQuery({
        queryKey: ["all-trainers-data"],
        queryFn: () => axiosPublic.get('/trainers') 
    })

    if(isLoading){
        return <Loading/>
    }

    
    return (
        <div className="max-w-screen-2xl mx-auto">
            <h2 className="text-2xl text-center font-semibold">All Trainers</h2>
            <div className="flex flex-wrap gap-2 my-4">
                {
                    trainers.data.map(item=><TrainerCard data={item} key={item._id}/>)
                }
                
            </div>
            
        </div>
    );
};

export default Trainers;