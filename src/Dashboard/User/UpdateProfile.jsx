
const UpdateProfile = () => {
    return (
        <div className="flex-1 p-10">
            <h1 className="text-2xl">Update Profile</h1>
            <form className="mt-20">
                <div className="mb-4">
                    <h4>Name:</h4>
                    <input type="text" className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200 max-w-56" />
                </div>
                <div>
                    <h4>Profile Picture :</h4>
                    <input type="text" className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200 max-w-56" />
                </div>
                <button
          type="submit"
          className="bg-blue-600 py-2 w-full text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300 mt-4 max-w-56">
          Update Profile
        </button>
            </form>

                    
        </div>
    );
};

export default UpdateProfile;