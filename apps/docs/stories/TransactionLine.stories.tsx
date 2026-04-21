
import type { Meta, StoryObj } from '@storybook/react';
import TransactionLine from "../../../packages/ui/src/components/TransactionLine";
import { FaPix } from 'react-icons/fa6';

const meta = {
  title: "TransactionLine",
  component: TransactionLine,
  tags: ["autodocs"],

} satisfies Meta<typeof TransactionLine>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    day: 12,
    month: 8,
    year: 2024,
    Icon: FaPix,
    transaction: "pix",
    value: 200,
    bckColor: "white",
    operationBank: "deposit",
    hasCurrencySymbol: true
  },
};