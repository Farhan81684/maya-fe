// exports.getDateRange = (timeframe) => {
//     const now = new Date();
  
//     // We'll define "this week" as Sunday -> Saturday.
//     // If you prefer Monday -> Sunday, you can adjust accordingly.
//     // getDay() returns 0 for Sunday, 1 for Monday, etc.
  
//     // Helper: get start/end of "this week" (Sunday -> Saturday).
//     function getThisWeekRange() {
//       const today = new Date(now);
//       const dayOfWeek = today.getDay(); // Sunday=0, Monday=1, ...
      
//       // Start of this week: subtract 'dayOfWeek' days from today
//       const start = new Date(today);
//       start.setHours(0, 0, 0, 0);
//       start.setDate(start.getDate() - dayOfWeek);
      
//       // End of this week: start + 6 days
//       const end = new Date(start);
//       end.setDate(end.getDate() + 6);
//       end.setHours(23, 59, 59, 999);
  
//       return { startDate: start, endDate: end };
//     }
  
//     // Helper: get start/end of "this month" 
//     function getThisMonthRange() {
//       // Months are zero-based in JS: 0=Jan, 1=Feb, ...
//       const start = new Date(now.getFullYear(), now.getMonth(), 1);
//       start.setHours(0, 0, 0, 0);
  
//       // End of this month: 
//       // setting date to 0 of next month gives the last day of current month
//       const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//       end.setHours(23, 59, 59, 999);
      
//       return { startDate: start, endDate: end };
//     }
  
//     // Helper: get start/end of "this quarter" (quarters: Jan-Mar, Apr-Jun, etc.)
//     function getThisQuarterRange() {
//       const currentMonth = now.getMonth(); // 0-based
//       const quarter = Math.floor(currentMonth / 3); // 0 for Q1, 1 for Q2, etc.
      
//       const start = new Date(now.getFullYear(), quarter * 3, 1);
//       start.setHours(0, 0, 0, 0);
      
//       // End: "start of next quarter" minus 1 day
//       const end = new Date(now.getFullYear(), quarter * 3 + 3, 0);
//       end.setHours(23, 59, 59, 999);
  
//       return { startDate: start, endDate: end };
//     }
  
//     // Helper: get start/end of "this year"
//     function getThisYearRange() {
//       const start = new Date(now.getFullYear(), 0, 1);
//       start.setHours(0, 0, 0, 0);
  
//       const end = new Date(now.getFullYear(), 11, 31);
//       end.setHours(23, 59, 59, 999);
  
//       return { startDate: start, endDate: end };
//     }
  
//     // For "last" periods, we can reuse the "this" range and shift as needed.
    
//     // Helper: get "last week" range
//     function getLastWeekRange() {
//       const thisWeek = getThisWeekRange();
//       // Subtract 7 days from the start & end of this week
//       const start = new Date(thisWeek.startDate);
//       start.setDate(start.getDate() - 7);
//       const end = new Date(thisWeek.endDate);
//       end.setDate(end.getDate() - 7);
//       return { startDate: start, endDate: end };
//     }
  
//     // Helper: get "last month" range
//     function getLastMonthRange() {
//       // Start of last month: year, (month - 1), day=1
//       // If current month is January (0), we have to go to previous year
//       const year = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
//       const month = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
      
//       const start = new Date(year, month, 1);
//       start.setHours(0, 0, 0, 0);
      
//       // End of last month:
//       // day=0 of "this month" is last day of the previous month
//       const end = new Date(now.getFullYear(), now.getMonth(), 0);
//       end.setHours(23, 59, 59, 999);
      
//       return { startDate: start, endDate: end };
//     }
  
//     // Helper: get "last quarter" range
//     function getLastQuarterRange() {
//       // Current quarter
//       const currentMonth = now.getMonth(); // 0-based
//       const thisQuarter = Math.floor(currentMonth / 3); // 0..3
//       let year = now.getFullYear();
//       let quarter = thisQuarter - 1;
      
