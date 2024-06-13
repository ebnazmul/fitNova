import { Outlet } from "react-router-dom";



const DashboardLayout = () => {
    return (
        <div className="flex">
            <div className="bg-gray-600 min-h-[100vh] w-fit text-gray-200">
                <h2 className="text-2xl text-center mt-2">FitNova</h2>
                <ul className="*:px-10 *:py-2 *:border text-xl pt-10 pl-10 space-y-2 *:rounded">
                    <li>Newslatter</li>
                    <li>All Trainers</li>
                    <li>Applied Trainer</li>
                    <li>Balance</li>
                    <li>Add new Class</li>
                </ul>
            </div>
            <Outlet/>
        </div>
    );
};

export default DashboardLayout;