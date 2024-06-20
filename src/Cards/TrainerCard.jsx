
import { FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";


const TrainerCard = ({data}) => {

    // (data);

    return (
        <Link to={`/trainer/${data._id}`}>
        <div className="w-60 h-48 bg-gray-200 flex flex-col justify-center items-center">
            <img className="h-12 w-12 rounded-full" src={data.photoURL} alt="" />
            <h2 className="text-xl">{data.name}</h2>
            <div className="text-sm text-center">{data.experiance} years experiance and expertice of {data.skills[0].label}!</div>
            <div className="flex gap-2 py-2"><FaTwitter/><FaFacebook/><FaGithub/></div>
        </div></Link>
    );
};

export default TrainerCard;