import type { Meta, StoryObj } from "@storybook/react"
import { WelcomeCard } from "@repo/ui"

const meta: Meta<typeof WelcomeCard> = {
    title: "Components/WelcomeCard",
    component: WelcomeCard,
}

export default meta

type Story = StoryObj<typeof WelcomeCard>

export const Default: Story = {
    args: {
        name: "Felipe",
    },
}