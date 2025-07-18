"use client"

import { useState, useRef, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer, Cell } from "recharts"
import { FaUser } from "react-icons/fa"
import { BarChartIcon } from "@/components/Admin/static/Svgs"
import Header from "@/components/Admin/Header"
import SecondHeader from "@/components/Admin/SecondHeader"
import Sidebar from "@/components/Admin/Sidebar"
import axios from "axios"
import { getDateRange } from "@/components/Admin/modules/dateFunctions"
import { message } from "@/components/app components/message"
import { useRouter } from "next/navigation"
import moment from "moment"

const compaines = ['smoothai'];

const conversationsTemplate = [
  {
    key: "total",
    name: "Conversations",
    value: 0,
    bg: "bg-blue-100",
    icon: <FaUser className="text-[1.875rem] text-[#396AFF]" />,
  },
  {
    key: "smoothai",
    name: "Total Messages",
    value: 0,
    bg: "bg-yellow-100",
    icon: <BarChartIcon className="text-[1.875rem] text-green-500" />,
  },
  {
    key: "meetings",
    name: "Booked Meetings",
    value: 0,
    bg: "bg-purple-100",
    icon: <BarChartIcon className="text-[1.875rem] text-purple-500" />,
  },
  {
    key: "purchases",
    name: "Subscription Page Visits",
    value: 0,
    bg: "bg-teal-100",
    icon: <BarChartIcon className="text-[1.875rem] text-teal-500" />,
  },

];

// // Sample data for the line chart
const lineChartData = [
  { name: "Jan", smoothai: 1 },
  { name: "Feb", smoothai: 1 },
  { name: "Mar", smoothai: 1 },
  { name: "Apr", smoothai: 1 },
  { name: "May", smoothai: 1 },
  { name: "Jun", smoothai: 1 },
  { name: "Jul", smoothai: 1 },
  { name: "Aug", smoothai: 1 },
  { name: "Sep", smoothai: 1 },
  { name: "Oct", smoothai: 1 },
  { name: "Nov", smoothai: 1 },
  { name: "Dec", smoothai: 1 },
]

const colors = [
  { color: 'yellow-500', hex: '#FFBB38', bg: 'yellow-100' },
  // { color: 'red-400', hex: '#FF82AC', bg: 'red-100' },
  // { color: 'teal-500', hex: '#16DBCC', bg: 'teal-100' },
  { color: 'red-400', hex: '#ffa2a2', bg: 'red-100' },
  { color: 'teal-500', hex: '#00bba7', bg: 'teal-100' },
]

// Sample data for the bar chart
const barChartData = [
  // { name: "Smooth AI", value: 1450, color: "#FFBB38" },
  // { name: "US-Analytics", value: 1850, color: "#FF82AC" },
  // { name: "RocketScreens", value: 1150, color: "#16DBCC" },
  { name: "Smooth AI", value: 1450, color: colors[0]?.hex },
]

const talkTimeData = [
  { name: 'Maya AI', key: "smoothai", minutes: 0, avg: 0 },

]

const conversionsData = [
  { name: 'Maya AI', key: "smoothai", purchase: '11.92%', meeting: '25.02%' }
]



