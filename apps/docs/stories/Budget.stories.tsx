
import type { Meta, StoryObj } from '@storybook/react';
import Budget from "../../../packages/ui/src/components/Budget";

const meta = {
  title: "Budget",
  component: Budget,
  tags: ["autodocs"],

} satisfies Meta<typeof Budget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    amount: 5000,
  },
};