
import type { Meta, StoryObj } from '@storybook/react';
import HomeFrame from "../../../packages/ui/src/components/HomeFrame";

const meta = {
  title: "HomeFrame",
  component: HomeFrame,
  tags: ["autodocs"],

} satisfies Meta<typeof HomeFrame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "John Doe",
  },
};