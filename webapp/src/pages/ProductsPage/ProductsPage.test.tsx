import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { PRODUCT_URL } from "../ApiHelper";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";

describe("ProductsPage", () => {
  it("shouldDisplayLoadingSpinner", () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
  });
  it("shouldDisplayPipelineContainer", async () => {
    // set up mock for axios.get
    const response = {
      data: [
        {
          ProductID: 1,
          ProductName: "Hat",
          ProductPhotoURL: "https://i.imgur.com/SGC6Ft5.jpeg",
          ProductStatus: "Active",
        },
      ],
      message: "",
    };
    const server = setupServer(
      rest.get(PRODUCT_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response));
      })
    );
    server.listen();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId(`pipeline-container`)).toBeInTheDocument();
    });
    server.close();
  });
  it("shouldDisplayErrorMessage", async () => {
    // set up mock for axios.get
    const response = {
      data: [],
      message: "Error",
    };
    const server = setupServer(
      rest.get(PRODUCT_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(response));
      })
    );
    server.listen();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
    });
    server.close();
  });
});
