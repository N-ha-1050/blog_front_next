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
            <label htmlFor={htmlFor} className="mb-2 block text-sm">
                {label}
            </label>
            <input
                className="block w-full rounded-md border-2 border-blue-200 p-4 text-sm outline-none ring-2 ring-transparent duration-200 focus:border-blue-400 focus:ring-blue-400"
                {...props}
            />
            {message && <p className="mt-2 text-sm text-blue-500">{message}</p>}
            {typeof messages === "object" &&
                Array.isArray(message) &&
                message.map((message) => (
                    <p className="mt-2 text-sm text-blue-500">{message}</p>
                ))}{" "}
        </div>
    )
}
