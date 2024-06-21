import { TiMessage } from "react-icons/ti";


const ReviewCard = ({item}) => {

    
    return (
        <div className="bg-gray-300 p-10 rounded">
            <h2 className="font-semibold tracking-wide">{item.review}</h2>
            <p className="text-xs mt-2 flex gap-2 items-center"><TiMessage />{item.user}</p>
            
        </div>
    );
};

export default ReviewCard;