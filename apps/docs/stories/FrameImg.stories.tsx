
import type { Meta, StoryObj } from '@storybook/react';
import FrameImg from "../../../packages/ui/src/components/FrameImg";

const meta = {
  title: "FrameImg",
  component: FrameImg,
  tags: ["autodocs"],

} satisfies Meta<typeof FrameImg>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    
  },
};