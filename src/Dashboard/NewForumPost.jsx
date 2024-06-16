import { useForm } from "react-hook-form";


const NewForumPost = () => {
    const {register, handleSubmit} = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }


    return (
        <div className="flex-1 py-10">
            <h2 className="text-2xl">Forum Post</h2>
            
        </div>
    );
};

export default NewForumPost;