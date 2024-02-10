import React from "react";
import {
  Dropdown,
  DynamicTextField,
  Form,
  TextArea,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";
import { Modal } from "../../../../components/portal";
import { useNavigate } from "react-router-dom";

function NewTask() {
  const navigate = useNavigate();

  const handleModalClose = () => navigate(-1);

  return (
    <Modal>
      <Form title="Add New Task" onClose={handleModalClose}>
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
            <span>Create Task</span>
          </PrimaryBtn>
        </>
      </Form>
    </Modal>
  );
}

export default NewTask;
