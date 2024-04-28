"user client"
import ReactPaginate from "react-paginate";
import { useI18n } from "../../contexts/i18n";

const Pagination = ({
  page,
  total,
  limit,
  totalPages,
  onPageChange,
  onSizeChange,
}) => {
  const pageCount = totalPages ? Math.ceil(totalPages) : 1;
  const i18n = useI18n()

  return (
    <div className="flex flex-wrap justify-between mb-2">
      <div className="flex items-center !mb-6 md:!mb-0 ">
        {onSizeChange && (
          <div className="flex items-center mr-3 text-sm text-gray-700 h-[24px]">
            {i18n?.t('Show')}
            <select
              value={limit}
              onChange={(e) => {
                onSizeChange(+e.target.value);
              }}
              className="h-[24px] px-1 rounded mx-2 text-center focus:outline-0"
            >
              <option value={10}>{i18n?.t('10')}</option>
              <option value={25}>{i18n?.t('25')}</option>
              <option value={50}>{i18n?.t('50')}</option>
              <option value={100}>{i18n?.t('100')}</option>
            </select>
          </div>
        )}
        <p className="text-sm text-gray-700">
          {i18n?.t('Showing')} {(page - 1) * limit + 1 || 0}
          &nbsp;{i18n?.t('to')} {Math.min(total || 0, page * limit || 0)} {i18n?.t('of')} {total || 0}{" "}
          {i18n?.t('entries')}
        </p>
      </div>

      <ReactPaginate
        breakLabel="..."
        previousLabel={i18n?.t('Previous')}
        disabledLinkClassName="text-gray-300"
        previousLinkClassName="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-l"
        nextLinkClassName="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-r"
        pageLinkClassName="text-sm bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4"
        pageClassName="!mb-3 md:!mb-0"
        activeLinkClassName="!text-mainColor"
        nextLabel={i18n?.t('Next')}
        className="flex flex-wrap"
        onPageChange={({ selected }) => onPageChange(selected + 1)}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default Pagination;
