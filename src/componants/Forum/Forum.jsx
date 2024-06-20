import ForumPostCard from "../../Cards/ForumPostCard";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";

const Forum = () => {

  const {refetchForumData, forumPosts} = useContext(AuthContext)
  

//   (data.data);


  return (
    <div className="max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-center">Forum Posts</h2>
      {
        forumPosts?.data?.map((item, i)=><ForumPostCard refetchForumData={refetchForumData} key={i} item={item} />)
      }
      
      
    </div>
  );
};

export default Forum;
