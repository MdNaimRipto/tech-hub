import ProductCategoryList from "@/components/common/adminDashboard/inputFields/ProductCategoryList";
import ProductImageFiled from "@/components/common/adminDashboard/inputFields/ProductImageFiled";
import ProductsInputField from "@/components/common/adminDashboard/inputFields/ProductsInputField";
import AddOnBtn from "@/components/common/buttons/AddOnBtn";
import { useUserContext } from "@/context/AuthContext";
import AdminLayout from "@/layouts/AdminLayout";
import { useUploadProductMutation } from "@/redux/features/products/productsApi";
import React, { ReactElement, useState } from "react";
import { toast } from "react-toastify";

const AddProducts = () => {
  const { user, token } = useUserContext();

  const [isLoading, setIsLoading] = useState(false);
  const [productCategory, setProductCategory] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");

  const [uploadProduct] = useUploadProductMutation();

  const handleUploadProduct = async (e: any) => {
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
    const quantity = form.quantity.value;
    const description = form.description.value;
    const brand = form.brand.value;

    const option = {
      data: {
        name,
        images: {
          i1,
          ...(i2 && { i2 }),
          ...(i3 && { i3 }),
          ...(i4 && { i4 }),
        },
        features: {
          f1,
          f2,
          f3,
          f4,
          f5,
        },
        category,
        price,
        discount: 0,
        quantity: parseInt(quantity),
        description,
        brand,
        sellerID: user?._id,
      },
      token,
    };

    try {
      const res = await uploadProduct(option).unwrap();
      if (res.success) {
        toast.success(res.message);
        form.reset();
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Error:", error);
      toast.error(error.data.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="my-12 mx-0 md:mx-4 w-full">
      <h2 className="text-3xl font-medium text-black mb-5">Add Product</h2>
      <form onSubmit={handleUploadProduct}>
        <ProductsInputField
          label="Product Name"
          name="name"
          type="text"
          placeholder="Add Product Name"
        />
        <ProductImageFiled
          name="i1"
          label="Product Image No.1"
          required={true}
          setImg={setImg1}
        />
        <ProductImageFiled
          name="i2"
          label="Product Image No.2"
          required={false}
          setImg={setImg2}
        />
        <ProductImageFiled
          name="i3"
          label="Product Image No.3"
          required={false}
          setImg={setImg3}
        />
        <ProductImageFiled
          name="i4"
          label="Product Image No.4"
          required={false}
          setImg={setImg4}
        />
        <ProductsInputField
          label="Product Feature No.1"
          name="f1"
          type="text"
          placeholder="Add Feature No.1"
        />
        <ProductsInputField
          label="Product Feature No.2"
          name="f2"
          type="text"
          placeholder="Add Feature No.2"
        />
        <ProductsInputField
          label="Product Feature No.3"
          name="f3"
          type="text"
          placeholder="Add Feature No.3"
        />
        <ProductsInputField
          label="Product Feature No.4"
          name="f4"
          type="text"
          placeholder="Add Feature No.4"
        />
        <ProductsInputField
          label="Product Feature No.5"
          name="f5"
          type="text"
          placeholder="Add Feature No.5"
        />
        <ProductCategoryList setProductCategory={setProductCategory} />
        <ProductsInputField
          label="Product Price"
          name="price"
          type="number"
          placeholder="Add Product Price"
        />
        <ProductsInputField
          label="Product Quantity"
          name="quantity"
          type="number"
          placeholder="Add Product Quantity"
        />
        <div>
          <div className="mb-3 flex items-center gap-1">
            <label>Product Description</label>
            <span className="text-error text-xl font-semibold">*</span>
          </div>
          <textarea
            name="description"
            className="w-full focus:outline-none border border-light-gray rounded py-4 px-2"
            placeholder="Add Product Description"
            rows={5}
          />
        </div>
        <ProductsInputField
          label="Product Brand"
          name="brand"
          type="text"
          placeholder="Add Product Brand"
        />
        <AddOnBtn loading={isLoading} title="Add Product" />
      </form>
    </div>
  );
};

export default AddProducts;

AddProducts.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};
