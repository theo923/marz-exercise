import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Card from "./Card";

export default {
  title: "Card",
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

const getArgs = (ProductStatus: string) => ({
  ProductID: 1234,
  ProductName: "Hat",
  ProductPhotoURL: "https://i.imgur.com/SGC6Ft5.jpeg",
  ProductStatus,
});

export const Active = Template.bind({});
Active.args = getArgs("Active");
