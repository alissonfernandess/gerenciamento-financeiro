import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Indes from '.';

const meta = {
  component: Indes,
  tags:["autodocs"]
} satisfies Meta<typeof Indes>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "children": <h3>Olá, Felipe</h3>,
    height: 500
  },
};