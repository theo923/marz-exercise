import React from "react";
import { Product } from "../interfaces";

const Card = ({
  ProductID,
  ProductName,
  ProductPhotoURL,
  ProductStatus,
}: Product) => {
  return (
    <div
      key={ProductID}
      className="bg-white rounded-lg overflow-hidden shadow-lg"
      data-testid={`card-container-${ProductID}`}
    >
      <img
        className="w-full h-80 object-cover object-center"
        src={ProductPhotoURL}
        data-testid={`card-productPhotoURL-${ProductID}`}
        alt="Product photo"
      />
      <div className="p-4">
        <h3
          className="text-lg font-medium text-gray-900 mb-2"
          data-testid={`card-productID-${ProductID}`}
        >
          {ProductID}
        </h3>
        <h3
          className="text-lg font-medium text-gray-900 mb-2"
          data-testid={`card-productName-${ProductID}`}
        >
          {ProductName}
        </h3>
        <div className="flex justify-end items-center">
          <span
            className="bg-green-500 text-white py-1 px-4 rounded font-medium"
            data-testid={`card-productStatus-${ProductID}`}
          >
            {ProductStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
