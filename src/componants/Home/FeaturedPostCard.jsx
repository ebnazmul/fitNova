

const FeaturedPostCard = ({data}) => {
    
    const {imageURL, "class-name": className, details} = data

    return (
        <div className="w-80 py-4 bg-gray-600">
            <img className="w-80 h-40 bg-cover" src={imageURL} alt="" />
            <div className="p-2 text-gray-200">
                <h2 className="text-xl">{className}</h2>
                <p className="text-xs line-clamp-2">{details}</p>
            </div>
        </div>
    );
};

export default FeaturedPostCard;