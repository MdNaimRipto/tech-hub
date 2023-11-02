import { useGetProductsByCategoryQuery } from "@/redux/features/products/productsApi";
import {
  IProducts,
  IProductsByCategoryFilter,
} from "@/types/productTypes/productsTypes";
import {
  Slider,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
} from "@mui/material";

import { useState, useEffect } from "react";

function valuetext(value: number) {
  return value.toString();
}

interface IProductsContent {
  isSideBarOpen: boolean;
  category: string;
  filterValues: any;
  setFilterValues: any;
  priceValue: [number, number];
  setPriceValue: any;
  maxPrice: number;
  setMaxPrice: any;
}

const ProductsPageSubNav = ({
  isSideBarOpen,
  category,
  setFilterValues,
  priceValue,
  setPriceValue,
  maxPrice,
  setMaxPrice,
}: IProductsContent) => {
  const option: IProductsByCategoryFilter = {
    category: category as string,
    limit: "15",
    sortBy: "discountedPrice",
  };
  const { data, isLoading } = useGetProductsByCategoryQuery(option);

  useEffect(() => {
    if (!isLoading) {
      const maxPrice = Math.max(
        ...data?.data?.data.map((product: IProducts) => product.discountedPrice)
      );
      setMaxPrice(maxPrice + 5000);
      setPriceValue([0, maxPrice + 5000]);
    }
  }, [isLoading, data?.data?.data, setMaxPrice, setPriceValue]);

  if (isLoading) {
    return <h2>loading...</h2>;
  }

  const products = data?.data?.data;

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number[]);
    setFilterValues((prevFilterValues: any) => ({
      ...prevFilterValues,
      minPrice: priceValue[0],
      maxPrice: priceValue[1],
    }));
  };

  const stockStatus = [
    {
      status: "",
      label: "Default",
    },
    {
      status: true,
      label: "In Stock",
    },
    {
      status: false,
      label: "Out of Stock",
    },
  ];

  const uniqueBrands: string[] = Array.from(
    new Set(products?.map((product: IProducts) => product.brand))
  );

  return (
    <div
      className={`border-r border-r-input absolute lg:static ${
        isSideBarOpen
          ? "pl-5 left-0 z-30 h-[1000px] w-4/5 md:w-2/5"
          : "-left-[1000px] w-full"
      } duration-300 bg-white`}
    >
      <div className="pt-5">
        <h6 className="text-sm mb-3 font-medium text-black ml-1">
          Sel Price Range
        </h6>
        <Slider
          sx={{
            width: "78%",
            marginLeft: "10px",
            display: "block",
            color: "#f15700",
          }}
          min={0}
          max={maxPrice}
          getAriaLabel={() => "Price range"}
          value={priceValue}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
        />
        <div className="flex items-center justify-between w-[86%] mt-4">
          <input
            value={priceValue[0]}
            onChange={() => {
              setPriceValue([priceValue[0], priceValue[1]]);
            }}
            className="w-[30%] border border-light-gray text-center text-sm"
          />
          <input
            value={priceValue[1]}
            onChange={() => {
              setPriceValue([priceValue[0], priceValue[1]]);
            }}
            className="w-[30%] border border-light-gray text-center text-sm"
          />
        </div>
      </div>
      <div className="border-t border-b border-t-input border-b-input my-5 py-5 mr-8">
        <FormControl>
          <h6 className="text-sm mb-3 font-medium text-black ml-1">
            Availability
          </h6>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={e => {
              setFilterValues((prevFilterValues: any) => ({
                ...prevFilterValues,
                status: e.target.value,
              }));
            }}
          >
            {stockStatus.map((s, i) => (
              <FormControlLabel
                key={i}
                value={s.status}
                control={
                  <Radio
                    size={"small"}
                    sx={{
                      "&.Mui-checked": {
                        color: "#f15700",
                      },
                    }}
                  />
                }
                label={s.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
      <div className="border-b border-b-input mb-5 pb-5 mr-8">
        <FormControl component="fieldset" variant="standard">
          <h6 className="text-sm mb-3 font-medium text-black ml-1">Brands</h6>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue=""
            name="radio-buttons-group"
            onChange={e => {
              setFilterValues((prevFilterValues: any) => ({
                ...prevFilterValues,
                brand: e.target.value,
              }));
            }}
          >
            <FormControlLabel
              value=""
              control={
                <Radio
                  size={"small"}
                  sx={{
                    "&.Mui-checked": {
                      color: "#f15700",
                    },
                  }}
                />
              }
              label="All Brands"
            />
            {uniqueBrands.map((b: string, i: number) => (
              <FormControlLabel
                key={i}
                value={b as string}
                control={
                  <Radio
                    size={"small"}
                    sx={{
                      "&.Mui-checked": {
                        color: "#f15700",
                      },
                    }}
                  />
                }
                label={`${b.slice(0, 1).toUpperCase()}${b.slice(1)}`}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default ProductsPageSubNav;
