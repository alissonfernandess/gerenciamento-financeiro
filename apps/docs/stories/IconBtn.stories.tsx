
import type { Meta, StoryObj } from '@storybook/react';
import IconBtn from "../../../packages/ui/src/components/IconBtn";
import { BiHome } from 'react-icons/bi';

const meta = {
  title: "IconBtn",
  component: IconBtn,
  tags: ["autodocs"],

} satisfies Meta<typeof IconBtn>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    icon: BiHome,
    type: "button",
    backgroundColor: "#007bff",
    fontColor: "#fff",
  },
};