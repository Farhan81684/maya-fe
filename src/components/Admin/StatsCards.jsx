import { ArrowUp, ArrowDown, UsersRound, UserRoundCheck, Presentation } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react";
import { getDateRange } from "./modules/dateFunctions";
import axios from "axios";

const StatsCards = ({ selectedTimeframe, total, totalEmailSent }) => {


    return (
        <div className="bg-white rounded-[2.5rem] mb-6" style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }}>
            <div className="grid grid-cols-2">
                {/* Total Leads Card */}
                <div className="p-4 py-8 relative">
                    <div className="flex items-center justify-center">
                        <div className="bg-green-100 p-[1.625rem] rounded-full">
                            <UsersRound strokeWidth={1.75} className="text-green-600 text-[3rem] w-[3rem] h-[3rem]" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
                            <div className="flex flex-col gap-1 items-baseline mt-1">
                                <p className="text-3xl text-[#333] font-semibold">{total}</p>
                                {/* <div className="flex items-center text-sm text-green-600">
                    <ArrowUp className="h-4 w-4" />
                    <span>18%</span>
                    <span className="text-gray-700">&nbsp;this year</span>
                    </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[50%] translate-y-[-50%] right-0 h-[60%] w-[.15rem] bg-gray-100"></div>
                </div>

                {/* Scheduled Meetings Card */}
                <div className="p-4 py-8 relative">
                    <div className="flex items-center justify-center">
                        <div className="bg-green-100 p-[1.625rem] rounded-full">
                            <UserRoundCheck strokeWidth={1.75} className="text-green-600 text-[3rem] w-[3rem] h-[3rem]" />
                        </div>
                        <div className="ml-6">
                            <h3 className="text-sm font-medium text-gray-500">Total Emails Sent</h3>
                            <div className="flex flex-col gap-1 items-baseline mt-1">
                                <p className="text-3xl text-[#333] font-semibold">{totalEmailSent}</p>
                                {/* <div className="flex items-center text-sm text-red-600">
                    <ArrowDown className="h-4 w-4" />
                    <span>0% this year</span>
                    </div> */}
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[50%] translate-y-[-50%] right-0 h-[60%] w-[.1rem] bg-gray-100"></div>
                </div>

                {/* Upcoming Meetings Card */}

            </div>
        </div>
    )
}

export default StatsCards
