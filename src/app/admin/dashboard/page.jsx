"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { FaUser } from "react-icons/fa";
import { BarChartIcon } from "@/components/Admin/static/Svgs";
import Header from "@/components/Admin/Header";
import SecondHeader from "@/components/Admin/SecondHeader";
import Sidebar from "@/components/Admin/Sidebar";

export default function DashboardUIOnly() {
  const [dashboardData, setDashboardData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState("Today");
  console.log("selectedTimeframe", selectedTimeframe);
  const [loading, setLoading] = useState(false);

  const conversationsTemplate = [
    {
      name: "Conversations",
      value: dashboardData?.tatalConversations ?? 0,
      bg: "bg-blue-100",
      icon: <FaUser className="text-[1.875rem] text-[#396AFF]" />,
    },
    {
      name: "Total Messages",
      value: Number(dashboardData?.totalMessages ?? 0).toLocaleString(),
      bg: "bg-yellow-100",
      icon: <BarChartIcon className="text-[1.875rem] text-green-500" />,
    },
    {
      name: "Booked Meetings",
      value: dashboardData?.totalMeetingsBooked ?? 0,
      bg: "bg-purple-100",
      icon: <BarChartIcon className="text-[1.875rem] text-purple-500" />,
    },
    {
      name: "Subscription Page Visits",
      value: dashboardData?.totalSPVClicked ?? 0,
      bg: "bg-teal-100",
      icon: <BarChartIcon className="text-[1.875rem] text-teal-500" />,
    },
  ];

  const colors = [
    { color: "yellow-500", hex: "#FFBB38", bg: "yellow-100" },
    { color: "red-400", hex: "#ffa2a2", bg: "red-100" },
    { color: "teal-500", hex: "#00bba7", bg: "teal-100" },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
          {
            params: { timeframe: selectedTimeframe },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(response.data);
        setDashboardData(response.data);
        setChartData(response.data.chartData || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [selectedTimeframe]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 w-full px-10 mx-auto py-6">
          <SecondHeader
            selectedTimeframe={selectedTimeframe}
            setSelectedTimeframe={setSelectedTimeframe}
            onClickExport={() => {}}
          />

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
            {conversationsTemplate.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[1.56rem] p-6"
                style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }}
              >
                <div className="flex items-center">
                  <div className={`${card.bg} p-[1.25rem] rounded-full`}>
                    {card.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-[1rem] text-[#718EBF]">{card.name}</h3>
                    <p className="text-[1.25rem] text-[#232323] font-semibold">
                      {card.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Analytics Section */}
          <div className="mb-10">
            <h3 className="text-2xl text-[#333B69] font-semibold mb-6">
              Analytics
            </h3>

            {/* Averages Summary */}
            <div
              className="w-full bg-white rounded-[1.56rem] p-6 mb-8"
              style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }}
            >
              <div className="flex items-center justify-between flex-wrap md:flex-nowrap gap-6 text-[#232323] w-full">
                {/* Icon + Heading */}
                <div className="flex items-center gap-4">
                  <div className="p-[.95rem] rounded-[1.25rem] bg-yellow-100">
                    <BarChartIcon
                      className="text-[1.875rem]"
                      style={{ color: colors[2].hex }}
                    />
                  </div>
                  <h2 className="text-xl font-bold">ConverAIx</h2>
                </div>

                {/* Messages per Conversation */}
                <div className="flex flex-col items-center flex-1">
                  <p className="text-2xl font-bold">
                    {dashboardData
                      ? Math.round(dashboardData.averageMessagesPerConversation)
                      : "0"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Messages per Conversation
                  </p>
                </div>

                {/* Meetings Booked */}
                <div className="flex flex-col items-center flex-1">
                  <p className="text-2xl font-bold">
                    {dashboardData
                      ? `${(
                          dashboardData.averageMeetingsBookedPerConversation *
                          100
                        ).toFixed(0)}%`
                      : "0%"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">Meetings Booked</p>
                </div>

                {/* SPV Clicked */}
                <div className="flex flex-col items-center flex-1">
                  <p className="text-2xl font-bold">
                    {dashboardData
                      ? `${(
                          dashboardData.averageSPVClickedPerConversation * 100
                        ).toFixed(0)}%`
                      : "0%"}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Subscription Page Visits
                  </p>
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Conversations Line Chart */}
              <div
                className="bg-white rounded-[1.56rem] p-6"
                style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }}
              >
                <h3 className="text-xl font-semibold text-[#333B69] mb-4">
                  Conversations Chart
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="conversations"
                        stroke="#5630fcff"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Meetings Histogram (BarChart) */}
              <div
                className="bg-white rounded-[1.56rem] p-6"
                style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }}
              >
                <h3 className="text-xl font-semibold text-[#333B69] mb-4">
                  Meetings Distribution
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="meetings" fill="#5630fcff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
