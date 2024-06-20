import { useQuery } from "@tanstack/react-query";
import ClassCard from "./ClassCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllClasses = () => {
  const axiosPublic = useAxiosPublic();

  const { data: classes = [] } = useQuery({
    queryKey: ["all-classes"],
    queryFn: () => axiosPublic.get("/all-posts"),
  });

  return (
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-2xl text-center my-4">All Classes</h2>
      <div className="flex gap-4 flex-wrap">
        {classes.data.map((item, i) => (
          <ClassCard key={i} data={item} />
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
