"user client"
import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  className,
  wrapperClassName,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className={`relative mr-2 ${wrapperClassName || ""}  `}>
      <input
        className={`w-full outline-1 border outline-[#B3B3B380] border-[#B3B3B380] border-opacity-50 rounded focus:border-primary focus:outline-primary h-fit pl-7 pr-4 py-2 text-base ${
          className || ""
        }`}
        style={{ borderRadius: 4 }}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search"}
      />
      <FiSearch className="absolute top-3.5 left-2.5 text-gray-500" />
    </div>
  );
};
export default SearchInput;
