
import type { Meta, StoryObj } from '@storybook/react';
import Title from "../../../packages/ui/src/components/Title";

const meta = {
  title: "Title",
  component: Title,
  tags: ["autodocs"],

} satisfies Meta<typeof Title>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Financial Management",
    fontColor: "#333",
  },
};