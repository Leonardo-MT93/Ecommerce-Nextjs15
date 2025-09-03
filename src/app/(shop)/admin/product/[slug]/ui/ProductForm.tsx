"use client";

import { createUpdateProduct } from "@/actions";
import { Product, Category, ProductImage } from "@/interfaces";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface Props {
  product: Partial<Product> & { ProductImage?: ProductImage[] };
  categories: Category[];
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
  categoryId: string;
  images?: FileList;
}


export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter();

  const { register, handleSubmit, formState: { isValid }, getValues, setValue, watch } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      sizes: product.sizes ?? [],
      tags: product.tags?.join(', ') ?? '',
      description: product.description ?? '',
      images: undefined
    }
  });

  watch('sizes');

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'));
    sizes.has(size) ? sizes.delete(size) : sizes.add(size);
    setValue('sizes', Array.from(sizes));
  }


  const onSubmit = async (data: FormInputs) => {

    const formData = new FormData();

    const { images, ...productToSave } = data;
    if (product.id) {
      formData.append('id', product.id ?? '');

    }
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('inStock', productToSave.inStock.toString());
    formData.append('sizes', productToSave.sizes.toString());
    formData.append('tags', productToSave.tags);
    formData.append('gender', productToSave.gender);
    formData.append('categoryId', productToSave.categoryId);
    if (images) {
      for (const image of images) {
        formData.append('images', image);
      }
    }
    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    if (!ok) {
      return;
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`);


  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Textos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("title", { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("slug", { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register("price", { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register("tags", { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register("gender", { required: true })}>
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register("categoryId", { required: true })}>
            <option value="">[Select]</option>
            {
              categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <button className="btn-primary w-full" type="submit" disabled={!isValid}>
          Save
        </button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>In Stock</span>
          <input type="number" className="p-2 border rounded-md bg-gray-200" {...register("inStock", { required: true, min: 0 })} />
        </div>
        {/* As checkboxes */}
        <div className="flex flex-col">

          <span>Sizes</span>
          <div className="flex flex-wrap">

            {
              sizes.map(size => (
                // bg-blue-500 text-white <--- si está seleccionado
                <div key={size}
                  onClick={() => onSizeChanged(size)}
                  className={
                    clsx(
                      "flex items-center justify-center w-14 p-2 border rounded-md mr-2 transition-all cursor-pointer",
                      {
                        "bg-blue-500 text-white": getValues('sizes').includes(size)
                      }
                    )
                  }>
                  <span>{size}</span>
                </div>
              ))
            }

          </div>


          <div className="flex flex-col mb-2">

            <span>Photos</span>
            <input
              type="file"
              {...register("images")}
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
            />

          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <span>Current Images</span>
            {
              product.ProductImage?.map((image) => (
                <div key={image.id} className="flex flex-col items-center justify-center w-full">
                  <Image src={`/products/${image.url}`} alt={product.title ?? ''} width={200} height={200} className="rounded-t shadow-md w-full" />
                  <button
                    type="button"
                    onClick={() => console.log(image.id, image.url)}
                    className="btn-danger w-full rounded-b-xl cursor-pointer">Delete</button>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </form>
  );
};