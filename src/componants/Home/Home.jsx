

const Home = () => {
    return (
        <div className="mt-4 bg-gray-800 min-h-96">
            <div className="max-w-screen-2xl mx-auto py-20 relative">
            <div className="absolute z-20">
            <h1 className="text-gray-200 text-6xl font-bold tracking-wide font-Bebas bg-gray-400 bg-opacity-80 p-4 rounded">Train with the <br />best personal trainers</h1>
            <p className="text-gray-800 sm:text-gray-200 my-1">FitNova is the best place in the area to get top-notch training services!</p>
            <button className="bg-blue-600 py-2 w-full text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300">Book your class today!</button>
            </div>
            
            <img className="absolute w-80 right-4 top-10 z-10 rounded" src="/trainer.jpeg" alt="" />
            </div>
        </div>
    );
};

export default Home;