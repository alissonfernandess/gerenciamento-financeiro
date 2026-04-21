import  ContactName from "../../../packages/ui/src/components/ContactName";

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "ContactName",
  component: ContactName,
} satisfies Meta<typeof ContactName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    contactName: "John Doe",
    
  },
};