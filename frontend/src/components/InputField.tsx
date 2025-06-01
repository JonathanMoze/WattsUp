type FieldProps = {
    id: string;
    label: string;
    type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = ({ id, label, type = "text", ...props }: FieldProps) => {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
                {...props}
            />
        </div>
    );
};

export default InputField;