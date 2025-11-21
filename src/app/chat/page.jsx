"use client";

export const dynamic = "force-dynamic";
import nextDynamic from "next/dynamic";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import logo from "../../../public/assets/logo.svg";
import Link from "next/link";
import { ImCross } from "react-icons/im";
import Script from "next/script";
import { Progress } from "antd";
import moment from "moment";
import Image from "next/image";
import { Send } from "lucide-react";
import { FaUser as UserIcon } from "react-icons/fa";
import TypingIndicator from "./TypingIndicator"; // ✅ Correct
import staticAvatar from "../../../public/assets/maya.svg"; // Update this path to your image
import Logo from "../../../public/assets/logo.svg";
import slide from "../../../public/assets/slide.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PDFViewer = nextDynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
});

function generateId(length = 10) {
  const chars = "0123456789abcdefABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  // Note: localStorage usage removed for artifact compatibility
  return result;
}

function generateIdOnly(length = 10) {
  const chars = "0123456789abcdefABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

const conversationId = generateIdOnly(20);



export default function Start() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(null);
  const [input, setInput] = useState("");
  const [statusMessages, setStatusMessages] = useState([]);
  const [streamStarted, setStreamStarted] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [lastQuestion, setLastQuestion] = useState("");
  const [messageLoading, setMessageLoading] = useState(false);
  const [showDoc, setShowDoc] = useState(false);
  const [docType, setDocType] = useState("");
  const [docUrl, setDocUrl] = useState("");
  const [buttonType, setButtonType] = useState("LEAVE");
  const [isTyping, setIsTyping] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [countdownPercent, setCountdownPercent] = useState(100);
  const [suggestedReplies, setSuggestedReplies] = useState([]); // New state for suggestions

  const [clientId, setClientId] = useState(null);
  const containerRef = useRef(null);
  const ws = useRef(null);
  const [wsMessage, setWsMessage] = useState(null);
  const [pendingMessages, setPendingMessages] = useState([]);

  useEffect(() => {
    let storedId = generateId();
    setClientId(storedId);
    handleStart();
  }, []);

  const updateStatus = (message) => {
    console.log(message);
    setStatusMessages((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  const handleStart = async () => {
    try {
      setLoading(true);
      updateStatus("Session started with static avatar");
      setIsStarted(true);
      setStreamStarted(true);
      setButtonType("LEAVE");
    } catch (error) {
      updateStatus(`Error starting session: ${error.message}`);
      console.error("Error in handleStart:", error);
    } finally {
      setLoading(false);
    }
  };

  const closeSession = async () => {
    try {
      updateStatus("Session closed");
      setIsStarted(false);
      setStreamStarted(false);
      setButtonType("START AGAIN");

      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/talk-time/end`,
          {
            user_id: clientId,
            period_date: new Date().toISOString(),
          },
          {
            headers: {
              Authorization: localStorage.getItem("access_token"),
            },
          }
        )
        .catch((error) => {
          console.error(
            "Error ending talk time:",
            error?.message || error?.response?.data || error
          );
        });
    } catch (error) {
      updateStatus(`Failed to close session: ${error.message}`);
      console.error("Error in closeSession:", error);
    }
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    sex: "",
    support: "",
    therapist: "",
    emotion1: "",
    session1: "",
    emotion2: "",
    session2: "",
  });

  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Date of Birth", name: "dob" },
    { label: "Sex", name: "sex" },
    {
      label: "What would you like support with in this session?",
      name: "support",
    },
    { label: "Have you worked with a therapist before?", name: "therapist" },
    {
      label: "How are you feeling emotionally, on a scale of 1–10?",
      name: "emotion1",
    },
    { label: "Do you prefer online or in-person sessions?", name: "session1" },
    {
      label: "How are you feeling emotionally, on a scale of 1–10?",
      name: "emotion2",
    },
    { label: "Do you prefer online or in-person sessions?", name: "session2" },
  ];

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/screening-form`,
        {
          user_id: clientId,
          ...formData,
        }
      );
      console.log("Form submitted successfully:", response.data);
      toast.success("Form submitted successfully!");
      setShowDoc(false);
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error("Failed to submit the form.");
    }
  };

  const sendText = async (text, taskType) => {
    if (!streamStarted) {
      updateStatus("No active session. (sendText aborted)");
      return;
    }
    try {
      updateStatus(`Sending text: "${text}"`);
      setLastQuestion(text);

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        const wsMessage = JSON.stringify({
          client_id: clientId,
          message: text,
        });
        ws.current.send(wsMessage);
        updateStatus(`Text sent to WebSocket: ${wsMessage}`);
      } else {
        updateStatus("WebSocket is not connected");
      }
    } catch (error) {
      updateStatus(`Failed to send text: ${error.message}`);
      console.error("Error in sendText:", error);
    }
  };

  const sendMessage = async (messageText = null) => {
    const textToSend = messageText || input.trim();
    if (textToSend) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, type: "user", message: textToSend },
      ]);
      setIsTyping(true); // Start typing animation
      setSuggestedReplies([]); // Clear suggestions when user sends a message
      await sendText(textToSend, "talk");
      if (!messageText) setInput(""); // Only clear input if it's from the input field
    }
  };

  // Handle suggested reply click
  const handleSuggestedReplyClick = (suggestion) => {
    sendMessage(suggestion);
  };

  useEffect(() => {
    if (streamStarted) {
      ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL + "/ws");
      ws.current.onopen = () => {
        console.log("WebSocket connection established");
        const initMsg = JSON.stringify({
          client_id: clientId,
          conversation_id: conversationId,
        });
        ws.current.send(initMsg);

        axios
          .post(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
            user_id: clientId,
            project_name: "smoothai",
            conversation_id: conversationId,
          })
          .catch((error) => {
            console.error(
              "Error sending analytics:",
              error?.message || error?.response?.data || error
            );
          });
      };

      ws.current.onmessage = async (event) => {
        let data;
        try {
          data = JSON.parse(event.data);
          console.log("Received WebSocket message:", data);
        } catch (e) {
          console.error("WebSocket JSON parsing error:", e);
          return;
        }

        const types = [
          "welcome",
          "response",
          "normal_mode",
          "ppt_mode",
          "screening_form",
          "ask_for_meeting",
          "goto_page_mode",
        ];

        if (types.includes(data?.type)) {
          setIsTyping(false); // Stop typing when a message is received
          setWsMessage(data.message);
          setSuggestedReplies(data?.suggested_replies || []);
          setMessageLoading(false);

          if (data?.type === "ppt_mode") {
            setDocType("ppt_mode");
            setShowDoc(true);
            setDocUrl(data?.presentation_urls || "");
          } else if (data?.type === "goto_page_mode") {
            setDocType("goto_page_mode");
            setShowDoc(false);
            data?.pricing_page_url &&
              window.open(data.pricing_page_url, "_blank");
          } else if (data?.type === "screening_form") {
            console.log("screening_form");
            setDocType("screening_form");
            setShowDoc(true);
          } else if (data?.type === "ask_for_meeting") {
            setDocType("ask_for_meeting");
            setShowDoc(true);
            setDocUrl(data?.url || "");
          } else if (data?.type === "normal_mode") {
            setDocType("normal_mode");

            setShowDoc(false);
            setDocUrl("");
          }
        }
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.current.onclose = () => {
        console.log("WebSocket connection closed");
      };
    }
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [streamStarted]);

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/talk-time/end`, {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("access_token") || "",
          },
          body: JSON.stringify({
            user_id: clientId,
            period_date: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Failed to send exit tracking", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [clientId]);

function splitIntoMessages(text) {
  // Handle abbreviations properly so they don’t break the sentence
  const safeText = text.replace(/\b(Dr|Mr|Mrs|Ms|St)\./g, "$1<<DOT>>");

  // Split on sentence-ending punctuation followed by space + capital letter
  const parts = safeText.split(/(?<=[.!?])\s+(?=[A-Z])/);

  // Restore real dots in abbreviations
  return parts.map(s => s.replace(/<<DOT>>/g, ".").trim()).filter(Boolean);
}


const sendRepeat = async (message) => {
  const sentences = splitIntoMessages(message);
  if (!sentences.length) return;

  setIsTyping(true); // Start typing before showing any message

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];

    await new Promise((resolve) => setTimeout(resolve, 2000)); // 5-second delay

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + i,
        type: "ai",
        message: sentence,
      },
    ]);

    if (i === sentences.length - 1) {
      // Last message
      setIsTyping(false); // Stop typing
    }
  }
};



  useEffect(() => {
    if (!wsMessage) return;
    setPendingMessages((prev) => [...prev, wsMessage]);
  }, [wsMessage]);

useEffect(() => {
  if (!pendingMessages.length) return;

  const [latestMessage] = pendingMessages;
  let isCancelled = false;

  const handleMessage = async () => {
    if (isCancelled) return;
    await sendRepeat(latestMessage);
    setPendingMessages((prev) => prev.slice(1));
  };

  handleMessage();

  return () => {
    isCancelled = true;
  };
}, [pendingMessages?.length]);


useEffect(() => {
  if (containerRef.current) {
    setTimeout(() => {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }
}, [messages?.length, suggestedReplies?.length]);


  useEffect(() => {
    const messageListener = (event) => {
      if (event.data.meetingBookSucceeded) {
        const startTime =
          event.data.meetingsPayload.bookingResponse?.postResponse?.timerange
            ?.start ||
          event.data.meetingsPayload.bookingResponse?.event?.dateTime;
        const endTime =
          event.data.meetingsPayload.bookingResponse?.postResponse?.timerange
            ?.end;
        const email =
          event.data.meetingsPayload.bookingResponse?.postResponse?.contact
            ?.email;

        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/hubspot-webhook-confirmation`,
            {
              user_id: clientId,
              project_name: "smoothai",
              start_time: startTime,
              end_time: endTime,
              email: email,
            }
          )
          .catch((error) => {
            console.error(
              "Error sending webhooks confirmation:",
              error?.message || error?.response?.data || error
            );
          });

        ws.current &&
          ws.current.readyState === WebSocket.OPEN &&
          ws.current.send(
            JSON.stringify({
              type: "meeting_data",
              client_id: clientId,
              project_name: "smoothai",
              meeting_start_time: startTime,
              meeting_end_time: endTime,
              date: new Date().toISOString(),
              user_email: email,
            })
          );
      }
    };
    window.addEventListener("message", messageListener);
    return () => window.removeEventListener("message", messageListener);
  }, [clientId]);

  const renderMessageWithLinks = (text) => {
    const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
    const urlRegex = /https?:\/\/[^\s]+/g;

    const parts = [];
    let lastIndex = 0;

    let match;
    while ((match = markdownLinkRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        const before = text.slice(lastIndex, match.index);
        parts.push(...processPlainUrls(before));
      }

      const displayText = match[1];
      const url = match[2];

      parts.push(createLinkElement(displayText, url, match.index));

      lastIndex = markdownLinkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex);
      parts.push(...processPlainUrls(remainingText));
    }

    return parts;
  };

  const processPlainUrls = (text) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = urlRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const url = match[0];
      parts.push(createLinkElement(url, url, match.index));

      lastIndex = urlRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  const createLinkElement = (displayText, url, key) => (
    <a
      key={url + key}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={async (e) => {
        e.preventDefault();
        if (url === "https://getsmooth.ai/pricing") {
          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/util/kpi`,
              { purchase_clicks: 1, user_id: clientId },
              {
                headers: {
                  Authorization: localStorage?.getItem("access_token"),
                },
              }
            );
          } catch (error) {
            console.error(
              "Error in pricing page api:",
              error?.message || error?.response?.data || error
            );
          }
        }
        window.open(url, "_blank");
      }}
      className="text-blue-500 underline"
    >
      {displayText}
    </a>
  );

  if (loading)
    return (
      <main className="min-h-screen flex flex-col bg-[#333]">
        <header className="pt-8 pb-6 text-center">
          <h1 className="text-white text-lg md:text-2xl font-medium tracking-wide">
            MAYA A.I
          </h1>
        </header>

        <div className="text-center px-4 mb-12">
          <h1 className="text-white text-lg md:text-xl font-medium tracking-wide">
            Speak with our AI Advisor, Sophie, to understand how Smooth enables
            frictionless selling and buyer-led growth.
          </h1>
        </div>

        <div className="wrapper mx-auto my-[15%]">
          <div className="loader"></div>
        </div>
      </main>
    );

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        background:
          "linear-gradient(to top, rgba(0, 0, 0, 0.94), rgba(1, 32, 65, 1))",
      }}
    >
      {/* Header */}
      <header className="pt-6 pb-4 relative flex items-center justify-center">
        <div className="absolute right-4 top-2">
          <Image src={Logo} alt="Smooth Logo" className="w-20 md:w-28 lg:p-6" />
        </div>
        <div className="text-center">
          <h1 className="text-white text-xl md:text-4xl font-bold tracking-wide">
            MAYA
          </h1>
          <h2 className="text-white text-sm md:text-md py-1 font-medium tracking-wide">
            Your 24/7 AI Patient Engagement Assistant
          </h2>
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-col px-4 md:px-8 lg:flex-row gap-10 lg:px-16 py-4 md:py-6 w-full h-[calc(100vh-160px)] max-w-[1500px] mx-auto">
        {/* LEFT */}
        <div className="flex-1 h-full rounded-lg backdrop-blur-3xl overflow-hidden">
          {!showDoc ? (
            <Image
              src={staticAvatar}
              alt="AI Avatar"
              className="w-full h-full rounded-lg object-cover"
              width={800}
              height={500}
            />
          ) : (
            <div className="flex flex-col h-full">
              <div className="h-[100px] overflow-hidden">
                <div className="flex items-center justify-center">
                  <Image
                    src={staticAvatar}
                    alt="AI Avatar"
                    className="w-[190px] h-[100px] justify-center rounded-lg object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 p-1 relative overflow-auto">
                {docType === "ppt_mode" && (
                  <div className="relative flex justify-center items-center w-full h-full overflow-auto rounded-lg">
                    <img
                      src={docUrl}
                      alt="Document"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <div
                      onClick={() => setShowDoc(false)}
                      className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-2 cursor-pointer z-10"
                    >
                      <ImCross />
                    </div>
                  </div>
                )}

                {docType === "ask_for_meeting" && (
                  <div className="relative rounded-lg w-full h-full overflow-hidden">
                    <iframe
                      src={
                        docUrl || "https://calendly.com/maya-converaix/30min"
                      }
                      title="Schedule"
                      width="100%"
                      height="100%"
                      className="h-full w-full rounded-lg"
                      frameBorder="0"
                      style={{ border: "none" }}
                    />
                    <div
                      onClick={() => setShowDoc(false)}
                      className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-2 cursor-pointer shadow"
                    >
                      <ImCross />
                    </div>
                  </div>
                )}

                {docType === "screening_form" && (
                  <div className="relative rounded-lg w-full h-full bg-white shadow">
                    {/* Close Button */}
                    <div
                      onClick={() => setShowDoc(false)}
                      className="absolute top-2 right-2 bg-white text-gray-700 rounded-full p-2 cursor-pointer shadow z-10"
                    >
                      <ImCross />
                    </div>

                    {/* Scrollable Form */}
                    <div className="h-full w-full p-6 overflow-y-auto space-y-6 custom-scrollbar">
                      <h2 className="text-xl md:text-2xl font-semibold text-center">
                        Health Pre-Screening Form
                      </h2>

                      <form onSubmit={handleSubmitForm}>
                        <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-4">
                          {fields.map((field, index) => (
                            <div key={index}>
                              <label className="block text-sm font-medium">
                                {field.label}
                              </label>
                              <input
                                type="text"
                                name={field.name}
                                value={formData[field.name]}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.name]: e.target.value,
                                  }))
                                }
                                placeholder="Type Here"
                                className="w-full h-12 border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                          <button
                            type="submit"
                            className="bg-[#003366] text-white px-6 py-2 rounded-md hover:bg-[#003366]/80 transition"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex-1 h-full flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-[#f1f1f1] rounded-xl" />

          {/* Messages */}
          <div
            ref={containerRef}
            className="flex-1 overflow-y-auto space-y-2 px-2 md:px-[.9rem] pt-[.7rem] scrollbar z-10"
          >
            {messages.map((message) => {
              const isAI = message.type === "ai";
              const isUser = message.type === "user";
              const msg = message.message;
              if (!msg) return null;

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isAI ? "justify-start" : "justify-end"
                  } gap-2 items-start`}
                >
                  {/* Left Avatar (AI) */}
                  {isAI && (
                    <Image
                      src={staticAvatar}
                      alt="AI"
                      className="w-8 h-8 rounded-full mt-[6px] shrink-0"
                    />
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 text-sm rounded-xl shadow max-w-[85%] ${
                      isAI
                        ? "bg-white text-black rounded-bl-none font-medium text-lg"
                        : "bg-[#003366] text-white rounded-br-none"
                    }`}
                  >
                    <p className="whitespace-pre-line break-words text-base">
                      {renderMessageWithLinks(msg)}
                    </p>
                  </div>

                  {/* Right Icon (User) */}
                  {isUser && (
                    <div className="w-8 h-8 mt-[6px] shrink-0 bg-[#003366] text-white rounded-full flex items-center justify-center">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start gap-2 items-start">
                <Image
                  src={staticAvatar}
                  alt="AI"
                  className="w-8 h-8 rounded-full mt-[6px] shrink-0"
                />
                <div className="px-4 py-3 bg-white text-black text-sm rounded-xl rounded-bl-none shadow">
                  <TypingIndicator />
                </div>
              </div>
            )}

            {/* Suggested Replies */}
            {suggestedReplies.length > 0 && !isTyping && (
              <div className="flex justify-start items-start w-full px-4 mt-2">
                {/* Spacer for AI avatar alignment */}
                <div className="w-8 h-8 mt-[6px] shrink-0" />
                {/* Suggested replies container */}
                <div className="flex flex-wrap gap-2 w-full max-w-[85%]">
                  {suggestedReplies.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedReplyClick(suggestion)}
                      className="px-4 py-2 text-lg bg-gray-300/50 hover:bg-gray-200 text-black rounded-md border border-[#003366] transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="relative z-10 p-4">
            <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <input
                type="text"
                placeholder="Write message"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 py-3 px-4 text-gray-700 placeholder-gray-500 focus:outline-none text-sm"
              />
              <button
                onClick={() => sendMessage()}
                className="bg-[#003366] hover:bg-[#002244] p-3 flex items-center justify-center"
              >
                <Send className="text-white w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </main>
  );
}
