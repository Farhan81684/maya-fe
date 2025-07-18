"use client"
import '@ant-design/v5-patch-for-react-19'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { FacebookIcon, GoogleIcon } from "@/components/Admin/static/Svgs";
import axios from "axios";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { message } from '@/components/app components/message'


export default function LoginPage() {

    const router = useRouter()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const resp = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    email_address: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setLoading(false);

            localStorage.setItem("access_token", resp.data.access_token);
            localStorage.setItem("user", JSON.stringify(resp.data.user));

            message(resp.data.message || "Login successful!", "success");
            router.push("/admin/dashboard");
        }
        catch (error) {
            setLoading(false);
            message(error?.response?.data?.message || "Login failed. Please try again.", "error");
        }

    }

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            message("You are already logged in!", "info");
            router.push("/admin/dashboard");
        }
    }, [])

    return (
        <div className="w-full bg-gray-50 ">
            <div className="grid grid-cols-2 min-h-screen max-w-[1600px] mx-auto gap-24 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
                <div className="flex flex-col justify-center lg:flex-none">
                    <div className="mx-auto w-[90%]">
                        <div className="space-y-7">
                            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">Welcome Back <span className="text-4xl">👋</span></h1>
                            <p className="text-[#313957] text-[1.2rem]">Today is a new day. It's your day. You shape it. <br /> Login to start managing your projects.</p>

                            <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email" className="block text-[1rem] font-medium text-gray-700">Email</label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            placeholder="Example@email.com"
                                            className="block w-full appearance-none rounded-[.75rem] border border-[#D4D7E3] bg-[#F7FBFF] px-5 py-[.9rem] text-[1rem] placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-[1rem] font-medium text-gray-700">Password</label>
                                    <div className="mt-2">
                                        <Input.Password
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            required
                                            placeholder="at least 8 characters"
                                            className="block w-full appearance-none !rounded-[.75rem] !border !border-[#D4D7E3] bg-[#F7FBFF] !px-5 !py-[.9rem] !text-[1rem] placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* <div className="flex items-center justify-end">
                    <div className="text-[1rem]">
                        <Link href="/forgot-password" className="text-purple-500 hover:text-purple-400">
                            Forgot Password?
                        </Link>
                    </div>
                </div> */}

                                <div>
                                    <Button loading={loading} htmlType="submit" className="!bg-purple-500 !text-white hover:!bg-purple-700 !h-14 !text-lg !font-semibold w-full" >
                                        Login
                                    </Button>
                                </div>
                            </form>

                            {/* <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-gray-50 px-2 text-gray-500">Or</span>
                    </div>
                </div> */}

                            {/* <div className="space-y-4">
                    <button type="button" className="flex w-full items-center justify-center gap-3 rounded-[.75rem] bg-white px-4 py-3 text-[.95rem] text-gray-700 hover:bg-gray-50" >
                        <GoogleIcon className="text-[1.75rem]" />
                        Sign in with Google
                    </button>

                    <button
                        type="button"
                        className="flex w-full items-center justify-center gap-3 rounded-[.75rem] bg-white px-4 py-3 text-[.95rem] text-gray-700 hover:bg-gray-50"
                    >
                        <FacebookIcon className="text-[1.75rem]" />
                        Sign in with Facebook
                    </button>
                </div> */}

                            {/* <p className="mt-10 text-center text-[1.1rem] text-gray-600">
                    Having problems Signing In?{" "}
                    <Link href="/signup" className="font-medium text-purple-600 hover:text-purple-500">
                        Contact Us
                    </Link>
                </p> */}
                        </div>
                    </div>
                </div>
                <div className="relative hidden lg:block">
                    <Image
                        className="absolute inset-0 h-full w-full rounded-[1.75rem] object-cover"
                        src="/assets/dashboard/login-art.webp"
                        alt="Artistic heart image"
                        width={1500}
                        height={1500}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}
