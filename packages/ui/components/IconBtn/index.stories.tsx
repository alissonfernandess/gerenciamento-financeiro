import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Index from './index';
import { FaBeer, FaHome } from 'react-icons/fa';

const meta = {
  component: Index,
  tags:["autodocs"]
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "type": "button",

    // Substitua pelo ícone desejado, por exemplo: FaBeer
    "icon": FaHome,

    fontColor: "#FFFFFF",
    backgroundColor: "#192B42",
    text: "Início",
    iconDirection: "column",
    iconSize: 24,
    hasBackgroundColor: true
  },
};