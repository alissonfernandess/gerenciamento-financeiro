
import type { Meta, StoryObj } from '@storybook/react';
import AbbreviatedName from "../../../packages/ui/src/components/AbbreviatedName/AbbreviatedName";

const meta = {
  title: "AbbreviatedName",
  component: AbbreviatedName,
  tags: ["autodocs"],

} satisfies Meta<typeof AbbreviatedName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    completedName: "John Doe",
  },
};