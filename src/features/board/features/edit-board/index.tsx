import {
  DynamicTextField,
  Form,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";
import { useBoards } from "../..";
import { useState } from "react";
function EditBoard({ closeModal }: { closeModal: () => void }) {
  const [columnFields, setColumnFields] = useState<
    {
      value: string;
      id: string;
    }[]
  >([]);
  const { boardQuery, updateMutation } = useBoards();
  const board = boardQuery?.data;
  const columnsOption = board?.columns.map((column) => ({
    value: column.name,
    id: column.id,
  }));
  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const columns = columnFields.map((column) => ({
      name: column.value,
      id: column.id,
    }));
    const newData = { name, columns, id: board!.id };
    updateMutation.mutate(newData);
    closeModal();
  };

  return (
    <Form title="Edit Board" onClose={closeModal} onSubmit={handleSubmit}>
      <>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Board Name</label>
          <TextField
            name="name"
            placeholder="e.g. Web Design"
            isEmptyError={false}
            onChange={() => {}}
            defaultValue={board?.name || undefined}
            focus={false}
          />
        </div>
        <DynamicTextField
          label="Board Columns"
          buttonText={"+ Add New Column"}
          defaultFields={columnsOption}
          name="column-name"
          getFields={(fields) => setColumnFields(fields)}
        />
        <PrimaryBtn type="submit">
          <span>Save Changes</span>
        </PrimaryBtn>
      </>
    </Form>
  );
}

export default EditBoard;
