import {
  Dropdown,
  DynamicTextField,
  Form,
  TextArea,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";
import { TaskType, useBoards, useTasks } from "../../services";
import { useState } from "react";
import Loader from "../../../../components/loader";

function EditTask({
  closeModal,
  data,
}: {
  closeModal: () => void;
  data: TaskType;
}) {
  console.log(data);
  const [subtasksFields, setSubtasksFields] = useState<
    { id: string; value: string }[]
  >([]);
  const { editMutation } = useTasks();
  const { boardQuery } = useBoards();
  const board = boardQuery?.data;
  const columnsOption = board?.columns.map((column) => ({
    label: column.name,
    value: column.id,
  }));
  const subtaskFields =
    data.subtasks.map((subtask) => ({
      value: subtask.title,
      id: subtask.id!,
    })) || [];

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const columnID = formData.get("status") as string;
    const subtasks = subtasksFields;
    const existingSubtasksIDs = data.subtasks.map((subtask) => subtask.id);
    const filterNewSubtasks = subtasks
      .filter((subtask) => !existingSubtasksIDs.includes(subtask.id))
      .map((subtask) => ({ title: subtask.value }));
    const filterExistingSubtasks = subtasks
      .filter((subtask) => existingSubtasksIDs.includes(subtask.id))
      .map((subtask) => ({ title: subtask.value, id: subtask.id }));
    const combinedSubtasks = [...filterExistingSubtasks, ...filterNewSubtasks];
    const newTaskData: TaskType = {
      id: data.id,
      title,
      description,
      column_id: columnID,
      subtasks: combinedSubtasks,
    };
    editMutation.mutate(newTaskData, {
      onSuccess: closeModal,
    });
  };

  return editMutation.isLoading ? (
    <Loader />
  ) : (
    <Form title="Edit Task" onClose={closeModal} onSubmit={handleSubmit}>
      <>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Title</label>
          <TextField
            name="title"
            placeholder="e.g. Take a coffee break"
            isEmptyError={false}
            onChange={() => {}}
            focus
            defaultValue={data.title}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Description</label>
          <TextArea
            name="description"
            placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries a little."
            defaultValue={data.description}
          />
        </div>

        <DynamicTextField
          name="subtasks"
          label="Subtasks"
          buttonText={"+ Add New Subtask"}
          defaultFields={subtaskFields}
          getFields={(fields: { id: string; value: string }[]) => {
            setSubtasksFields(fields);
          }}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="">Status</label>
          <Dropdown
            options={columnsOption ? columnsOption : []}
            defaultSelected={
              columnsOption?.find(
                (column) => column.value === data.column_id
              ) || null
            }
            name="status"
            onSelect={() => {}}
          />
        </div>
        <PrimaryBtn type="submit">
          <span>Save Changes</span>
        </PrimaryBtn>
      </>
    </Form>
  );
}

export default EditTask;
