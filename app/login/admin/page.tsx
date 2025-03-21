import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AuthForm from '@/components/auth/AuthForm'


const login = () => {
    return (
        <div className='mt-40 flex flex-1 flex-col items-center'>
            <Card className="w-full max-w-md">
                <CardHeader className="mb-4">
                    <CardTitle className="text-center text-3xl">Login</CardTitle>
                </CardHeader>
                <AuthForm type="login" userType="admin"/>
            </Card>
        </div>

    )
}
export default login
