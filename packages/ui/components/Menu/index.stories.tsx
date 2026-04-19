import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Index from './index';
import IconBtn from "../IconBtn";
import { FaHome } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdFeaturedPlayList } from "react-icons/md";

const meta = {
  component: Index,
  tags:["autodocs"]
} satisfies Meta<typeof Index>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "children": 
      <>
        <IconBtn type="button" text="Início" fontColor="white" hasBackgroundColor = {false} backgroundColor="transparent" icon={FaHome}/>
        <IconBtn type="button" text="Transferência" fontColor="white" hasBackgroundColor = {false} backgroundColor="transparent" icon={FaMoneyBillTransfer}/>        
        <IconBtn type="button" text="Extrato" fontColor="white" hasBackgroundColor = {false} backgroundColor="transparent" icon={MdFeaturedPlayList}/>
      </>
  },
};