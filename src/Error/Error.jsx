import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="min-h-[60vh] w-full flex items-center justify-center">
            <div className="text-center border p-20 space-y-2">
                <h2 className="text-6xl font-Bebas">404!</h2>
                <p>Page not found!</p>
                <button className="px-2 py-1 bg-green-400 rounded"><Link to="/">Go Home</Link></button>
            </div>
            
        </div>
    );
};

export default Error;