
import type { Meta, StoryObj } from '@storybook/react';
import Amount from "../../../packages/ui/src/components/Amount";

const meta = {
  title: "Amount",
  component: Amount,
  tags: ["autodocs"],

} satisfies Meta<typeof Amount>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    value: 1000,
    operationBank: "withdrawal"
  },
};