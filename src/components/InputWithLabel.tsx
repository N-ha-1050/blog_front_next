export const InputWithLabel = ({
    label,
    htmlFor,
    message,
    messages,
    ...props
}: {
    label: string
    htmlFor?: string
    message?: string
    messages?: any
} & JSX.IntrinsicElements["input"]) => {
    return (
        <div>
            <label htmlFor={htmlFor} className="block text-sm mb-2">
                {label}
            </label>
            <input
                className="p-4 w-full block ring-2 border-2 ring-transparent duration-200 border-blue-200 rounded-md text-sm outline-none focus:border-blue-400 focus:ring-blue-400"
                {...props}
            />
            {message && <p className="text-sm text-blue-500 mt-2">{message}</p>}
            {typeof messages === "object" &&
                Array.isArray(message) &&
                message.map((message) => (
                    <p className="text-sm text-blue-500 mt-2">{message}</p>
                ))}{" "}
        </div>
    )
}
