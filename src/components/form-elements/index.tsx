import React, { FormEvent } from "react";
import { Check, ChevronUp, ChevronDown } from "../../assets";
import { SecondaryBtn } from "../buttons";
import { Close } from "@mui/icons-material";
import uuid from "react-uuid";
import { useOnClickOutside, useTheme } from "../../hooks";
interface CheckboxProps {
  label: string;
  isChecked?: boolean;
  name: string;
  onChange: (checked: boolean) => void;
}

interface TextFieldProps {
  name: string;
  onChange: (value: string) => void;
  placeholder: string;
  isEmptyError: boolean;
  defaultValue?: string;
  type?: "text" | "email" | "password";
}

type Option = { label: string; value: string };

interface DropdownProps {
  options: Option[];
  defaultSelected: Option;
  onSelect: (value: string) => void;
  name: string;
}

type Field = { value: string; id: string };

export const Checkbox = ({
  label,
  isChecked = false,
  name,
  onChange,
}: CheckboxProps) => {
  const [isCheck, setIsCheck] = React.useState<boolean>(isChecked);

  const handleCheck = () => {
    const newCheckedState = !isCheck;
    setIsCheck(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <div className="flex gap-2 items-center relative">
      <input
        type="checkbox"
        checked={isCheck}
        name={name}
        className="absolute -z-10 pointer-events-none opacity-0"
        onChange={() => {}}
      />
      <button
        type="button"
        className={`h-4 w-4 rounded-sm flex items-center justify-center ${
          isCheck
            ? "bg-main-purple"
            : "bg-white bg-opacity-0 border border-medium-grey border-opacity-25"
        }`}
        onClick={handleCheck}
      >
        {isCheck && <img src={Check} alt="check icon" />}
      </button>
      <label htmlFor="">{label}</label>
    </div>
  );
};

export const TextField = ({
  name,
  placeholder,
  onChange,
  isEmptyError = false,
  defaultValue,
  type = "text",
}: TextFieldProps) => {
  const [isError, setIsError] = React.useState<boolean>(isEmptyError);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsError(true);
    } else {
      setIsError(false);
    }
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={`h-10 w-full rounded-md px-4 border ${
          isError ? "border-red" : "border-medium-grey border-opacity-25"
        }`}
        defaultValue={defaultValue}
      />
      {isError && (
        <span className="text-red absolute right-4 top-2/4 -translate-y-2/4">
          Can't be empty
        </span>
      )}
    </div>
  );
};

export const TextArea = ({
  name,
  placeholder,
}: {
  name: string;
  placeholder: string;
}) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      id=""
      className="h-48 w-full p-4 border border-medium-grey border-opacity-25"
    />
  );
};

export const Dropdown = ({
  options,
  onSelect,
  defaultSelected,
  name,
}: DropdownProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState(defaultSelected);
  const statusRef = React.useRef<HTMLUListElement>(null);
  const handleOpen = () => setOpen((prev) => !prev);
  const handleSelect = (option: Option) => {
    onSelect(option.value);
    setSelected(option);
  };
  useOnClickOutside(statusRef, () => setOpen(false));
  return (
    <div className="relative">
      <select
        name={name}
        id=""
        value={selected.value}
        onChange={() => {}}
        className="absolute -z-10 pointer-events-none opacity-0"
      >
        {options.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        className="h-10 w-full rounded-md flex items-center justify-between px-4 border"
        onClick={handleOpen}
        type="button"
      >
        <span>{selected.label}</span>
        {open ? (
          <img src={ChevronUp} alt="" />
        ) : (
          <img src={ChevronDown} alt="" />
        )}
      </button>
      <ul
        className={`absolute left-0 right-0 ${
          open ? "h-fit py-4" : "h-0"
        } overflow-hidden z-20 bg-white`}
        ref={statusRef}
      >
        {options.map((option: Option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option)}
            className="cursor-pointer h-10 flex items-center px-4"
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const DynamicTextField = ({
  buttonText,
  label,
  defaultFields = [],
}: {
  buttonText: string;
  label: string;
  defaultFields?: Field[];
}) => {
  const [fields, setFields] = React.useState<Field[]>(defaultFields || []);

  const handleAdd = () => {
    const newFields = [...fields, { value: "", id: uuid() }];
    setFields(newFields);
  };

  const handleRemove = (id: string) => {
    const newFields = fields.filter((field) => field.id !== id);
    setFields(newFields);
  };

  const handleChange = (id: string, value: string) => {
    const indexOfChange = fields.findIndex((field) => field.id === id);
    const newValues = fields;
    newValues[indexOfChange].value = value;
    setFields(newValues);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="">{label}</label>
      {fields.map((field: { value: string; id: string }) => {
        return (
          <div className="flex gap-2 items-center" key={field.id}>
            <div className="flex-1">
              <TextField
                name="column-name"
                placeholder=""
                onChange={(value) => handleChange(field.id, value)}
                isEmptyError={false}
                defaultValue={field.value}
              />
            </div>
            <button type="button" onClick={() => handleRemove(field.id)}>
              <Close />
            </button>
          </div>
        );
      })}
      <SecondaryBtn type="button" onClick={handleAdd}>
        <span>{buttonText}</span>
      </SecondaryBtn>
    </div>
  );
};

export const Form = ({
  title,
  children,
  onClose,
  className,
  onSubmit,
}: {
  title: string;
  children: JSX.Element;
  onClose: () => void;
  className: string;
  onSubmit: (formData: FormData) => void;
}) => {
  const { theme } = useTheme();
  const ref = React.useRef<HTMLFormElement>(null);
  useOnClickOutside(ref, onClose);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(ref.current!);
    onSubmit(formData);
  };
  return (
    <form
      action=""
      className={`p-4 flex flex-col gap-6 max-w-[480px] w-full mx-4 rounded-md shadow-md ${
        theme === "dark" ? "bg-dark-grey" : "bg-white"
      } ${className}`}
      ref={ref}
      onSubmit={handleSubmit}
    >
      <span className="text-l">{title}</span>
      {children}
    </form>
  );
};