//       // If it's the first quarter (thisQuarter=0), last quarter belongs to prev year
//       if (quarter < 0) {
//         quarter = 3;  // Q4 of previous year
//         year -= 1;
//       }
      
//       const start = new Date(year, quarter * 3, 1);
//       start.setHours(0, 0, 0, 0);
  
//       const end = new Date(year, quarter * 3 + 3, 0);
//       end.setHours(23, 59, 59, 999);
  
//       return { startDate: start, endDate: end };
//     }
  
//     // Helper: get "last year" range
//     function getLastYearRange() {
//       const start = new Date(now.getFullYear() - 1, 0, 1);
//       start.setHours(0, 0, 0, 0);
  
//       const end = new Date(now.getFullYear() - 1, 11, 31);
//       end.setHours(23, 59, 59, 999);
  
//       return { startDate: start, endDate: end };
//     }

//     function getTodayRange() {
//         const now = new Date();
        
//         // Start of day (00:00:00.000)
//         const start = new Date(now);
//         start.setHours(0, 0, 0, 0);
      
//         // End of day (23:59:59.999)
//         const end = new Date(now);
//         end.setHours(23, 59, 59, 999);
      
//         return { startDate: start, endDate: end };
//     }

//     function getYesterdayRange() {
//         const now = new Date();
      
//         // Start of yesterday: (yesterday at 00:00:00)
//         const start = new Date(now);
//         start.setDate(start.getDate() - 1);
//         start.setHours(0, 0, 0, 0);
      
//         // End of yesterday: (yesterday at 23:59:59.999)
//         const end = new Date(start);
//         end.setHours(23, 59, 59, 999);
      
//         return { startDate: start, endDate: end };
//     }

  
//     // Switch or if-else to pick correct function
//     switch (timeframe) {
//       case "This Week":
//         return getThisWeekRange();
//       case "This Month":
//         return getThisMonthRange();
//       case "This Quarter":
//         return getThisQuarterRange();
//       case "This Year":
//         return getThisYearRange();
//       case "Last Week":
//         return getLastWeekRange();
//       case "Last Month":
//         return getLastMonthRange();
//       case "Last Quarter":
//         return getLastQuarterRange();
//       case "Last Year":
//           return getLastYearRange();
//       case "Yesterday":
//         return getYesterdayRange();
//       case "Today":
//         return getTodayRange();
//       default:
//         throw new Error("Unknown timeframe: " + timeframe);
//     }
// }
  

