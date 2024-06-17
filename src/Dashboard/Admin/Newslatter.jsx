import { useQuery } from "@tanstack/react-query";
import Loading from "../../Extra/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Newslatter = () => {
  const axiosSecure = useAxiosSecure();
  const { data: newslatterData, isLoading } = useQuery({
    queryKey: ["newslatter-emails"],
    queryFn: () => axiosSecure.get("/newslatter"),
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="mt-10">
        <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-800 dark:bg-gray-50">
          <h2 className="mb-3 text-2xl font-semibold leading-tight">
            Newslatter Subscribers
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xl">
              <thead className="rounded-t-lg dark:bg-gray-300">
                <tr className="text-right">
                  <th title="Ranking" className="p-3 text-left">
                    #
                  </th>
                  <th title="Team name" className="p-3 text-left">
                    Email
                  </th>
                  <th title="Wins" className="p-3">
                    Subscribe Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {newslatterData?.data?.map((info, i) => (
                  <tr
                    key={info._id}
                    className="text-right border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-100">
                    <td className="px-3 py-2 text-left">
                      <span>{i + 1}</span>
                    </td>
                    <td className="px-3 py-2 text-left">
                      <span>{info.email}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span>{new Date(info.time).toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newslatter;
