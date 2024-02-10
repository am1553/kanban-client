import {
  Dropdown,
  DynamicTextField,
  Form,
  TextArea,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";

function EditTask() {
  return (
    <Form title="Edit Task">
      <>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Title</label>
          <TextField
            name="title"
            placeholder="e.g. Take a coffee break"
            isEmptyError={false}
            onChange={() => {}}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Description</label>
          <TextArea
            name="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
          />
        </div>

        <DynamicTextField label="Subtasks" buttonText={"+ Add New Subtask"} />
        <div className="flex flex-col gap-2">
          <label htmlFor="">Status</label>
          <Dropdown
            options={[
              { label: "Todo", value: "todo" },
              { label: "Doing", value: "doing" },
              { label: "Done", value: "done" },
            ]}
            defaultSelected={{ label: "Todo", value: "todo" }}
            name="status"
            onSelect={() => {}}
          />
        </div>
        <PrimaryBtn>
          <span>Save Changes</span>
        </PrimaryBtn>
      </>
    </Form>
  );
}

export default EditTask;
