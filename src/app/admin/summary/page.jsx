"use client"

import Header from "@/components/Admin/Header";
import SecondHeader from "@/components/Admin/SecondHeader";
import Sidebar from "@/components/Admin/Sidebar";
import StatsCards from "@/components/Admin/StatsCards";
import { ArrowLeft } from "lucide-react";
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


export default function Summary() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("This Year");

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            message("User not authorized. Redirecting to login page.", "error");
            router.push("/admin/login"); // Redirect to login page
        }
    }, [])

    return (
        <div className="poppins flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center">
                {/* Header */}
                <Header />

                {/* Main Dashboard */}
                <main className="flex-1 p-6 px-8 w-full max-w-[90rem]">
                    {/* <SecondHeader selectedTimeframe={selectedTimeframe} setSelectedTimeframe={setSelectedTimeframe} /> */}

                    {/* Stats Cards - Single container with internal separation */}
                    {/* <StatsCards /> */}

                    {/* Summary Section */}
                    <Suspense fallback={<div>Loading...</div>}>
                        <SummarySection />
                    </Suspense>
                </main>
            </div>
        </div>
    )
}


const SummarySection = () => {
    const searchParams = useSearchParams();
    const data = searchParams.get('data') ? JSON.parse(searchParams.get('data')) : null;
    const name = searchParams.get('name') || "Unknown";

    const router = useRouter();

    return (
        <div className="w-full bg-white rounded-[2.5rem]" style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }}>
            {/* Header with profile */}
            <div className="flex items-center gap-5 p-7 pb-6 pt-8 border-b-2 border-gray-200">
                <button onClick={() => router.push('/admin/cta')} className="text-gray-500 hover:text-gray-700 bg-[#F1F1F1] p-[.35rem] rounded-sm">
                    <ArrowLeft size={22} strokeWidth={2.5} />
                </button>
                <div className="flex items-center gap-4">
                    <div>
                        <h2 className="font-semibold text-lg">{name === "-" ? "Unknown" : name}</h2>
                        {/* <div className="flex items-center gap-1">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-600">Online</span>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Conversation content */}
            <div className="min-h-[65vh] p-10 px-20 text-[#292D32] text-[.95rem]">
                {data
                    ? <div
                        dangerouslySetInnerHTML={{
                            __html: data.replace(/\n/g, '<br/>'),
                        }}
                    />
                    : <>
                        <div className="mb-6">
                            <h3 className="font-medium mb-1">Topic Discussed:</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>The conversation centered around strategies for marketing a book and increasing sales.</li>
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-medium mb-1">Key Points:</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>
                                    Book Launch Strategy: Discussion about planning a book launch with a focus on social media marketing and
                                    leveraging influencers.
                                </li>
                                <li>
                                    Target Audience: Identified the importance of knowing the target audience and tailoring content to their
                                    preferences.
                                </li>
                                <li>
                                    Pricing Strategy: Explored various pricing strategies, including discounted launches and bundling with
                                    other products.
                                </li>
                                <li>
                                    Advertising Channels: Talked about using paid ads on platforms like Facebook, Amazon, and Google to
                                    reach potential readers.
                                </li>
                                <li>
                                    Engagement and Reviews: Emphasized the significance of getting reviews, especially early on, and
                                    building engagement through email newsletters or community platforms.
                                </li>
                                <li>
                                    Partnerships: Mentioned collaborating with bloggers, podcasts, or YouTube channels for cross-promotion
                                    and book exposure.
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-medium mb-1">Action Items:</h3>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Research and select relevant influencers to promote the book.</li>
                                <li>Finalize pricing strategy for launch.</li>
                                <li>Set up paid ad campaigns across selected platforms.</li>
                                <li>Start building an email list for future marketing efforts.</li>
                            </ul>
                        </div>
                    </>}

            </div>
        </div>
    )
}