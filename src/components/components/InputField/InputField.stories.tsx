import type { Meta, StoryFn } from "@storybook/react";
import InputField from "./InputField";
import type { InputFieldProps } from "./InputField";
import { useState } from "react";

export default {
  title: "Components/InputField",
  component: InputField,
} as Meta<typeof InputField>;

const Template: StoryFn<InputFieldProps> = (args: InputFieldProps) => {
  const [value, setValue] = useState("");
  return <InputField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: "Name",
  placeholder: "Enter your name",
  helperText: "This is helper text",
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  label: "Name",
  placeholder: "Enter your name",
  invalid: true,
  errorMessage: "This field is required",
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  label: "Password",
  placeholder: "Enter your password",
  type: "password",
  showPasswordToggle: true,
};