exports.getDateRange = (timeframe) => {
  const now = new Date();

  // Helper: "This Week" in UTC (Sunday -> Saturday)
  function getThisWeekRangeUTC() {
    // Create a ‘today’ pinned to UTC (hours, mins, secs=0)
    const today = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    ));
    const dayOfWeek = today.getUTCDay(); // Sunday=0, Monday=1, etc. in UTC

    // Start of week (UTC): subtract ‘dayOfWeek’ days from ‘today’
    const start = new Date(today);
    start.setUTCDate(start.getUTCDate() - dayOfWeek);
    start.setUTCHours(0, 0, 0, 0);

    // End of week (UTC): start + 6 days
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 6);
    end.setUTCHours(23, 59, 59, 999);
    
    return { startDate: start, endDate: end };
  }

  // Helper: "This Month" in UTC
  function getThisMonthRangeUTC() {
    const start = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(), 
      1,
      0, 0, 0, 0
    ));
    // The end is the last day of the same month in UTC
    // By creating Date.UTC(year, month+1, 0), we get the last day of ‘this month’
    const end = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth() + 1, 
      0,
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "This Quarter" in UTC
  function getThisQuarterRangeUTC() {
    const currentMonth = now.getUTCMonth();
    const quarter = Math.floor(currentMonth / 3); // 0..3

    // Start of quarter = (year, quarter*3, day=1) in UTC
    const start = new Date(Date.UTC(
      now.getUTCFullYear(),
      quarter * 3,
      1,
      0, 0, 0, 0
    ));

    // End of quarter = start of next quarter minus 1 day
    // i.e. (year, quarter*3+3, 0)
    const end = new Date(Date.UTC(
      now.getUTCFullYear(),
      quarter * 3 + 3,
      0,
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "This Year" in UTC
  function getThisYearRangeUTC() {
    const start = new Date(Date.UTC(
      now.getUTCFullYear(), 
      0, 
      1,
      0, 0, 0, 0
    ));
    const end = new Date(Date.UTC(
      now.getUTCFullYear(), 
      11, 
      31,
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "Last Week" in UTC
  function getLastWeekRangeUTC() {
    // Reuse "this week" then shift by 7 days
    const thisWeek = getThisWeekRangeUTC();
    const start = new Date(thisWeek.startDate);
    start.setUTCDate(start.getUTCDate() - 7);
    const end = new Date(thisWeek.endDate);
    end.setUTCDate(end.getUTCDate() - 7);
    return { startDate: start, endDate: end };
  }

  // Helper: "Last Month" in UTC
  function getLastMonthRangeUTC() {
    // If current month is Jan (0), last month is Dec of previous year
    const thisMonth = now.getUTCMonth();
    const thisYear = now.getUTCFullYear();
    const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
    const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

    const start = new Date(Date.UTC(
      lastMonthYear, 
      lastMonth, 
      1,
      0, 0, 0, 0
    ));
    // Day=0 of "thisMonth in thisYear" = last day of previous month
    const end = new Date(Date.UTC(
      thisYear, 
      thisMonth, 
      0,
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "Last Quarter" in UTC
  function getLastQuarterRangeUTC() {
    const currentMonth = now.getUTCMonth();
    const thisQuarter = Math.floor(currentMonth / 3);
    let year = now.getUTCFullYear();
    let quarter = thisQuarter - 1;
    if (quarter < 0) {
      quarter = 3;
      year -= 1;
    }

    const start = new Date(Date.UTC(
      year,
      quarter * 3,
      1,
      0, 0, 0, 0
    ));
    const end = new Date(Date.UTC(
      year,
      quarter * 3 + 3,
      0,
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "Last Year" in UTC
  function getLastYearRangeUTC() {
    const start = new Date(Date.UTC(
      now.getUTCFullYear() - 1,
      0,
      1,
      0, 0, 0, 0
    ));
    const end = new Date(Date.UTC(
      now.getUTCFullYear() - 1,
      11,
      31,
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "Today" in UTC
  function getTodayRangeUTC() {
    const start = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0, 0
    ));
    const end = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      23, 59, 59, 999
    ));

    return { startDate: start, endDate: end };
  }

  // Helper: "Yesterday" in UTC
  function getYesterdayRangeUTC() {
    // Start of “yesterday” in UTC
    const start = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      0, 0, 0, 0
    ));
    // Shift it backward by 1 day
    start.setUTCDate(start.getUTCDate() - 1);

    // End = same day + 23:59:59.999
    const end = new Date(start);
    end.setUTCHours(23, 59, 59, 999);

    return { startDate: start, endDate: end };
  }

  // Choose appropriate range generator
  switch (timeframe) {
    case "This Week":
      return getThisWeekRangeUTC();
    case "This Month":
      return getThisMonthRangeUTC();
    case "This Quarter":
      return getThisQuarterRangeUTC();
    case "This Year":
      return getThisYearRangeUTC();
    case "Last Week":
      return getLastWeekRangeUTC();
    case "Last Month":
      return getLastMonthRangeUTC();
    case "Last Quarter":
      return getLastQuarterRangeUTC();
    case "Last Year":
      return getLastYearRangeUTC();
    case "Yesterday":
      return getYesterdayRangeUTC();
    case "Today":
      return getTodayRangeUTC();
    default:
      throw new Error("Unknown timeframe: " + timeframe);
  }
}


//   // Example usage
//   const timeframes = [
//     "This Week",
//     "This Month",
//     "This Quarter",
//     "This Year",
//     "Last Week",
//     "Last Month",
//     "Last Quarter",
//     "Last Year",
//   ];
  
//   timeframes.forEach((tf) => {
//     const range = getDateRange(tf);
//     console.log(tf, range);
//   });
  