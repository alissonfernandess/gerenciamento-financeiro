import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Index from './index';

const meta = {
  component: Index,
  tags:["autodocs"]
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "value": 0,
    value: 250
  },
};