import type { ReactNode } from "react"

type AuthCardProps = {
    title: string,
    children: ReactNode
}

const AuthCard = ({ title, children }: AuthCardProps) => {
    return (
        <div className="min-h-screen flex items-center justify-center from-green-100 to-green-200">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">{title}</h1>
                {children}
            </div>
        </div>
    )
}

export default AuthCard