import { Meta, StoryObj } from "@storybook/react/*";
import { ExtendedStatus } from "../features/backlog/data/State";
import { FeatureListItem } from "../features/backlog/components/board/FeatureListItem";

const meta: Meta<typeof FeatureListItem> = {
    title: "Simple Feature Item List",
    component: FeatureListItem
}
export default meta

export const DefaultFeatureItem: StoryObj<typeof FeatureListItem> = {
    args: {
        feature: {
            guid: "",
            title: "Test",
            state: ExtendedStatus.New,
            points: 5,
            projectGuid: "",
            creator: "",
            lastUpdate: "",
            description: ""
        }
    }
}
