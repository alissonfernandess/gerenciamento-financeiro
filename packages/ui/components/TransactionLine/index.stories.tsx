import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Index from './index';
import { FaPix } from "react-icons/fa6";

const meta = {
  component: Index,
  tags:["autodocs"]
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "Icon": FaPix,
    "transaction": "transaction",
    "Date": fn(),
    "value": fn(),
    "hasCurrencySymbol": fn()
  },
};