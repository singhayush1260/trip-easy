import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate, Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      console.log("User signed in");
      showToast({ message: "Sign In Successful", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("sign in data", data);
    mutation.mutate(data);
  });

  return (
    <form className="flex flex-col gap-5 px-3" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold">Sign In</h2>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          placeholder="doe@john.com"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("email", { required: "This field is required." })}
        />
        {errors.email && (
          <span className="text-red-500 font-medium">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          placeholder="**********"
          className="border rounded w-full py-2 px-2 font-normal"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 font-medium">
            {errors.password.message}
          </span>
        )}
      </label>
      <span className="flex items-center justify-between">
        <span className="text-sm">
          Not registered? <Link to="/register" className="underline"> Create an account here </Link>
        </span>
        <button
          type="submit"
          className="bg-blue-600 text-xl text-white px-2 py-1 font-semibold rounded-sm hover:bg-blue-500"
        >
          Sign In
        </button>
      </span>
    </form>
  );
};
export default SignIn;
