import  {CustomInput} from "../../../packages/ui/src/components/CustomInput/CustomInput";

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "CustomInput",
  component: CustomInput,
  tags: ["autodocs"],
} satisfies Meta<typeof CustomInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "Enter text here",
       
  },
};