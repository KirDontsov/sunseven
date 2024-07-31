import { $category, $firm, PriceCategory, PriceItem } from '@/api';
import { SectionHeader } from '@/widgets';
import { useUnit } from 'effector-react';
import groupBy from 'lodash/groupBy';
import { FC } from 'react';
import styles from './prices.module.scss';

export interface PricesProps {
  prices: { prices_items: PriceItem[] | null; prices_categories: PriceCategory[] | null };
}

export const Prices: FC<PricesProps> = ({ prices }) => {
  const { prices_items, prices_categories } = prices;
  const { firm, category } = useUnit({
    firm: $firm,
    category: $category,
  });

  const itemsByCategories = groupBy(prices_items, 'price_category_id');
  if (!Object.entries(itemsByCategories)?.length) {
    return <></>;
  }
  return (
    <>
      <SectionHeader id="prices" title={`Цены ${category?.name?.slice(0, -1).toLowerCase()}а ${firm?.name}`} />
      <div className={`${styles.myCustomStyle} list-disc`}>
        {Object.entries(itemsByCategories)?.map(([category, items]) => (
          <div key={category}>
            {prices_categories?.find((cat) => cat?.price_category_id === category)?.name} -{' '}
            {prices_categories?.find((cat) => cat?.price_category_id === category)?.value}
            <ul>
              {items?.map((x) => (
                <li key={x?.price_item_id}>
                  {x?.name} - {x?.value?.replace('&nbsp;', '')}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* TODO: подумать над отображением категорий и позиций */}
      {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-eboni-50 dark:bg-eboni-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-eboni-900 even:bg-eboni-50 even:dark:bg-eboni-800 border-b dark:border-zinc-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-negroni-600 dark:text-negroni-400 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-eboni-900 even:bg-eboni-50 even:dark:bg-eboni-800 border-b dark:border-zinc-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Microsoft Surface Pro
              </th>
              <td className="px-6 py-4">White</td>
              <td className="px-6 py-4">Laptop PC</td>
              <td className="px-6 py-4">$1999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-negroni-600 dark:text-negroni-400 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-eboni-900 even:bg-eboni-50 even:dark:bg-eboni-800 border-b dark:border-zinc-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Magic Mouse 2
              </th>
              <td className="px-6 py-4">Black</td>
              <td className="px-6 py-4">Accessories</td>
              <td className="px-6 py-4">$99</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-negroni-600 dark:text-negroni-400 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
            <tr className="odd:bg-white odd:dark:bg-eboni-900 even:bg-eboni-50 even:dark:bg-eboni-800 border-b dark:border-zinc-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Google Pixel Phone
              </th>
              <td className="px-6 py-4">Gray</td>
              <td className="px-6 py-4">Phone</td>
              <td className="px-6 py-4">$799</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-negroni-600 dark:text-negroni-400 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Apple Watch 5
              </th>
              <td className="px-6 py-4">Red</td>
              <td className="px-6 py-4">Wearables</td>
              <td className="px-6 py-4">$999</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-negroni-600 dark:text-negroni-400 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </>
  );
};
