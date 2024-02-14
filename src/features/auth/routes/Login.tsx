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
          <button
            type="button"
            className="text-main-purple underline text-body-l"
            onClick={() => {
              const formData = new FormData();
              formData.append("email", "am.career11@gmail.com");
              formData.append("password", "test123");
              handleSubmit(formData);
            }}
          >
            Impersonate as Aryan
          </button>
          <Link to="/auth/register">Register?</Link>
        </>
      </Form>
    </>
  );
}

export default Login;
