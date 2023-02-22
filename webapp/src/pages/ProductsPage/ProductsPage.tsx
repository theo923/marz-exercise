import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import { Product, ProductData } from "../../components/interfaces";
import Spinner from "../../components/Spinner/Spinner";
import { getProductData } from "../ApiHelper";
import PageWrapper from "../PageWrapper";

const ProductsPage = () => {
  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */
  const DATA_STATES = {
    waiting: "WAITING",
    loaded: "LOADED",
    error: "ERROR",
  };

  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({
    Active: [],
    InActive: [],
  } as ProductData);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getProductData();
    setData(productData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;
  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded)
    content = (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-testid="pipeline-container"
      >
        {data["Active"].length > 0 &&
          data["Active"].map((product: Product) => (
            <Card
              ProductID={product.ProductID}
              ProductName={product.ProductName}
              ProductPhotoURL={product.ProductPhotoURL}
              ProductStatus={product.ProductStatus}
            />
          ))}
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return <PageWrapper>{content}</PageWrapper>;
};

export default ProductsPage;
