import { NavBarButton } from "./NavBarButton"

type NavBarProps = {
    getLink: (pageNum: number) => string
    page: number
    hasNext: boolean
    hasPrevious: boolean
    numPages: number
}
export const NavBar = ({
    getLink,
    page,
    hasNext,
    hasPrevious,
    numPages,
}: NavBarProps) => {
    return (
        <div className="flex items-center gap-2">
            <NavBarButton to={page === 1 ? undefined : getLink(page - 1)}>
                {"«"}
            </NavBarButton>
            <NavBarButton to={page === 1 ? undefined : getLink(page - 1)}>
                {"<"}
            </NavBarButton>
            <NavBarButton isMe>{page}</NavBarButton>
            <NavBarButton
                to={page === numPages ? undefined : getLink(page + 1)}
            >
                {">"}
            </NavBarButton>

            <NavBarButton
                to={page === numPages ? undefined : getLink(page + 1)}
            >
                {"»"}
            </NavBarButton>
        </div>
    )
}
