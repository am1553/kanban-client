import {
  DynamicTextField,
  Form,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";
import uuid from "react-uuid";
function EditBoard() {
  return (
    <Form title="Edit Board">
      <>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Board Name</label>
          <TextField
            name="name"
            placeholder="e.g. Web Design"
            isEmptyError={false}
            onChange={() => {}}
            defaultValue="Platform Launch"
          />
        </div>
        <DynamicTextField
          label="Board Columns"
          buttonText={"+ Add New Column"}
          defaultFields={[
            { value: "Todo", id: uuid() },
            { value: "Doing", id: uuid() },
            { value: "Done", id: uuid() },
          ]}
        />
        <PrimaryBtn>
          <span>Save Changes</span>
        </PrimaryBtn>
      </>
    </Form>
  );
}

export default EditBoard;
