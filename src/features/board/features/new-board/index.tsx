import React, { SetStateAction, useEffect, useState } from "react";
import {
  DynamicTextField,
  Form,
  TextField,
} from "../../../../components/form-elements";
import { PrimaryBtn } from "../../../../components/buttons";
import { useBoards } from "../..";

function NewBoard({
  setIsModal,
}: {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { createMutation } = useBoards();
  const handleSubmit = (formData: FormData) => {
    const name = formData.get("name") as string;
    const columns = formData.getAll("column-name") as string[];
    const data = { name, columns: columns.map((col) => ({ name: col })) };
    createMutation.mutate(data, { onSuccess: () => setIsModal(false) });
  };
  return (
    <Form
      title="Add New Board"
      onClose={() => setIsModal(false)}
      onSubmit={handleSubmit}
    >
      <>
        <div className="flex flex-col gap-2">
          <label htmlFor="">Board Name</label>
          <TextField
            name="name"
            placeholder="e.g. Web Design"
            isEmptyError={false}
            onChange={() => {}}
            focus
          />
        </div>
        <DynamicTextField
          label="Board Columns"
          buttonText={"+ Add New Column"}
          name="column-name"
        />
        <PrimaryBtn type="submit">
          <span>Create New Board</span>
        </PrimaryBtn>
      </>
    </Form>
  );
}

export default NewBoard;