export default function Dashboard() {

  const router = useRouter()

  const [selectedTimeframe, setSelectedTimeframe] = useState("Today");
  const [conversations, setConversations] = useState(conversationsTemplate || []);
  const [conversationsChart, setConversationsChart] = useState(lineChartData || []);
  const [talkTime, setTalkTime] = useState(talkTimeData || []);
  const [conversions, setConversions] = useState(conversionsData || []);

  const [conversationsResponse, setConversationsResponse] = useState({});
  const [talkTimeResponse, setTalkTimeResponse] = useState({});
  const [purchasesResponse, setPurchasesResponse] = useState({});
  const [meetingsResponse, setMeetingsResponse] = useState({});
  const [meetingsResponseGraph, setMeetingsResponseGraph] = useState([]);

  const [purchaseClicks, setPurchaseClicks] = useState(0);


  useEffect(() => {
    const { startDate, endDate } = getDateRange(selectedTimeframe);
    // console.log('startDate: ', startDate, 'endDate: ', endDate);
    const fetchConversations = async () => {
      console.log(localStorage.getItem("access_token"))
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/conversations/range`,
          {
            project_names: compaines,
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          }
        );
        console.log('response in /conversations: ', response?.data);
        setConversationsResponse(response?.data);

        let total = 0;
        const data = conversationsTemplate.map((item) => {
          const key = item.key;
          if (response?.data[key]) {
            item.value = response?.data[key];
            total += response?.data[key];
          } else {
            item.value = 0;
          }
          return item;
        });
        data[0].value = total;
        setConversations(data);

        localStorage.setItem("total_leads", JSON.stringify(data[0]))
      } catch (error) {
        console.error("Error in /conversations: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };
    const fetchConversationsBarChart = async (type) => {
      try {
        // const { startDate, endDate } = getDateRange('This Year');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/conversations/range`,
          {
            project_names: compaines,
            start_date: startDate,
            end_date: endDate,
            yearlyChart: true,
            timeframe: selectedTimeframe,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          });


        let chartData = response?.data;

        if (selectedTimeframe === 'This Week' || selectedTimeframe === 'Last Week') {
          const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

          chartData = chartData.map((item, index) => ({
            ...item,
            name: dayNames[index] || item.name, // Fallback in case index is out of bounds
          }));
        }

        if (selectedTimeframe === "Today") {
          if (chartData.length > 0) {
            chartData = chartData.map(item => ({
              ...item,
              name: String(Number(item?.name))
            }));
          }
          else chartData = [
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" },
            { "smoothai": 0, "name": "00" }
          ];
        }

        setConversationsChart(chartData);
      } catch (error) {
        console.error("Error in /conversations-barchart: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };
    const fetchPurchases = async () => {
      try {
        const { startDate, endDate } = getDateRange(selectedTimeframe);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/conversions/range`,
          {
            project_names: compaines,
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          }
        );
        console.log('response in /conversions: ', response?.data);
        setPurchasesResponse(response?.data);
      } catch (error) {
        console.error("Error in /conversions: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };
    const fetchMeetings = async () => {
      try {
        const { startDate, endDate } = getDateRange(selectedTimeframe);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/scheduled-meetings/range`,
          {
            project_names: compaines,
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          });
        console.log('response in /scheduled-meetings: ', response?.data);
        setMeetingsResponse(response?.data);
        localStorage.setItem("scheduled_meetings", JSON.stringify(response?.data))
      } catch (error) {
        console.error("Error in /scheduled-meetings: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };
    const fetchMeetingsGraph = async () => {
      try {
        const { startDate, endDate } = getDateRange(selectedTimeframe);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/scheduled-meetings/timeframe`,
          {
            project_names: compaines,
            start_date: startDate,
            end_date: endDate,
            timeframe: selectedTimeframe,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          });
        console.log('response in /scheduled-meetings/graph: ', response?.data);
        let chartData = response?.data;
        if (selectedTimeframe === 'This Week' || selectedTimeframe === 'Last Week') {
          const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

          chartData = chartData.map((item, index) => ({
            ...item,
            name: dayNames[index] || item.name, // Fallback in case index is out of bounds
          }));
        }
        if (selectedTimeframe === "Today") {
          const totalSmoothAI = chartData.reduce((sum, item) => sum + (item.smoothai || 0), 0);

          chartData = [{
            name: "Today",
            smoothai: totalSmoothAI
          }];
        }
        setMeetingsResponseGraph(chartData);
      } catch (error) {
        console.error("Error in /scheduled-meetings: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };
    const fetchTalkTime = async () => {
      try {
        const { startDate, endDate } = getDateRange(selectedTimeframe);
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/talk-time/range`,
          {
            project_names: compaines,
            start_date: startDate,
            end_date: endDate,
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          }
        );
        console.log('response in /talk-time: ', response?.data);
        setTalkTimeResponse(response?.data);
      } catch (error) {
        console.error("Error in /talk-time: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };

    const asyncFunction = async () => {
      await Promise.all([
        fetchConversations(),
        fetchPurchases(),
        fetchMeetings(),
        fetchTalkTime(),
        fetchConversationsBarChart(),
        fetchMeetingsGraph()
      ]);
    }

    asyncFunction();
  }, [selectedTimeframe]);

  const exportConversationsCSV = async () => {
    let headersMap = {
      "Today": 'Hours,No. of conversations',
      "This Week": 'Days,No. of conversations',
      "This Month": 'Days,No. of conversations',
      "This Quarter": 'Quarter,No. of conversations',
      "This Year": 'Months,No. of conversations',
      "Last Week": 'Days,No. of conversations',
      "Last Month": 'Days,No. of conversations',
      "Last Quarter": 'Quarter,No. of conversations',
      "Last Year": 'Months,No. of conversations',
    }
    const rows = conversationsChart.map(obj => `${obj.name},${obj.smoothai}`).join('\n');
    const csvContent = `${headersMap[selectedTimeframe]}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `conversations-graph-${selectedTimeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportBookMeetingCSV = async () => {
    let headersMap = {
      "Today": 'Hours,No. of meetings booked',
      "This Week": 'Days,No. of meetings booked',
      "This Month": 'Days,No. of meetings booked',
      "This Quarter": 'Quarter,No. of meetings booked',
      "This Year": 'Months,No. of meetings booked',
      "Last Week": 'Days,No. of meetings booked',
      "Last Month": 'Days,No. of meetings booked',
      "Last Quarter": 'Quarter,No. of meetings booked',
      "Last Year": 'Months,No. of meetings booked',
    }
    const rows = meetingsResponseGraph.map(obj => `${obj.name},${obj.smoothai}`).join('\n');
    const csvContent = `${headersMap[selectedTimeframe]}\n${rows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `booked-meeting-graph-${selectedTimeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportGlobalDashboardCSV = () => {
    const headersMapConversations = {
      "Today": "Hours,No. of conversations",
      "This Week": "Days,No. of conversations",
      "This Month": "Days,No. of conversations",
      "This Quarter": "Quarter,No. of conversations",
      "This Year": "Months,No. of conversations",
      "Last Week": "Days,No. of conversations",
      "Last Month": "Days,No. of conversations",
      "Last Quarter": "Quarter,No. of conversations",
      "Last Year": "Months,No. of conversations",
    };

    const headersMapBookedMeetings = {
      "Today": "Hours,No. of meetings booked",
      "This Week": "Days,No. of meetings booked",
      "This Month": "Days,No. of meetings booked",
      "This Quarter": "Quarter,No. of meetings booked",
      "This Year": "Months,No. of meetings booked",
      "Last Week": "Days,No. of meetings booked",
      "Last Month": "Days,No. of meetings booked",
      "Last Quarter": "Quarter,No. of meetings booked",
      "Last Year": "Months,No. of meetings booked",
    };

    const getStatValue = (name) => {
      if (name === "Talk Time") return formatTimeFromMinutes(talkTime[0]?.minutes || 0);
      if (name === "Pricing Page Visits") return purchaseClicks;
      if (name === "Booked Meetings") return meetingsResponse?.smoothai;
      return conversations.find((card) => card.name === name)?.value || 0;
    };

    const totalConversations = getStatValue("Conversations");
    const totalTalkTime = getStatValue("Talk Time");
    const totalBookedMeetings = getStatValue("Booked Meetings");
    const totalPricingPageVisits = getStatValue("Pricing Page Visits");
    const avgTalkTime = talkTime[0]?.avg || 'N/A';

    const bookedMeetingPercent = isNaN((meetingsResponse?.smoothai / totalConversations) * 100)
      ? '0%'
      : `${((meetingsResponse?.smoothai / totalConversations) * 100).toFixed(2)}%`;

    const pricingVisitPercent = isNaN((purchaseClicks / totalConversations) * 100)
      ? '0%'
      : `${((purchaseClicks / totalConversations) * 100).toFixed(2)}%`;

    const dailyConversationRows = conversationsChart.map(obj => `${obj.name},${obj.smoothai}`).join('\n');
    const dailyMeetingsRows = meetingsResponseGraph.map(obj => `${obj.name},${obj.smoothai}`).join('\n');

    const csvContent =
      `==============================\n` +
      `SMOOTH AI DASHBOARD SUMMARY FOR ${selectedTimeframe.toUpperCase()}\n` +
      `==============================\n\n` +
      `Total Conversations ${selectedTimeframe},${totalConversations}\n` +
      `Total Talk Time ${selectedTimeframe},${totalTalkTime}\n` +
      `Total Booked Meetings ${selectedTimeframe},${totalBookedMeetings}\n` +
      `Total Pricing Page Visits ${selectedTimeframe},${totalPricingPageVisits}\n` +
      `Messages Per Conversation ${selectedTimeframe},${avgTalkTime}\n` +
      `Booked Meeting % ${selectedTimeframe},${bookedMeetingPercent}\n` +
      `Conversations per Day\n${headersMapConversations[selectedTimeframe]}\n${dailyConversationRows}\n\n` +
      `Booked Meetings per Day\n${headersMapBookedMeetings[selectedTimeframe]}\n${dailyMeetingsRows}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `smoothai-dashboard-summary-${selectedTimeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    console.log({ talkTimeResponse, conversationsResponse, meetingsResponse, purchasesResponse, conversations, conversions, talkTime, conversationsChart });
    const keys = Object.keys(talkTimeResponse);
    const data = talkTimeData.map((item) => {
      const key = item.key;
      if (keys.includes(key)) {
        item.minutes = Number((talkTimeResponse[key] / 60).toFixed(2));

        let avgSeconds = Math.floor(talkTimeResponse[key] / conversationsResponse[key]) || 0;
        let hours = Math.floor(avgSeconds / 3600);
        let minutes = Math.floor((avgSeconds % 3600) / 60);
        let seconds = avgSeconds % 60;

        hours = isFinite(hours) ? Math.round(hours) : 0;
        minutes = isFinite(minutes) ? Math.round(minutes) : 0;
        seconds = isFinite(seconds) ? Math.round(seconds) : 0;

        item.avg = `${hours}h ${minutes}m ${seconds}s`;
      } else {
        item.minutes = 0;
        item.avg = "0h 0m 0s";
      }
      return item;
    });

    setTalkTime(data);

    setConversions(prev => {
      return prev.map((item) => {
        const key = item.key;
        if (meetingsResponse[key]) {
          item.meeting = ((meetingsResponse[key] / conversationsResponse[key]) * 100).toFixed(2);
        } else {
          item.meeting = 0;
        }
        return item;
      });
    });

    setConversions(prev => {
      return prev.map((item) => {
        const key = item.key;
        if (purchasesResponse[key]) {
          item.purchase = (purchasesResponse[key] / conversationsResponse[key] * 100).toFixed(2);
        } else {
          item.purchase = 0;
        }
        return item;
      });
    });
  }, [talkTimeResponse, conversationsResponse, meetingsResponse, purchasesResponse, selectedTimeframe]);


  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      message("User not authorized. Redirecting to login page.", "error");
      router.push("/admin/login"); // Redirect to login page
    }
  }, [])

  useEffect(() => {
    const fetchPurchaseClicks = async () => {
      const { startDate, endDate } = getDateRange(selectedTimeframe);

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/util/kpi?start_date=${moment(startDate).format("YYYY-MM-DD")}&end_date=${moment(endDate).format("YYYY-MM-DD")}`,
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          }
        );
        console.log('response in /KPIs: ', response?.data);
        setPurchaseClicks(response?.data?.kpis[0]?.purchase_clicks);

      } catch (error) {
        console.error("Error in /KPIs: ", error?.message || error?.response?.data?.message || error?.response?.data || error);
      }
    };

    fetchPurchaseClicks()
  }, [selectedTimeframe])

  function formatTimeFromMinutes(minutes) {
    if (!isFinite(minutes) || isNaN(minutes)) {
      return `0h 0m 0s`;
    }

    const totalSeconds = minutes * 60;

    let hours = Math.floor(totalSeconds / 3600);
    let remainingSeconds = totalSeconds % 3600;
    let mins = Math.floor(remainingSeconds / 60);
    let secs = Math.floor(remainingSeconds % 60);

    // Handle NaN or Infinity just in case
    hours = isFinite(hours) ? Math.round(hours) : 0;
    mins = isFinite(mins) ? Math.round(mins) : 0;
    secs = isFinite(secs) ? Math.round(secs) : 0;

    return `${hours}h ${mins}m ${secs}s`;
  }

  let intervalMap = {
    "Today": 10,
    "This Month": 9,
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Dashboard */}
        <main className="flex-1 w-full px-10 mx-auto py-6">
          {/* Timeframe Controls */}
          <SecondHeader selectedTimeframe={selectedTimeframe} setSelectedTimeframe={setSelectedTimeframe} onClickExport={() => exportGlobalDashboardCSV()} />


          {/* Stats Cards */}
<div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-6 mb-8">
  {conversations.map((card, idx) => (
    <div
      key={idx}
      className="bg-white rounded-[1.56rem] p-6"
      style={{ boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.50)' }}
    >
      <div className="flex items-center">
        <div className={`${card.bg} p-[1.25rem] rounded-full`}>
          {card.icon}
        </div>
        <div className="ml-4">
          <h3 className="text-[1rem] text-[#718EBF]">{card.name}</h3>
          <div className="flex items-baseline mt-1">
            <p className="text-[1.25rem] text-[#232323] font-semibold">
              {
                card?.name === "Talk Time"
                  ? formatTimeFromMinutes(talkTime[0]?.minutes)
                  : card?.name === "Pricing Page Visits"
                    ? purchaseClicks
                    : card?.name === "Booked Meetings"
                      ? meetingsResponse?.smoothai
                      : card.value
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


{/* Analytics Section (Talk Time + Conversion Rates) */}
<div className="mb-10">
  <h3 className="text-2xl text-[#333B69] font-semibold mb-6">Analytics</h3>

  <div
    className="bg-white rounded-[1.56rem] p-6"
    style={{ boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.50)' }}
  >
    <div className="flex flex-wrap justify-between items-start gap-y-6 text-[#232323] text-[1.15rem]">
      {/* Messages Per Conversation */}
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className={"p-[.95rem] rounded-[1.25rem] " + ` bg-${colors[0 % colors.length].bg}`}>
          <BarChartIcon
            className={'text-[1.875rem]' + ` text-${colors[0 % colors.length].color}`}
            style={{ color: colors[0 % colors.length]?.hex }}
          />
        </div>
        <div>
          <h3 className="font-semibold">Messages Per Conversation</h3>
          <p className="text-lg font-bold mt-1">{talkTime[0]?.avg ?? "0"}</p>
        </div>
      </div>

      {/* Booked Meetings */}
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className={"p-[.95rem] rounded-[1.25rem] " + ` bg-${colors[1 % colors.length].bg}`}>
          <BarChartIcon
            className={'text-[1.875rem]' + ` text-${colors[1 % colors.length].color}`}
            style={{ color: colors[1 % colors.length]?.hex }}
          />
        </div>
        <div>
          <h3 className="font-semibold">Booked Meetings</h3>
          <p className="text-lg font-bold mt-1">
            {isNaN((meetingsResponse?.smoothai / conversations[0]?.value) * 100)
              ? '0%'
              : (() => {
                  const percentage =
                    (meetingsResponse?.smoothai / conversations[0]?.value) * 100;
                  return Number.isInteger(percentage)
                    ? `${percentage}%`
                    : `${percentage.toFixed(2)}%`;
                })()}
          </p>
        </div>
      </div>

      {/* Subscription Rate */}
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className={"p-[.95rem] rounded-[1.25rem] " + ` bg-${colors[2 % colors.length].bg}`}>
          <BarChartIcon
            className={'text-[1.875rem]' + ` text-${colors[2 % colors.length].color}`}
            style={{ color: colors[2 % colors.length]?.hex }}
          />
        </div>
        <div>
          <h3 className="font-semibold">Subscription Rate</h3>
          <p className="text-lg font-bold mt-1">
            {isNaN((purchaseClicks / conversations[0]?.value) * 100)
              ? '0%'
              : `${((purchaseClicks / conversations[0]?.value) * 100).toFixed(2)}%`}
          </p>
        </div>
      </div>
    </div>
  </div>
</div>



          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-10 mb-8 mt-8">
            {/* Conversations Line Chart */}
            <div className="wrapper">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl text-[#333B69] font-semibold">Conversations</h3>
                {/* <button className="bg-purple-600 text-xs text-white px-4 py-2 rounded-lg flex items-center" onClick={() => exportConversationsCSV()}>
                  Export CSV
                  <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button> */}
              </div>
              <div className="bg-white rounded-[1.56rem] py-6 pr-6" style={{ boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.50)' }}>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={conversationsChart} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} padding={{ left: 30 }} interval={0} tick={{ fontSize: intervalMap[selectedTimeframe] || 12 }} tickMargin={10} />
                      <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip />
                      <Line
                        // type="monotone"
                        type="linear"
                        dataKey="smoothai"
                        stroke={colors[0]?.hex}
                        strokeWidth={3}
                        // dot={{ r: 6, fill: colors[1]?.hex, strokeWidth: 0 }}
                        dot={{ r: 5, fill: '#fff', strokeWidth: 3.5 }}
                        activeDot={{ r: 8 }}
                        name="Total conversations"
                      />
                    </LineChart>
                    {selectedTimeframe === "Today" ? <div className="text-center text-[10px] ml-12 -mt-2 text-gray-500">Hours (UTC)</div> : <></>}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Scheduled Meetings Bar Chart */}
            <div className="wrapper">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl text-[#333B69] font-semibold">Booked Meetings</h3>
                {/* <button className="bg-purple-600 text-xs text-white px-4 py-2 rounded-lg flex items-center" onClick={() => exportBookMeetingCSV()}>
                  Export CSV
                  <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button> */}
              </div>
              <div className="bg-white rounded-[1.56rem] p-6 h-[90%]" style={{ boxShadow: '0px 10px 60px rgba(226, 236, 249, 0.50)' }}>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={meetingsResponseGraph?.map(x => { return { name: x?.name, value: x?.smoothai, color: colors[0]?.hex } })} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} interval={0} tick={{ fontSize: intervalMap[selectedTimeframe] || 12 }} tickMargin={10} />
                      <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[2, 2, 0, 0]} barSize={95} name={"Total Booked Meetings"}>
                        {meetingsResponseGraph?.map(x => { return { name: x?.name, value: x?.smoothai, color: colors[0]?.hex } }).map((entry, index) => (
                          <Cell key={`rect-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>


        </main>
      </div>
    </div>
  )
}

