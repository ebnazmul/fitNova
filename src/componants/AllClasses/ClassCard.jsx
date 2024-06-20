

const ClassCard = ({data}) => {
    const {details, "class-name": className, imageURL} = data;

    return (
        <div className="w-56 h-72 bg-gray-300 rounded">
            <img src={imageURL} className="h-36 w-full bg-cover" alt="" />
            <div className="text-gray-800 p-2">
                <h3 className="tracking-wide text-xl truncate">{className}</h3>
                <p className="line-clamp-3 text-xs">{details}</p>
            </div>
        </div>
    );
};

export default ClassCard;