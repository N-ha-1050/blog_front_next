import { Button } from "@/components/Button"
import { InputWithLabel } from "@/components/InputWithLabel"
import { SetCenter } from "@/components/SetCenter"
import { Title } from "@/components/Title"
import { changePassword, getUser } from "@/lib/auth"
import { User } from "@/lib/types"
import { GetServerSideProps, NextPage } from "next"
import { useRouter } from "next/router"
import nookies from "nookies"
import React from "react"

type Props = {
    user: User
}

const ChangePassword: NextPage<Props> = ({ user }) => {
    const [newPassword1, seNewPassword1] = React.useState<string>("")
    const [newPassword2, seNewPassword2] = React.useState<string>("")
    const router = useRouter()
    const [data, setData] = React.useState<any>()
    return (
        <SetCenter>
            <Title>Change Password</Title>
            <div className="grid w-60 gap-y-4 md:w-80">
                <InputWithLabel
                    label="New password1"
                    type="password"
                    value={newPassword1}
                    onChange={(e) => seNewPassword1(e.target.value)}
                    message={
                        data?.new_password1 &&
                        typeof data.new_password1 === "object" &&
                        Array.isArray(data.new_password1) &&
                        data.new_password1[0]
                    }
                />
                <InputWithLabel
                    label="New password2"
                    type="password"
                    value={newPassword2}
                    onChange={(e) => seNewPassword2(e.target.value)}
                    message={
                        data?.new_password2 &&
                        typeof data.new_password2 === "object" &&
                        Array.isArray(data.new_password2) &&
                        data.new_password2[0]
                    }
                />
                <Button
                    fill
                    onClick={async () => {
                        const { isOk, data } = await changePassword({
                            newPassword1,
                            newPassword2,
                        })
                        if (isOk) router.push("/user")
                        if (data) setData(data)
                    }}
                >
                    Change
                </Button>
            </div>
            {data &&
                typeof data === "object" &&
                Object.entries(data as { [key: string]: any }).map((entry) => {
                    const [key, value] = entry
                    if (key === "new_password1" || key === "new_password2")
                        return
                    if (
                        (typeof value !== "object" || !Array.isArray(value)) &&
                        typeof value !== "string"
                    )
                        return
                    return (
                        <p className="mt-8">
                            {key}: {value || ""}
                        </p>
                    )
                })}
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

export default ChangePassword
