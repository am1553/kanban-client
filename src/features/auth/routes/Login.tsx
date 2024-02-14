import { PrimaryBtn } from "../../../components/buttons";
import { Form, TextField } from "../../../components/form-elements";
import { useAuthServices } from "../services";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader";

function Login() {
  const { loginMutation } = useAuthServices();

  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({ email, password });
  };
  return loginMutation.isLoading ? (
    <Loader />
  ) : (
    <>
      <Form
        title="Login"
        className={"text-center"}
        onClose={() => {}}
        onSubmit={handleSubmit}
      >
        <>
          <div className="flex flex-col gap-2">
            <TextField
              name={"email"}
              placeholder={"Email"}
              isEmptyError={false}
              onChange={() => {}}
              type={"email"}
            />
            <TextField
              name={"password"}
              placeholder={"Password"}
              isEmptyError={false}
              onChange={() => {}}
              type={"password"}
            />
          </div>
          <div className="max-w-xs mx-auto w-full">
            <PrimaryBtn size={"medium"} type="submit">
              <span>Login</span>
            </PrimaryBtn>
          </div>
          <Link to="/auth/register">Register?</Link>
        </>
      </Form>
    </>
  );
}

export default Login;
