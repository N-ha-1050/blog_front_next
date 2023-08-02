import { Button } from "@/components/Button"
import { SetCenter } from "@/components/SetCenter"
import { Title } from "@/components/Title"
import { deleteUser, getUser } from "@/lib/auth"
import { User } from "@/lib/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import nookies from "nookies"

type Props = {
    user: User
}
const DeleteUser: NextPage<Props> = ({ user }) => {
    const router = useRouter()
    return (
        <SetCenter>
            <Title>Delete User</Title>
            <p className="mb-8">Are You Sure to Delete User: {user.username}</p>
            <div className="flex gap-4">
                <Button onClick={() => router.push("/user")}>
                    Back to User Page
                </Button>
                <Button
                    fill
                    dangerous
                    onClick={async () => {
                        const isOk = await deleteUser()
                        if (isOk) router.push("/login")
                    }}
                >
                    Delete {user.username}
                </Button>
            </div>
        </SetCenter>
    )
}
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const cookies = nookies.get(ctx)
    const user = await getUser({ cookies })
    if (!user) return { redirect: { permanent: false, destination: "/login" } }
    return {
        props: {
            user,
        },
    }
}
export default DeleteUser
