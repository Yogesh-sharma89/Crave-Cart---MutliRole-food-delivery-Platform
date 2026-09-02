const Field = ({
    label,
    icon,
    error,
    placeholder,
    autoComplete,
    inputMode,
    ...inputProps
}) => {
    console.log(inputProps);

    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-[#231C12]">
                {label}
            </label>

            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A99A82]">
                    {icon}
                </span>

                <input
                    type="text"
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    inputMode={inputMode}
                    {...inputProps}
                    className="h-12 w-full rounded-2xl border bg-[#F7F1E6] pl-11 pr-4"
                />
            </div>

            {error && <ErrorText message={error.message} />}
        </div>
    );
};

export default Field;