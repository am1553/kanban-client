import React, { FormEvent, useEffect } from "react";
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
  focus?: boolean;
}

type Option = { label: string; value: string };

interface DropdownProps {
  options: Option[];
  defaultSelected: Option | null;
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
  focus = false,
}: TextFieldProps) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isError, setIsError] = React.useState<boolean>(isEmptyError);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setIsError(true);
    } else {
      setIsError(false);
    }
    onChange(e.target.value);
  };

  useEffect(() => {
    if (!focus || !inputRef.current) return;
    inputRef.current.focus();
  }, [focus, inputRef.current]);

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        className={`h-10 w-full rounded-md px-4 border bg-white bg-opacity-0 ${
          isError ? "border-red" : "border-medium-grey border-opacity-25"
        }`}
        defaultValue={defaultValue}
        ref={inputRef}
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
  defaultValue,
}: {
  name: string;
  placeholder: string;
  defaultValue?: string;
}) => {
  return (
    <textarea
      defaultValue={defaultValue}
      name={name}
      placeholder={placeholder}
      id=""
      className="h-48 w-full p-4 border border-medium-grey border-opacity-25 bg-white bg-opacity-0"
    />
  );
};

export const Dropdown = ({
  options,
  onSelect,
  defaultSelected,
  name,
}: DropdownProps) => {
  const { theme } = useTheme();
  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState(defaultSelected);
  const statusRef = React.useRef<HTMLUListElement>(null);
  const handleOpen = () => setOpen((prev) => !prev);
  const handleSelect = (option: Option) => {
    onSelect(option.value);
    setSelected(option);
    setOpen(false);
  };
  useOnClickOutside(statusRef, () => setOpen(false));
  return options.length < 1 ? (
    <span>No columns for this board.</span>
  ) : (
    <div className="relative">
      <select
        name={name}
        id=""
        value={selected?.value}
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
        className="h-10 w-full rounded-md flex items-center justify-between px-4 border border-medium-grey border-opacity-25 capitalize"
        onClick={handleOpen}
        type="button"
      >
        <span>{selected?.label}</span>
        {open ? (
          <img src={ChevronUp} alt="" />
        ) : (
          <img src={ChevronDown} alt="" />
        )}
      </button>
      <ul
        className={`absolute left-0 right-0 rounded-md shadow-md ${
          open ? "h-fit py-4" : "h-0"
        } ${
          theme === "light" ? "bg-white" : "bg-dark-grey"
        } overflow-hidden z-20`}
        ref={statusRef}
      >
        {options.map((option: Option) => (
          <li
            key={option.value}
            onClick={() => handleSelect(option)}
            className={`cursor-pointer h-10 flex items-center px-4 hover:text-white hover:bg-main-purple transition-colors capitalize`}
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
  name,
  getFields,
}: {
  buttonText: string;
  label: string;
  defaultFields?: Field[];
  name: string;
  getFields?: (fields: { value: string; id: string }[]) => void;
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

  useEffect(() => {
    if (!getFields) return;
    getFields(fields);
  }, [fields, getFields]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="">{label}</label>
      {fields.map((field: { value: string; id: string }) => {
        return (
          <div className="flex gap-2 items-center" key={field.id}>
            <div className="flex-1">
              <TextField
                name={name}
                placeholder=""
                onChange={(value) => handleChange(field.id, value)}
                isEmptyError={false}
                defaultValue={field.value}
                focus={false}
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
  className?: string;
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
      className={`p-4 flex flex-col gap-6 max-w-[480px] w-full mx-4 rounded-md shadow-md max-h-[60vh] overflow-y-auto ${
        theme === "dark" ? "bg-dark-grey text-white" : "bg-white text-black"
      } ${className}`}
      ref={ref}
      onSubmit={handleSubmit}
    >
      <span className="text-l">{title}</span>
      {children}
    </form>
  );
};
