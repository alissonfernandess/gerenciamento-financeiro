import { Button } from "@repo/ui";

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: "Button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appName: "docs",
    children: "Click me",
  },
};