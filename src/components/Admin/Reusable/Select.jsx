import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

const Select = ({ options, onSelect, selected, caption, alternatives }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const handleSelect = (option) => {
    setIsOpen(false);
    onSelect(option);
  }

  return (
    <div className="relative" ref={dropdownRef}>
        <button className="border border-[#333B69] text-[#333B69] rounded-lg flex items-center px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500" onClick={() => setIsOpen(!isOpen)} >
          {caption && <span className="text-sm mr-2">{caption}</span>}
          <span className="text-sm">{alternatives ? alternatives[selected] : selected}</span>
          <ChevronDown className="h-4 w-4 ml-2 text-gray-500" />
        </button>
        {isOpen && (
          <div className="absolute right-0 top-full mt-4 bg-white rounded-lg w-48 z-10" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} >
            <div className="p-2 text-sm font-medium">Custom Date Range</div>
            <div className="py-1">
              {options.map((option) => (
                <button key={option} onClick={() => handleSelect(option)} className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selected === option ? "bg-gray-50" : ""}`} >
                  {alternatives ? alternatives[option] : option}
                </button>
              ))}
            </div>
          </div>

        )}
      </div>
  )
}

export default Select
