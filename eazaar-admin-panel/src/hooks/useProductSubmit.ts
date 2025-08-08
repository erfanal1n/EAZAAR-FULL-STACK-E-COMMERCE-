"use client";
import { useEffect, useState } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import {useRouter} from 'next/navigation';
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";

export interface ImageURL {
  color: {
    name?: string;
    clrCode?: string;
  };
  img: string;
  sizes?: string[];
}
type IBrand = {
  name: string;
  id: string;
};
type ICategory = {
  name: string;
  id: string;
};

type status = "in-stock" | "out-of-stock" | "discontinued";

const useProductSubmit = (productData?: any, refetchProduct?: () => void) => {
  const [sku, setSku] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [imageURLs, setImageURLs] = useState<ImageURL[]>([]);
  const [parent, setParent] = useState<string>("");
  const [children, setChildren] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [brand, setBrand] = useState<IBrand>({ name: "", id: "" });
  const [category, setCategory] = useState<ICategory>({ name: "", id: "" });
  const [status, setStatus] = useState<status>("in-stock");
  const [productType, setProductType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [videoId, setVideoId] = useState<string>("");
  const [offerDate, setOfferDate] = useState<{
    startDate: string | null;
    endDate: string | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [additionalInformation, setAdditionalInformation] = useState<
    {
      key: string;
      value: string;
    }[]
  >([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (productData) {
      setSku(productData.sku || "");
      setImg(productData.img || "");
      setTitle(productData.title || "");
      setSlug(productData.slug || "");
      setUnit(productData.unit || "");
      setImageURLs(productData.imageURLs || []);
      setParent(productData.parent || "");
      setChildren(productData.children || "");
      setPrice(productData.price || 0);
      setDiscount(productData.discount || 0);
      setQuantity(productData.quantity || 0);
      setBrand(productData.brand || { name: "", id: "" });
      setCategory(productData.category || { name: "", id: "" });
      setStatus(productData.status || "in-stock");
      setProductType(productData.productType || "");
      setDescription(productData.description || "");
      setVideoId(productData.videoId || "");
      setOfferDate(productData.offerDate || { startDate: null, endDate: null });
      setAdditionalInformation(productData.additionalInformation || []);
      setTags(productData.tags || []);
    }
  }, [productData]);


  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const resetForm = () => {
    setSku("");
    setImg("");
    setTitle("");
    setSlug("");
    setUnit("");
    setImageURLs([]);
    setParent("");
    setChildren("");
    setPrice(0);
    setDiscount(0);
    setQuantity(0);
    setBrand({ name: "", id: "" });
    setCategory({ name: "", id: "" });
    setStatus("in-stock");
    setProductType("");
    setDescription("");
    setVideoId("");
    setOfferDate({
      startDate: null,
      endDate: null,
    });
    setAdditionalInformation([]);
    setTags([]);
    setSizes([]);
    reset();
  };

  const handleSubmitProduct = async (data: any) => {
    const productData = {
      sku: data.SKU || "",
      img: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit: data.unit || "pcs", // Default unit
      imageURLs: imageURLs,
      parent: parent || "", // Default empty parent
      children: children || "", // Default empty children
      price: Number(data.price),
      discount: Number(data.discount_percentage || 0),
      quantity: Number(data.quantity),
      brand: brand,
      category: category,
      status: status,
      offerDate: {
        startDate: offerDate.startDate,
        endDate: offerDate.endDate,
      },
      productType: productType,
      description: data.description || "",
      videoId: data.youtube_video_Id || "",
      additionalInformation: additionalInformation,
      tags: tags,
    };

    if (!img) {
      return notifyError("Product image is required");
    }
    
    if (!category.name) {
      return notifyError("Category is required");
    }
    
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be gether than discount");
    }
    
    try {
      const res = await addProduct(productData);
      
      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string };
          
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
        return notifyError("An error occurred during product creation");
      } else {
        notifySuccess("Product created successFully");
        setIsSubmitted(true);
        resetForm();
        router.push('/product-grid')
      }
    } catch (error) {
      notifyError("Network error occurred");
    }
  };
  const handleEditProduct = async (data: any, id: string) => {
    const productData = {
      sku: data.SKU || data.sku,
      img: img,
      title: data.title,
      slug: slugify(data.title, { replacement: "-", lower: true }),
      unit: data.unit,
      imageURLs: imageURLs,
      parent: parent,
      children: children,
      price: Number(data.price),
      discount: Number(data.discount_percentage || data["discount_percentage"] || data["discount percentage"] || data.discount || 0),
      quantity: Number(data.quantity),
      brand: brand,
      category: category,
      status: status,
      offerDate: {
        startDate: offerDate.startDate,
        endDate: offerDate.endDate,
      },
      productType: productType,
      description: data.description,
      videoId: data.youtube_video_Id || data["youtube video Id"] || data.videoId,
      additionalInformation: additionalInformation,
      tags: tags,
    };
    const res = await editProduct({ id: id, data: productData });
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string };
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    } else {
      notifySuccess("Product edit successFully");
      setIsSubmitted(true);
      if (refetchProduct) {
        refetchProduct();
      }
    }
  };

  return {
    sku,
    setSku,
    img,
    setImg,
    title,
    setTitle,
    slug,
    setSlug,
    unit,
    setUnit,
    imageURLs,
    setImageURLs,
    parent,
    setParent,
    children,
    setChildren,
    price,
    setPrice,
    discount,
    setDiscount,
    quantity,
    setQuantity,
    brand,
    setBrand,
    category,
    setCategory,
    status,
    setStatus,
    productType,
    setProductType,
    description,
    setDescription,
    videoId,
    setVideoId,
    additionalInformation,
    setAdditionalInformation,
    tags,
    setTags,
    sizes,
    setSizes,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    offerDate,
    setOfferDate,
    setIsSubmitted,
    isSubmitted,
  };
};

export default useProductSubmit;