import type { Meta, StoryObj } from "@storybook/react";
import AbbreviatedName from "./index";

const meta: Meta<typeof AbbreviatedName> = {
  title: "Components/AbbreviatedName",
  component: AbbreviatedName,
};

export default meta;

export const Default: StoryObj<typeof AbbreviatedName> = {
    args: {
        completedName: "Ruan Mesquita",
    }
};