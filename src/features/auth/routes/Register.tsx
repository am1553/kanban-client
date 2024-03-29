import { Form, TextField } from "../../../components/form-elements";
import { PrimaryBtn } from "../../../components/buttons";
import { useAuthServices } from "../services";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader";

function Register() {
  const { registerMutation } = useAuthServices();

  const handleSubmit = (formData: FormData) => {
    const first_name = formData.get("fname") as string;
    const last_name = formData.get("lname") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    registerMutation.mutate({ first_name, last_name, email, password });
  };
  return registerMutation.isLoading ? (
    <Loader />
  ) : (
    <Form
      title="Register"
      className={"text-center"}
      onClose={() => {}}
      onSubmit={handleSubmit}
    >
      <>
        <div className="flex flex-col gap-2">
          <TextField
            name={"fname"}
            placeholder={"First Name"}
            isEmptyError={false}
            onChange={() => {}}
            type={"text"}
          />
          <TextField
            name={"lname"}
            placeholder={"Last Name"}
            isEmptyError={false}
            onChange={() => {}}
            type={"text"}
          />
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
            <span>Register</span>
          </PrimaryBtn>
        </div>
        <Link to={"/auth"}>Login?</Link>
      </>
    </Form>
  );
}

export default Register;
