import ProductCategoryList from "@/components/common/adminDashboard/inputFields/ProductCategoryList";
import ProductImageFiled from "@/components/common/adminDashboard/inputFields/ProductImageFiled";
import ProductsInputField from "@/components/common/adminDashboard/inputFields/ProductsInputField";
import AddOnBtn from "@/components/common/buttons/AddOnBtn";
import { useUserContext } from "@/context/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import {
  useEditProductMutation,
  useGetProductsByIDQuery,
} from "@/redux/features/products/productsApi";
import { IProductDetails } from "@/types/productTypes/productsTypes";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { token } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  const router = useRouter();
  const id = router.query.productId;

  const { data, isLoading: detailsLoading } = useGetProductsByIDQuery({ id });

  const [editProduct] = useEditProductMutation();

  if (detailsLoading) {
    return <h2>Loading...</h2>;
  }

  const details = data.data as IProductDetails;

  const handleUpdateProduct = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    const form = e.target;
    const name = form.name.value;
    const i1 = img1;
    const i2 = img2;
    const i3 = img3;
    const i4 = img4;
    const f1 = form.f1.value;
    const f2 = form.f2.value;
    const f3 = form.f3.value;
    const f4 = form.f4.value;
    const f5 = form.f5.value;
    const category = productCategory;
    const price = form.price.value;
    const discount = form.discount.value;
    const quantity = form.quantity.value;
    const description = form.description.value;
    const brand = form.brand.value;

    const option = {
      data: {
        ...(name && { name }),
        ...((i1 || i2 || i3 || i4) && {
          images: {
            ...(i1 && { i1 }),
            ...(i2 && { i2 }),
            ...(i3 && { i3 }),
            ...(i4 && { i4 }),
          },
        }),
        ...((f1 || f2 || f3 || f4 || f5) && {
          features: {
            ...(f1 && { f1 }),
            ...(f2 && { f1 }),
            ...(f3 && { f3 }),
            ...(f4 && { f4 }),
            ...(f5 && { f5 }),
          },
        }),
        ...(category && { category }),
        ...(price && { price }),
        ...(discount && { discount: parseInt(discount) }),
        ...(quantity && { quantity: parseInt(quantity) }),
        ...(description && { description }),
        ...(brand && { brand: brand.toLowerCase() }),
      },
      token,
      id,
    };

    try {
      const res = await editProduct(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        form.reset();
        router.push(`/products/${id}`);
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.data.message);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="my-12 mx-0 md:mx-4 w-full">
      <h2 className="text-3xl font-medium text-black mb-5">Edit Product</h2>
      <form onSubmit={handleUpdateProduct}>
        <ProductsInputField
          label="Product Name"
          name="name"
          type="text"
          placeholder={details.name}
          required={false}
        />
        <ProductImageFiled
          name="i1"
          label="Product Image No.1"
          required={false}
          setImg={setImg1}
        />
        {details.images.i2 && (
          <ProductImageFiled
            name="i2"
            label="Product Image No.2"
            required={false}
            setImg={setImg2}
          />
        )}
        {details.images.i3 && (
          <ProductImageFiled
            name="i3"
            label="Product Image No.3"
            required={false}
            setImg={setImg3}
          />
        )}
        {details.images.i4 && (
          <ProductImageFiled
            name="i4"
            label="Product Image No.4"
            required={false}
            setImg={setImg4}
          />
        )}
        <ProductsInputField
          required={false}
          label="Product Feature No.1"
          name="f1"
          type="text"
          placeholder={details.features.f1}
        />
        <ProductsInputField
          required={false}
          label="Product Feature No.2"
          name="f2"
          type="text"
          placeholder={details.features.f2}
        />
        <ProductsInputField
          required={false}
          label="Product Feature No.3"
          name="f3"
          type="text"
          placeholder={details.features.f3}
        />
        <ProductsInputField
          required={false}
          label="Product Feature No.4"
          name="f4"
          type="text"
          placeholder={details.features.f4}
        />
        <ProductsInputField
          required={false}
          label="Product Feature No.5"
          name="f5"
          type="text"
          placeholder={details.features.f5}
        />
        <ProductCategoryList
          setProductCategory={setProductCategory}
          required={false}
        />
        <ProductsInputField
          required={false}
          label="Product Price"
          name="price"
          type="number"
          placeholder={`${details.price}Tk`}
        />
        <ProductsInputField
          required={false}
          label="Product Discount"
          name="discount"
          type="number"
          placeholder="Add Discount"
        />
        <ProductsInputField
          required={false}
          label="Product Quantity"
          name="quantity"
          type="number"
          placeholder="Update Product Quantity"
        />
        <div>
          <div className="mb-3 flex items-center gap-1">
            <label>Product Description</label>
            <span className="text-error text-xl font-semibold">*</span>
          </div>
          <textarea
            name="description"
            className="w-full focus:outline-none border border-light-gray rounded py-4 px-2"
            placeholder="Update Product Description"
            rows={5}
          />
        </div>
        <ProductsInputField
          required={false}
          label="Product Brand"
          name="brand"
          type="text"
          placeholder={`${details.brand
            .slice(0, 1)
            .toUpperCase()}${details.brand.slice(1)}`}
        />
        <AddOnBtn loading={isLoading} title="Update Product" />
      </form>
    </div>
  );
};

export default EditProduct;

EditProduct.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
