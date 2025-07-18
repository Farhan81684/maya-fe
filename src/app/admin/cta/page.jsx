"use client"

import Header from "@/components/Admin/Header";
import { getDateRange } from "@/components/Admin/modules/dateFunctions";
import SecondHeader from "@/components/Admin/SecondHeader";
import Sidebar from "@/components/Admin/Sidebar";
import StatsCards from "@/components/Admin/StatsCards";
import { downloadCSV } from "@/components/app components/exportCSV";
import { message } from "@/components/app components/message";
import { Spin } from "antd";
import axios from "axios";
import { Search, ChevronDown, Check, X } from "lucide-react"
import moment from "moment";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const compaines = ['smoothai', 'us-analytics', 'rocketscreens'];

const companiesAlternative = {
  "smoothai": "Smooth AI",
  "us-analytics": "US-Analytics",
  "rocketscreens": "Rocket Screens",
  "": "All",
};

// const tableDataTemplate = [
//   {
//     name: "Jane Cooper",
//     email: "jane@microsoft.com",
//     sent: true,
//     time: "16m 16 sec",
//     status: "Meeting",
//   },
//   {
//     name: "Floyd Miles",
//     email: "floyd@yahoo.com",
//     sent: true,
//     time: "16m 16 sec",
//     status: "Meeting",
//   },
//   { name: "Ronald Richards", email: "-", sent: false, time: "16m 16 sec", status: "Meeting" },
//   {
//     name: "Marvin McKinney",
//     email: "marvin@tesla.com",
//     sent: true,
//     time: "16m 16 sec",
//     status: "Only Chat",
//   },
//   { name: "Jerome Bell", email: "-", sent: false, time: "16m 16 sec", status: "Meeting" },
//   { name: "Kathryn Murphy", email: "-", sent: false, time: "16m 16 sec", status: "Only Chat" },
//   {
//     name: "Jacob Jones",
//     email: "jacob@yahoo.com",
//     sent: true,
//     time: "16m 16 sec",
//     status: "Meeting",
//   },
//   {
//     name: "Kristin Watson",
//     email: "kristin@facebook.com",
//     sent: true,
//     time: "16m 16 sec",
//     status: "Only Chat",
//   },
// ];

function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}


