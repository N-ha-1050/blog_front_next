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
        <div className="grid">
            {page !== 1 && page !== 2 && (
                <>
                    <NavBarButton to={getLink(1)}>{1}</NavBarButton>-
                </>
            )}
            {hasPrevious && (
                <NavBarButton to={getLink(page - 1)}>{page - 1}</NavBarButton>
            )}
            <NavBarButton to={getLink(page)}>{page}</NavBarButton>
            {hasNext && (
                <NavBarButton to={getLink(page + 1)}>{page + 1}</NavBarButton>
            )}
            {page !== numPages && page !== numPages - 1 && (
                <>
                    -
                    <NavBarButton to={getLink(numPages)}>
                        {numPages}
                    </NavBarButton>
                </>
            )}
        </div>
    )
}
