import  Contact from "../../../packages/ui/src/components/Contact";

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "Contact",
  component: Contact,
  tags: ["autodocs"],
} satisfies Meta<typeof Contact>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "John Doe",    
  },
};