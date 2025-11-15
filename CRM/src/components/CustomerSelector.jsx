import { useEffect, useState, useRef } from "react";

export function GenericSelector({
  value,
  onChange,
  selectedItem = null,
  label = "Select an option",
  fetchOptions,
  optionValueKey = "value",
  optionLabelKey = "label",
  optionExtraLabel,
  placeholder = "Select...",
  withAsterisk = false,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);

  const handleFormatOptions = (item) => ({
    value: String(item[optionValueKey]),
    label: optionExtraLabel
      ? `${item[optionLabelKey]} ${optionExtraLabel(item)}`
      : String(item[optionLabelKey]),
    raw: item,
  });

  let displayLabel = "";
  if (selectedItem && String(selectedItem[optionValueKey]) === String(value)) {
    displayLabel = optionExtraLabel
      ? `${selectedItem[optionLabelKey]} ${optionExtraLabel(selectedItem)}`
      : String(selectedItem[optionLabelKey]);
  }

  const filteredOptions = !search.trim()
    ? options
    : options.filter(
        (option) =>
          !option.loading &&
          option.label.toLowerCase().includes(search.trim().toLowerCase())
      );

  useEffect(() => {
    const onClick = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const openDropdown = async () => {
    setOpen(true);
    setLoading(true);
    setOptions([{ value: "__loading", label: "Loading...", loading: true }]);

    const list = await fetchOptions();

    setOptions(Array.isArray(list) ? list.map(handleFormatOptions) : []);
    setLoading(false);
  };

  const handleSelect = (option) => {
    if (!option || option.loading) return;

    if (String(option.value) === String(value)) {
      onChange(null);
    } else {
      onChange(option.raw);
    }

    setOpen(false);
    setSearch("");
  };

  const handleClear = (event) => {
    event.stopPropagation();
    onChange(null);
    setSearch("");
    setOpen(false);
  };

  const CheckIcon = (
    <svg
      className="min-h-[1.4em] min-w-[1.4em] h-[1.4em] w-[1.4em] text-gray-500/80"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l4 4 6-8" />
    </svg>
  );

  const TimesIcon = (
    <svg
      className="min-h-[1.4em] min-w-[1.4em] h-[1.4em] w-[1.4em] text-gray-500/80"
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 6l8 8M6 14L14 6"
      />
    </svg>
  );

  const iconColor = error ? "text-red-500" : "text-gray-500/80";

  const UpArrowIcon = (
    <svg
      className={`min-h-[1.4em] min-w-[1.4em] h-[1.4em] w-[1.4em] ${iconColor}`}
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l4-4 4 4" />
    </svg>
  );

  const DownArrowIcon = (
    <svg
      className={`min-h-[1.4em] min-w-[1.4em] h-[1.4em] w-[1.4em] ${iconColor}`}
      fill="none"
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
    </svg>
  );

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block mb-1 text-sm font-medium">
        {label}{" "}
        {withAsterisk && <span className="text-red-500 select-none">*</span>}
      </label>
      <div
        role="button"
        tabIndex={0}
        onClick={openDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openDropdown();
        }}
        className={`border text-sm rounded-md p-2 cursor-pointer flex items-center justify-between bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="flex items-center flex-1 min-w-0">
          {open ? (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={displayLabel || placeholder}
              className={`w-full bg-transparent outline-none ${
                error ? "text-red-600" : "text-gray-800"
              }`}
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div
              className={`w-full truncate ${
                error
                  ? "text-red-600"
                  : displayLabel
                  ? "text-gray-800"
                  : "text-gray-400"
              }`}
            >
              {displayLabel || placeholder}
            </div>
          )}
        </div>
        <div className="ml-2 text-gray-500 select-none flex-shrink-0">
          {value ? (
            <button
              type="button"
              aria-label="Clear selection"
              onClick={handleClear}
              className="focus:outline-none cursor-pointer p-0 flex items-center justify-center"
            >
              {TimesIcon}
            </button>
          ) : open ? (
            UpArrowIcon
          ) : (
            DownArrowIcon
          )}
        </div>
      </div>

      {open && (
        <div className="absolute mt-2 z-50 w-full bg-white border border-gray-200 text-sm rounded-md max-h-70 overflow-y-auto">
          {filteredOptions.length === 0 && !loading && (
            <div className="p-3 text-sm text-gray-500 flex items-center justify-center">
              Nothing found...
            </div>
          )}
          {filteredOptions.map((item) => (
            <div
              key={item.value}
              onClick={() => handleSelect(item)}
              className={`p-2 rounded-md cursor-pointer hover:bg-gray-50 flex items-center gap-2 ${
                item.loading ? "text-gray-400 cursor-default" : ""
              }`}
            >
              {String(item.value) === String(value) &&
                !item.loading &&
                CheckIcon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
}
