import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Index from './index';
import AbbreviatedName from "../AbbreviatedName";
import ContactName from "../ContactName";

const meta = {
  component: Index,
  tags:["autodocs"],

} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
      name: "Boris Casoi"
  },
};