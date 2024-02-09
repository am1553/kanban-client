import React from "react";
import {
  DynamicTextField,
  Form,
  TextField,
} from "../../../components/form-elements";
import { PrimaryBtn } from "../../../components/buttons";

function Board() {
  return (
    <div>
      <Form title="Add New Board">
        <>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Board Name</label>
            <TextField
              name="name"
              placeholder="e.g. Web Design"
              isEmptyError={false}
              onChange={() => {}}
            />
          </div>
          <DynamicTextField
            label="Board Columns"
            buttonText={"+ Add New Column"}
          />
          <PrimaryBtn>
            <span>Create New Board</span>
          </PrimaryBtn>
        </>
      </Form>
    </div>
  );
}

export default Board;
