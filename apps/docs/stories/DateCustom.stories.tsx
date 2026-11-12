
import type { Meta, StoryObj } from '@storybook/react';
import DateCustom from "../../../packages/ui/src/components/DateCustom";

const meta = {
  title: "DateCustom",
  component: DateCustom,
  tags: ["autodocs"],

} satisfies Meta<typeof DateCustom>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    day: 15,
    month: 8,
    year: 2024,
  },
};