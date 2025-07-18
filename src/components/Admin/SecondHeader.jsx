// import { ChevronDown } from "lucide-react"
// import { useState, useRef, useEffect } from "react"
import Select from "./Reusable/Select";

const timeframes = [
  "Today",
  "This Week",
  "This Month",
  "This Quarter",
  "This Year",
  "Last Week",
  "Last Month",
  "Last Quarter",
  "Last Year",
];

const companies = [
  "smoothai",
];
const companiesAlternative = {
  "smoothai": "Smooth Ai",
  "us-analytics": "US-Analytics",
  "rocketscreens": "Rocket Screens",
  "": "All",
};

const SecondHeader = ({ selectedTimeframe, setSelectedTimeframe, selectedCompany, setSelectedCompany, onClickExport = null }) => {

  // const [selectedTimeframe, setSelectedTimeframe] = useState("This Year");
  // const handleTimeframeSelect = (timeframe) => {
  //   setSelectedTimeframe(timeframe);
  // }

  return (
    <div className="flex justify-end mb-8 items-center space-x-4">
      <Select options={timeframes} onSelect={(timeframe) => setSelectedTimeframe(timeframe)} selected={selectedTimeframe} caption={'Timeframe:'} />
      {/* {setSelectedCompany && <Select options={companies} onSelect={(company) => setSelectedCompany(company)} selected={selectedCompany} alternatives={companiesAlternative} />} */}
      {onClickExport ? <button className="bg-blue-900 text-sm text-white px-4 py-2 rounded-lg flex items-center" onClick={() => onClickExport()}>
        Export CSV
        <svg className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button> : <></>}
    </div>
  )
}

export default SecondHeader
