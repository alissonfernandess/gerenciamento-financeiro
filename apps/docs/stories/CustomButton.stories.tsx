import  CustomButton from "../../../packages/ui/src/components/CustomButton";

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "CustomButton",
  component: CustomButton,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    type: "button",
    text: "Click me",
    fontColor: "#fff",
    backgroundColor: "#007bff",
  },
};