import Link from "next/link"

export type MenuContentProps = {
    text: string
    to: string
}

// export const MenuContent = ({ text, to }: MenuContentProps) => {
//     return (
//         <Link href={to} className="w-full md:w-auto">
//             <li className="text-center hover:bg-blue-200 m-2 p-2 rounded duration-200">
//                 {text}
//             </li>
//         </Link>
//     )
// }

// export const MenuContent2 = ({ text, to }: MenuContentProps) => {
//     return (
//         <li className="block w-full md:w-auto text-center">
//             <Link
//                 href={to}
//                 className=" hover:bg-blue-200 m-2 p-2 rounded duration-200"
//             >
//                 {text}
//             </Link>
//         </li>
//     )
// }

export const MenuContent = ({ text, to }: MenuContentProps) => {
    return (
        <li className="self-stretch ">
            <Link href={to}>
                <p className="m-2 rounded p-2 text-center text-blue-950 duration-200 hover:bg-blue-200 hover:opacity-80">
                    {text}
                </p>
            </Link>
        </li>
    )
}