export default function Dashboard() {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedTimeframe, setSelectedTimeframe] = useState("Today");
  const [selectedCompany, setSelectedCompany] = useState("smoothai");
  const [search, setSearch] = useState("");

  const [loader, setLoader] = useState(false)

  const [tableData, setTableData] = useState([]);
  const [searchedData, setSearchedData] = useState(null);

  const [talkTimeResponse, setTalkTimeResponse] = useState([]);

  console.log('tableData: ', tableData);

  const [totalLeads, setTotalLeads] = useState(0);
  const [totalEmailSent, settotalEmailSent] = useState(0);

  function formatTimeFromMinutes(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) {
      return `0h 0m 0s`;
    }

    let hours = Math.floor(seconds / 3600);
    let remainingSeconds = seconds % 3600;
    let mins = Math.floor(remainingSeconds / 60);
    let secs = Math.floor(remainingSeconds % 60);

    // Safety checks
    hours = isFinite(hours) ? Math.round(hours) : 0;
    mins = isFinite(mins) ? Math.round(mins) : 0;
    secs = isFinite(secs) ? Math.round(secs) : 0;

    return `${hours}h ${mins}m ${secs}s`;
  }

  useEffect(() => {
    const fetchCTA = async () => {
      try {
        setLoader(true)
        const { startDate, endDate } = getDateRange(selectedTimeframe);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/talk-time/call-to-action?limit=10&offset=${currentPage - 1}&start_date=${moment(startDate).format("YYYY-MM-DD")}&end_date=${moment(endDate).format("YYYY-MM-DD")}`,
          // `${process.env.NEXT_PUBLIC_API_URL}/talk-time/call-to-action?limit=10&offset=${currentPage - 1}`,
          {
            headers: {
              Authorization: localStorage.getItem("access_token")
            }
          });
        setLoader(false)
        console.log('response in /cta: ', response?.data?.data);

        const data = response?.data?.data?.map((item) => {
          return {
            name: item?.name || '-',
            email: item?.email_id || '-',
            sent: item?.email_sent === 0 ? false : true,
            time: item?.talk_time ? formatTimeFromMinutes(item?.talk_time) : "0h 0m 0s",
            createdAt: item?.createdAt || "-",
            chatSummary: item?.conversation_summary || "No summary available",
            dateTime: item?.createdAt ? moment(item?.createdAt).format("YYYY-MM-DD HH:mm:ss") : "-",
          }
        });


        console.log('data in /cta: ', data);
        setTableData(data);
        setTotalLeads(response?.data?.total || 0);
        settotalEmailSent(response?.data?.email_count || 0);
      } catch (error) {
        console.error("Error in /cta: ", error?.response?.data?.message || error?.response?.data || error?.message || error);
        if (error?.response?.status === 404) {
          setTableData([]);
          setTotalLeads(0);
          settotalEmailSent(0)
          setLoader(false)
        }
      }
    };

    fetchCTA()

  }, [selectedTimeframe, selectedCompany, currentPage]);

  const exportCTA = async () => {
    try {
      const { startDate, endDate } = getDateRange(selectedTimeframe);
      setLoader(true)
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/talk-time/call-to-action/csv?limit=10&offset=${currentPage - 1}&start_date=${moment(startDate).format("YYYY-MM-DD")}&end_date=${moment(endDate).format("YYYY-MM-DD")}`,
        // `${process.env.NEXT_PUBLIC_API_URL}/talk-time/call-to-action?limit=10&offset=${currentPage - 1}`,
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
          }
        });
      setLoader(false)
      // console.log('response in /cta/csv: ', response?.data);

      downloadCSV(response?.data, `smoothai-cta-${moment(startDate).format("YYYY-MM-DD")}-${moment(endDate).format("YYYY-MM-DD")}.csv`);


    } catch (error) {
      console.error("Error in /cta/csv: ", error?.response?.data?.message || error?.response?.data || error?.message || error);

    }
  };



  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      message("User not authorized. Redirecting to login page.", "error");
      router.push("/admin/login"); // Redirect to login page
    }
  }, [])

  const throttledSetValue = useRef(
    throttle((newValue) => {
      setSearch(newValue);
    }, 800) // Adjust ms as needed
  ).current;

  useEffect(() => {
    if (!search.trim()) {
      setSearchedData(null);
      return;
    }
    const filteredData = tableData?.filter((item) => {
      return item?.name?.toLowerCase()?.includes(search?.toLowerCase()) || item?.email?.toLowerCase()?.includes(search?.toLowerCase());
    });
    setSearchedData(filteredData);
    setCurrentPage(1); // Reset to first page on new search
    // setTableData(filteredData);
    // setTotalLeads(filteredData?.length || 0);
  }, [search]);

  const router = useRouter();

  const data = searchedData || tableData || [];

  const totalPages = Math.ceil(totalLeads / itemsPerPage);

  const handlePrev = () => {
    setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentPage(prev => prev + 1);
  };

  console.log(totalLeads)

  return (
    <Spin spinning={loader}>
      <div className="poppins flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center">
          {/* Header */}
          <Header />

          {/* Main Dashboard */}
          <main className="flex-1 p-6 px-8 w-full max-w-[90rem]">
            <SecondHeader selectedTimeframe={selectedTimeframe} setSelectedTimeframe={setSelectedTimeframe} selectedCompany={selectedCompany} setSelectedCompany={setSelectedCompany} onClickExport={() => exportCTA()} />

            {/* Stats Cards - Single container with internal separation */}
            <StatsCards selectedTimeframe={selectedTimeframe} total={totalLeads} totalEmailSent={totalEmailSent} />

            {/* Leads Table */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden" style={{ boxShadow: "0px 10px 60px rgba(226, 236, 249, 0.50)" }} >
              <div className="p-6 px-12 flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{companiesAlternative[selectedCompany]} Leads</h3>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input type="text" placeholder="Search" onChange={e => throttledSetValue(e.target.value)} className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 w-72" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto px-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#eee] text-left text-sm text-gray-500">
                      <th className="px-6 py-3 font-medium">Customer Name</th>
                      <th className="px-6 py-3 font-medium">Email</th>
                      <th className="px-6 py-3 font-medium">Email Sent</th>
                      <th className="px-6 py-3 font-medium">Talk Time</th>
                      <th className="px-6 py-3 font-medium">Date</th>
                      <th className="px-6 py-6 font-medium flex items-center justify-center gap-2">Time <span className="text-[10px]">(UTC)</span></th>
                      {/* <th className="px-6 py-3 font-medium">Status</th> */}
                      <th className="px-6 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 ? data?.map((lead, i) => (
                      <tr key={i} className="border-b border-[#eee]">
                        <td className="px-6 py-4">{lead.name}</td>
                        <td className="px-6 py-4">{lead.email}</td>
                        <td className="px-12 py-4">
                          {!lead.sent ? (<X className="h-5 w-5 text-red-500" />) : (<Check className="h-5 w-5 text-green-500" />)}
                        </td>
                        <td className="px-6 py-4">{lead.time}</td>
                        <td className="px-6 py-4">{moment(lead?.createdAt).utc().format("MMMM, DD YYYY")}</td>
                        <td className="px-6 py-4">{moment(lead?.createdAt).utc().format("hh:mm A")}</td>
                        {/* <td className="px-6 py-4">
                        <span className={`px-4 py-1 rounded text-sm border ${lead.status === "Meeting" ? "bg-[rgba(22,192,152,0.38)] text-[#04634D] border-[#00B087]" : "bg-[rgba(255,157,0,0.38)] text-[#B26E00] border-[#FF9D00]"}`}>
                          {lead.status}
                        </span>
                      </td> */}
                        <td className="px-6 py-4">
                          <button
                            onClick={() => router.push(`/admin/summary?data=${JSON.stringify(lead?.chatSummary)}&name=${lead.name}`)}
                            className={`${lead?.chatSummary !== "No summary available" ? "bg-green-700 text-white" : "bg-gray-100 text-gray-600"} px-4 py-1 border border-gray-400 rounded text-sm `}
                          >
                            Chat Summary
                          </button>
                        </td>
                      </tr>
                    )) : (
                      <tr className="border-b border-[#eee]">
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                {totalLeads > itemsPerPage && (
                  <div className="flex justify-end gap-4 items-center mt-4 px-6">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                      Prev
                    </button>
                    <span className="text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Spin>
  )
}

