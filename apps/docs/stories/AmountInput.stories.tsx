import type { Meta, StoryObj } from '@storybook/react';
import { AmountInput } from "@repo/ui";

const meta = {
  title: "Components/AmountInput",
  component: AmountInput,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof AmountInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "amount-input",
    value: "100,00",
    backgroundImage: "/background_input.png",
    onChange: (e) => {
      console.log(e.target.value);
    },
  },
};

export const Empty: Story = {
  args: {
    id: "amount-input",
    value: "",
    placeholder: "0,00",
    backgroundImage: "/background_input.png",
    onChange: (e) => {
      console.log(e.target.value);
    },
  },
};
