import { ColorRing } from "react-loader-spinner";
import { PrimaryBtn } from "../../../components/buttons";
import { Form, TextField } from "../../../components/form-elements";
import { useAuthServices } from "../services";
import { Link } from "react-router-dom";

function Login() {
  const { loginMutation } = useAuthServices();

  const handleSubmit = (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    loginMutation.mutate({ email, password });
  };
  return loginMutation.isLoading ? (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperClass="color-ring-wrapper"
      colors={["#635FC7", "#A8A4FF", "#EA5555", "#A8A4FF50", "#FF9898"]}
    />
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
          <Link to="/register">Register?</Link>
        </>
      </Form>
    </>
  );
}

export default Login;
