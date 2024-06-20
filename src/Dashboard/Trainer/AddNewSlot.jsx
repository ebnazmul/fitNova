import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Contexts/AuthContexts";
import Select from "react-select";
import toast from "react-hot-toast";

const AddNewSlot = () => {
  const { user, classes } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, control } = useForm();
  const [previousData, setPreviousData] = useState({});

  const dayOptions = [
    { value: "sun", label: "Sunday" },
    { value: "mon", label: "Monday" },
    { value: "tue", label: "Tuesday" },
    { value: "wed", label: "Wednesday" },
    { value: "thu", label: "Thursday" },
    { value: "fri", label: "Friday" },
    { value: "sat", label: "Saturday" },
  ];

  const classOptions = classes.data.map(item => ({ value: item["class-name"], label: item["class-name"] }))



  useEffect(() => {
    if (user.email) {
      axiosSecure
        .get(`/own-trainer-info/${user.email}`)
        .then((res) => setPreviousData(res.data))
        .catch((err) => (err));
    }
  }, [axiosSecure, user.email]);

  const onSubmit = (data) => {
    const info = {...data, trainerEmail: user.email, trainerName: user.displayName}
    axiosSecure.post('/add-slot', info)
    .then(res=>{
      if(res.data.acknowledged){
        toast.success("Slot added Successfully")
      }
    })
  };

  return (
    <div className="px-10 flex-1">
      <h2 className="text-2xl text-center my-6 font-semibold">Add New Slot</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap gap-2">
          <div>
            <p className="text-xl">Full Name:</p>
            <input
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
              defaultValue={user.displayName || ""}
              disabled
            />
          </div>
          <div>
            <p className="text-xl">Email:</p>
            <input
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
              defaultValue={user.email || ""}
              disabled
            />
          </div>
          <div>
            <p className="text-xl">Age:</p>
            <input
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
              defaultValue={previousData.age || ""}
              disabled
            />
          </div>
          <div>
            <p className="text-xl">Experiance:</p>
            <input
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-300"
              defaultValue={previousData.experiance || ""}
              disabled
            />
          </div>

          <div>
            <p className="text-xl">Slot Name:</p>
            <input
              {...register("slot-name")}
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
              placeholder="New slot name..."
              required
            />
          </div>

          {previousData.days && (
            <>
              <div>
                <p className="text-xl mb-2">Available Days a Week:</p>
                <Controller
                  name="days" // The field name in your form data
                  control={control} // The control object from useForm()
                  defaultValue={previousData.days} // Optional default value
                  render={({ field }) => (
                    <Select
                      {...field} // Spread the field props (value, onChange, etc.)
                      isMulti
                      options={dayOptions}
                    />
                  )}
                />
              </div>

              <div>
                <p className="text-xl mb-2 min-w-40">Class:</p>
                <Controller
                  name="class" // The field name in your form data
                  control={control} // The control object from useForm() // Optional default value
                  render={({ field }) => (
                    <Select
                      {...field} // Spread the field props (value, onChange, etc.)
                      options={classOptions}
                    />
                  )}
                />
              </div>
            </>
          )}

          <div>
            <p className="text-xl">Slot Time: (example: 1) in hour</p>
            <input
              {...register("slot-time")}
              type="text"
              className="px-2 py-2 outline-blue-400 mt-2 rounded w-full bg-gray-200"
              placeholder="Enter the slots time..."
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 py-2 w-full text-xl font-Bebas text-gray-300 rounded hover:bg-blue-500 duration-300 mt-4">
          Add Slot
        </button>
      </form>
    </div>
  );
};

export default AddNewSlot;
