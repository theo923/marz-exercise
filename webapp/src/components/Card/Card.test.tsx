import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { create, ReactTestRenderer } from "react-test-renderer";
import Card from "./Card";

describe("Card", () => {
  let tree: ReactTestRenderer;
  const ID = "1234";
  beforeEach(() => {
    const props = {
      ProductID: 1234,
      ProductName: "Hat",
      ProductPhotoURL: "https://i.imgur.com/SGC6Ft5.jpeg",
      ProductStatus: "Active",
    };
    tree = create(<Card {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it("rendersCard", async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({
      "data-testid": `card-container-${ID}`,
    });
    await testInstance.findByProps({
      "data-testid": `card-productPhotoURL-${ID}`,
    });
    await testInstance.findByProps({
      "data-testid": `card-productID-${ID}`,
    });
    await testInstance.findByProps({
      "data-testid": `card-productName-${ID}`,
    });
    await testInstance.findByProps({
      "data-testid": `card-productStatus-${ID}`,
    });
  });
});
