import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContexts";
import Loading from "../../Extra/Loading/Loading";

const Profile = () => {
  const { user, userLoading } = useContext(AuthContext);

  console.log(user);

  if (userLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1">
      <div className="pt-40 flex flex-col items-center justify-center space-y-2">
        <img
          className="h-23"
          src={
            user.photoURL ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt=""
        />
        <h3 className="text-xl">Name: {user.displayName}</h3>
        <h3 className="text-xl">Email: {user.email}</h3>
        <h3 className="text-xl">
          Last Login at:{" "}
          {new Date(parseInt(user.metadata?.lastLoginAt)).toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default Profile;
