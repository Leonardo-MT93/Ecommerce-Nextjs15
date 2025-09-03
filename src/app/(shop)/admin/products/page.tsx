import { getPaginatedProductsWithImages } from '@/actions';
import { ProductImage } from '@/components';
import Pagination from '@/components/ui/pagination/Pagination';
import Title from '@/components/ui/title/Title';
import { currencyFormat } from '@/utils/currencyFormat';
import Image from 'next/image';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function OrdersPage({ searchParams }: Props) {

  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, take: 12 });





  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Title title="Manage Products" />

      <div className="flex mb-5 justify-end">
        <Link href="/admin/product/new" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Product</Link>
      </div>

      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Image
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Title
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Price
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Gender
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                In Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Sizes
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link href={`/product/${product.slug}`}>
                      <ProductImage src={product.ProductImage[0]?.url} alt={product.title} width={80} height={80} className="rounded-md w-20 h-20 object-cover" />
                    </Link>
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <Link href={`/admin/product/${product.slug}`} className="hover:underline">
                      {product.title}
                    </Link>
                  </td>
                  <td className="flex items-center text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                    {currencyFormat(product.price)}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.gender}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.inStock}
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {product.sizes.join(', ')}
                  </td>





                </tr>
              ))
            }


          </tbody>
        </table>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}