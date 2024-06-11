import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";


const Register = () => {

    const {register} = useForm()

    return (
        <div className="max-w-screen-2xl mx-auto bg-gray-200 mt-10 rounded p-10">
          <div className="w-fit mx-auto">
            <h3 className="text-xl md:text-3xl text-center mb-4">Register</h3>
            <button className="px-2 py-1 bg-blue-600 rounded text-white flex gap-2 items-center text-xl">Continue with Google <FaGoogle /></button>
            <p className="text-center">or</p>
            <div>
                <form>
                    <div>
                        <h4>Full Name:</h4>
                        <input className="px-2 py-1 outline-blue-400 mt-2 rounded" type="text" placeholder="Enter your full name..." />
                    </div>
                </form>
            </div>
          </div>
        </div>
    );
};

export default Register;