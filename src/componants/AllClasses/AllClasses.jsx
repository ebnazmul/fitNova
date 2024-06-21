
import ClassCard from "./ClassCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    axiosPublic.get("/all-posts").then((res) => setClasses(res));
  }, [axiosPublic]);

  const handleSearch = (e) => {
    console.log(e.target.value);

    axiosPublic
      .get(`/all-posts/search?search=${e.target.value}`)
      .then((res) => setClasses(res));
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-2xl text-center my-4">All Classes</h2>
      <input
        onChange={handleSearch}
        placeholder="Search.."
        className="bg-gray-200 px-4 rounded py-2 outline-none my-4"
        type="text"
      />
      <div className="flex gap-4 flex-wrap">
        {classes.data?.map((item, i) => (
          <ClassCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
