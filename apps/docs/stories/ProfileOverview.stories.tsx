
import type { Meta, StoryObj } from '@storybook/react';
import ProfileOverview from "../../../packages/ui/src/components/ProfileOverview";

const meta = {
  title: "ProfileOverview",
  component: ProfileOverview,
  tags: ["autodocs"],

} satisfies Meta<typeof ProfileOverview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    name: "John Doe",
  },
};