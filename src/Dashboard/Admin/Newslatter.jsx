import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Newslatter = () => {

  const { data: newslatterData } = useQuery({
    queryKey: ["newslatter-emails"],
    queryFn: () => axios.get("http://localhost:5000/newslatter"),
    refetchOnWindowFocus: false
  });

  console.log(newslatterData.data);

  return <div>From newsLatter</div>;
};

export default Newslatter;
