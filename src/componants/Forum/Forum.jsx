import { useQuery } from "@tanstack/react-query";
import ForumPostCard from "../../Cards/ForumPostCard";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Forum = () => {
  const axiosPublic = useAxiosPublic();
  const { data = [], refetch } = useQuery({
    queryKey: ["post-data"],
    queryFn: () => axiosPublic.get("/forum-posts"),
  });

//   console.log(data.data);


  return (
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center">Forum Posts</h2>
      {
        data?.data?.map((item, i)=><ForumPostCard refetchForumData={refetch} key={i} item={item} />)
      }
      
      
    </div>
  );
};

export default Forum;
