import React from 'react'
import {
    Card,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import AuthForm from '@/components/auth/AuthForm'


const signUp = () => {
    return (
        <div className='mt-40 flex flex-1 flex-col items-center'>
            <Card className="w-full max-w-md">
                <CardHeader className="mb-4">
                    <CardTitle className="text-center text-3xl">Sign Up</CardTitle>
                </CardHeader>
                <AuthForm type="signUp" userType="student"/>
            </Card>
        </div>

    )
}
export default signUp
