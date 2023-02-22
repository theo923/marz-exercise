import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import { PRODUCT_URL } from "../ApiHelper";

export default {
  title: "Products Page",
  component: ProductsPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
  mockData: [
    {
      url: PRODUCT_URL,
      method: "GET",
      status: 200,
      response: {
        data: [
          {
            ProductID: 1,
            ProductName: "Hat",
            ProductPhotoURL: "https://i.imgur.com/SGC6Ft5.jpeg",
            ProductStatus: "Active",
          },
          {
            ProductID: 2,
            ProductName: "Shoes",
            ProductPhotoURL: "https://i.imgur.com/pwkMep6.jpeg",
            ProductStatus: "Active",
          },
          {
            ProductID: 3,
            ProductName: "Pants",
            ProductPhotoURL:
              "https://www.dickies.ca/dw/image/v2/AAYI_PRD/on/demandware.static/-/Sites-master-catalog-dickies/default/dw2ba98841/images/main/874_AF_FR.jpg?sw=2000&sh=2000&sm=fit",
            ProductStatus: "Active",
          },
          {
            ProductID: 4,
            ProductName: "Shirt",
            ProductPhotoURL:
              "https://static01.nyt.com/images/2013/09/22/magazine/22wmt/22wmt-superJumbo-v2.jpg?quality=75&auto=webp",
            ProductStatus: "InActive",
          },
          {
            ProductID: 5,
            ProductName: "Coat",
            ProductPhotoURL:
              "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/J4P6CDCSEII6ZA6S3HNLBYR3PY.jpg&w=1200",
            ProductStatus: "InActive",
          },
        ],
        message: "",
      },
    },
  ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
  mockData: [
    {
      url: PRODUCT_URL,
      method: "GET",
      status: 200,
      response: {
        data: [],
        message: "",
      },
    },
  ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
  mockData: [
    {
      url: PRODUCT_URL,
      method: "GET",
      status: 500,
      response: {
        data: [],
        message: "Error",
      },
    },
  ],
};
