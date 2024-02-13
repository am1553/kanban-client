import {
  Dropdown,
  DynamicTextField,
  Form,
  TextArea,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";
import { useTasks, useBoards, TaskType } from "../../services";

function NewTask({ closeModal }: { closeModal: () => void }) {
  const { boardQuery } = useBoards();
  const { createMutation } = useTasks();
  const board = boardQuery?.data;
  const columnsOption = board?.columns.map((column) => ({
    label: column.name,
    value: column.id,
  }));
  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const subtasksTextArr = formData.getAll("subtasks") as string[];
    const subtasks = subtasksTextArr.map((subtask) => ({ title: subtask }));
    const columnID = formData.get("status") as string;
    const data: TaskType = {
      title,
      description,
      column_id: columnID,
      subtasks,
      board_id: board!.id,
    };
    createMutation.mutate(data, { onSuccess: closeModal });
  };

  return (
    <Form title="Add New Task" onClose={closeModal} onSubmit={handleSubmit}>
      <>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Title</label>
          <TextField
            name="title"
            placeholder="e.g. Take a coffee break"
            isEmptyError={false}
            onChange={() => {}}
            focus={true}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Description</label>
          <TextArea
            name="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
          />
        </div>

        <DynamicTextField
          label="Subtasks"
          buttonText={"+ Add New Subtask"}
          name={"subtasks"}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="">Status</label>
          <Dropdown
            options={columnsOption || []}
            defaultSelected={columnsOption ? columnsOption[0] : null}
            name="status"
            onSelect={() => {}}
          />
        </div>
        <PrimaryBtn type="submit">
          <span>Create Task</span>
        </PrimaryBtn>
      </>
    </Form>
  );
}

export default NewTask;
