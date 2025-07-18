"use client";

import React, { useState, useRef } from "react";
import axios from "axios";
import { Room, RoomEvent, VideoPresets } from "livekit-client";
import DeepgramLiveSTT from "../DeepgramLiveSTT";

export default function Hygen() {
  // Configuration
  const API_CONFIG = {
    apiKey: "MzFkNzU2ZjdiNjY0NGJiYjlkYzVlNjRmNDlkZjBlY2QtMTczNzU4NTA3OQ==",
    // apiKey: process.env.NEXT_PUBLIC_HYGEN_API_KEY || '',
    serverUrl: "https://api.heygen.com",
  };

  // States
  const [sessionToken, setSessionToken] = useState(null);
  const [sessionInfo, setSessionInfo] = useState(null);

  // const [avatarName, setAvatarName] = useState("Wayne_20240711");
  const [avatarName, setAvatarName] = useState("Elenora_IT_Sitting_public");
  const [voiceName, setVoiceName] = useState("");
  const [userText, setUserText] = useState("");

  const [statusMessages, setStatusMessages] = useState([]);
  const [streamStarted, setStreamStarted] = useState(false);

  // Refs for streaming
  const roomRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const videoRef = useRef(null);
  const websocketRef = useRef(null);

  // ----------------------------------------------------------------
  // Helper function to log to UI and console
  // ----------------------------------------------------------------
  const updateStatus = (message) => {
    console.log(message);
    setStatusMessages((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] ${message}`,
    ]);
  };

  // ----------------------------------------------------------------
  // 1) Get a Session Token (create_token)
  // ----------------------------------------------------------------
  const getSessionToken = async () => {
    try {
      const resp = await axios.post(
        `${API_CONFIG.serverUrl}/v1/streaming.create_token`,
        {}, // no request body needed
        {
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": API_CONFIG.apiKey,
          },
        }
      );
      const token = resp.data.data.token;
      setSessionToken(token);
      updateStatus(`Session token obtained: ${token}`);
      return token;
    } catch (error) {
      updateStatus(`Failed to get session token: ${error?.response?.data?.message || error?.message}`);
      console.error("Error in getSessionToken:", error);
      return null;
    }
  };

  // ----------------------------------------------------------------
  // 2) Create New Session (streaming.new)
  // ----------------------------------------------------------------
  const createNewSession = async (token) => {
    // let newToken;
    // if (!sessionToken) {
    //   // token not present? fetch it
    //   newToken = await getSessionToken();
    //   if (!newToken) {
    //     updateStatus("Could not get session token, aborting.");
    //     return null;
    //   }
    // }

    updateStatus(`Using Avatar: ${avatarName}, Voice: ${voiceName || "None"}`);

    try {
      updateStatus("Calling /v1/streaming.new ...");
      const resp = await axios.post(
        `${API_CONFIG.serverUrl}/v1/streaming.new`,
        {
          quality: "high",
          // quality: "medium",
          avatar_name: avatarName,
          voice: {
            voice_id: voiceName,
            rate: 1.0,
          },
          version: "v2",
          video_encoding: "H264",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken || token}`,
          },
        }
      );
      const data = resp.data.data;
      setSessionInfo(data);

      updateStatus(
        `Session created successfully: ${JSON.stringify(data, null, 2)}`
      );
      return data;
    } catch (error) {
      updateStatus(`Failed to create new session: ${error?.response?.data?.message || error?.message}`);
      console.error("Error in createNewSession:", error?.response?.data || error);
      return null;
    }
  };

  // ----------------------------------------------------------------
  // 3) Start Session (streaming.start)
  //    => Must happen before connecting to LiveKit
  // ----------------------------------------------------------------
  const startStreamingSession = async (sessionId, token) => {
    try {
      updateStatus(`Calling /v1/streaming.start with session_id: ${sessionId} ...`);
      const resp = await axios.post(
        `${API_CONFIG.serverUrl}/v1/streaming.start`,
        { session_id: sessionId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken || token}`,
          },
        }
      );
      updateStatus(`Streaming started successfully: ${JSON.stringify(resp.data)}`);
      setStreamStarted(true);
      return true;
    } catch (error) {
      updateStatus(`Failed to start streaming session: ${error?.response?.data?.message || error?.message}`);
      console.error("Error in startStreamingSession:", error?.response?.data || error);
      return false;
    }
  };

  // ----------------------------------------------------------------
  // 4) Create & Connect to LiveKit Room
  // ----------------------------------------------------------------
  const createAndConnectRoom = async (sessData) => {
    try {
      const { url, access_token, session_id } = sessData;
      updateStatus(`Attempting to connect LiveKit. URL: ${url}`);
      updateStatus(`Access Token (JWT) for LiveKit: ${access_token}`);
      updateStatus(`Session ID: ${session_id}`);

      if (!roomRef.current) {
        roomRef.current = new Room({
          adaptiveStream: true,
          dynacast: true,
          videoCaptureDefaults: {
            resolution: VideoPresets.h720.resolution,
          },
        });

        // DataReceived
        roomRef.current.on(RoomEvent.DataReceived, (message) => {
          const data = new TextDecoder().decode(message);
          updateStatus(`RoomEvent.DataReceived => ${data}`);
          console.log("Room message:", data);
        });

        // TrackSubscribed
        mediaStreamRef.current = new MediaStream();
        roomRef.current.on(RoomEvent.TrackSubscribed, (track) => {
          if (track.kind === "video" || track.kind === "audio") {
            mediaStreamRef.current.addTrack(track.mediaStreamTrack);
            if (
              mediaStreamRef.current.getVideoTracks().length > 0 &&
              mediaStreamRef.current.getAudioTracks().length > 0 &&
              videoRef.current
            ) {
              videoRef.current.srcObject = mediaStreamRef.current;
              updateStatus("Media stream ready (audio + video).");
            }
          }
        });

        // TrackUnsubscribed
        roomRef.current.on(RoomEvent.TrackUnsubscribed, (track) => {
          const mediaTrack = track.mediaStreamTrack;
          if (mediaStreamRef.current && mediaTrack) {
            mediaStreamRef.current.removeTrack(mediaTrack);
          }
        });

        // Disconnected
        roomRef.current.on(RoomEvent.Disconnected, (reason) => {
          updateStatus(`Room disconnected: ${reason}`);
        });
      }

      // Connect directly (skip prepareConnection)
      await roomRef.current.connect(url, access_token);

      updateStatus("Connected to LiveKit room");
    } catch (error) {
      updateStatus("Failed to connect to LiveKit room");
      console.error("Error in createAndConnectRoom:", error);
    }
  };

  // ----------------------------------------------------------------
  // 5) Connect WebSocket (streaming.chat)
  // ----------------------------------------------------------------
  const connectWebSocket = async (sessionId) => {
    try {
      updateStatus("Connecting WebSocket for streaming.chat...");

      const params = new URLSearchParams({
        session_id: sessionId,
        session_token: sessionToken || "",
        silence_response: "false",
        opening_text: "Hi, I am Ervin from SmoothAi, how can I help you?",
        stt_language: "en",
      });

      const wsUrl = `wss://${new URL(API_CONFIG.serverUrl).hostname}/v1/ws/streaming.chat?${params}`;
      updateStatus(`Final WebSocket URL: ${wsUrl}`);

      const ws = new WebSocket(wsUrl);
      websocketRef.current = ws;

      ws.addEventListener("open", () => {
        updateStatus("WebSocket connection opened");
      });

      ws.addEventListener("message", (event) => {
        const dataStr = event.data;
        try {
          const jsonData = JSON.parse(dataStr);
          updateStatus(`WS Message => ${JSON.stringify(jsonData)}`);


          //// if event.data = speaking_ended, send prop to DreepgramSST.jsx and clear finalTranscript !!!!! IMPORTANT ****
        } catch {
          updateStatus(`WS Message (non-JSON) => ${dataStr}`);
        }
      });

      ws.addEventListener("close", () => {
        updateStatus("WebSocket closed");
      });

      ws.addEventListener("error", (err) => {
        updateStatus("WebSocket error encountered");
        console.error("WebSocket error:", err);
      });
    } catch (err) {
      updateStatus("Error setting up WebSocket");
      console.error("Error in connectWebSocket:", err);
    }
  };

  // ----------------------------------------------------------------
  // 6) Send Text to Avatar
  // ----------------------------------------------------------------
  const sendText = async (text, taskType) => {
    if (!sessionInfo) {
      updateStatus("No active session. (sendText aborted)");
      return;
    }
    try {
      updateStatus(`Sending text to /v1/streaming.task => "${text}" type=${taskType}`);

      // For 'talk' tasks, first interrupt the current speech.
      if (taskType === "talk") {
        // await interruptSpeaking();
        interruptSpeaking();
      }

      await axios.post(
        `${API_CONFIG.serverUrl}/v1/streaming.task`,
        {
          session_id: sessionInfo.session_id,
          text,
          task_type: taskType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
      updateStatus(`Sent text (${taskType}): ${text}`);
    } catch (error) {
      updateStatus(`Failed to send text: ${error?.response?.data?.message || error?.message}`);
      console.error("Error in sendText:", error?.response?.data || error);
    }
  };

  // ----------------------------------------------------------------
  // 7) Close Session (streaming.stop)
  // ----------------------------------------------------------------
  const closeSession = async () => {
    if (!sessionInfo) {
      updateStatus("No active session to close.");
      return;
    }
    try {
      updateStatus("Calling /v1/streaming.stop ...");
      await axios.post(
        `${API_CONFIG.serverUrl}/v1/streaming.stop`,
        { session_id: sessionInfo.session_id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );
      updateStatus("Session stopped successfully.");

      // Cleanup LiveKit
      if (roomRef.current) {
        roomRef.current.disconnect();
        roomRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      mediaStreamRef.current = null;

      // Cleanup WebSocket
      if (websocketRef.current) {
        websocketRef.current.close();
        websocketRef.current = null;
      }

      // Reset states
      setSessionInfo(null);
      setSessionToken(null);
      setStreamStarted(false);

      updateStatus("Session closed & cleaned up.");
    } catch (error) {
      updateStatus(`Failed to close session: ${error?.response?.data?.message || error?.message}`);
      console.error("Error in closeSession:", error?.response?.data || error);
    }
  };

  const interruptSpeaking = async () => {
    try {
      updateStatus("Interrupting current speech...");
      await axios.post(
        `${API_CONFIG.serverUrl}/v1/streaming.interrupt`,
        { session_id: sessionInfo.session_id, },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": API_CONFIG.apiKey,
          },
        }
      );
      updateStatus("Speech interrupted successfully.");
    } catch (error) {
      updateStatus(`Failed to interrupt speech: ${error?.response?.data?.message || error?.message}`);
      console.error("Error in interruptSpeaking:", error);
    }
  };
  

  // ----------------------------------------------------------------
  // The main "Start" flow:
  // 1) createNewSession -> 2) startStreaming -> 3) connect LiveKit -> 4) connect WebSocket
  // ----------------------------------------------------------------
  const handleStart = async () => {
    const newToken = await getSessionToken();
    if (!newToken) {
        updateStatus("Failed to retrieve session token, aborting start.");
        return;
    }

    updateStatus("Start: Creating new session...");
    const newSession = await createNewSession(newToken);
    if (!newSession) {
      updateStatus("No session info returned, aborting handleStart.");
      return;
    }

    // Start session so ephemeral room is created
    const started = await startStreamingSession(newSession.session_id, newToken);
    if (!started) {
      updateStatus("Failed to start session, cannot proceed.");
      return;
    }

    // Now that session is started, we can connect to LiveKit
    await createAndConnectRoom(newSession);

    // Then connect the WebSocket for streaming.chat
    await connectWebSocket(newSession.session_id);
  };

  // ******** DEEPGRAM: Speech to Text (STT) ********  
  const handleTranscribed = async(transcribedText) => {
    console.log("Deepgram transcribed text:", transcribedText);
    if (transcribedText.trim()) {
      await sendText(transcribedText, "talk");
    }
    return true;
  };

  // ----------------------------------------------------------------
  // Render UI
  // ----------------------------------------------------------------
  return (
    <main className="bg-gray-100 p-5 font-sans min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-5 rounded-lg shadow-md">
        {/* Avatar & Voice Inputs + Start/Close Buttons */}
        <div className="flex flex-wrap gap-2.5 mb-5">
          <input
            type="text"
            placeholder="Avatar Name"
            value={avatarName}
            onChange={(e) => setAvatarName(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Voice ID"
            value={voiceName}
            onChange={(e) => setVoiceName(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleStart}
            disabled={streamStarted}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={closeSession}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Text input area + Talk/Repeat Buttons */}
        {streamStarted && <div className="flex flex-wrap gap-2.5 mb-5">
          <input
            type="text"
            placeholder="Enter text for avatar to speak"
            value={userText}
            onChange={(e) => setUserText(e.target.value)}
            className="flex-1 min-w-[200px] p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              if (userText.trim()) {
                sendText(userText.trim(), "talk");
                setUserText("");
              }
            }}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Talk (LLM)
          </button>
          <button
            onClick={() => {
              if (userText.trim()) {
                sendText(userText.trim(), "repeat");
                setUserText("");
              }
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Repeat
          </button>

        </div>}

        {/* Deepgram Speech-to-Text section */}
        {streamStarted && <div className="my-5">
            <h2 className="text-xl font-bold mb-2">Speech-to-Text</h2>
            <DeepgramLiveSTT onTranscribed={handleTranscribed} />
        </div>}

        {/* Video element for streaming */}
        <video
          ref={videoRef}
          className="w-full max-h-[400px] border rounded-lg my-5"
          autoPlay
        ></video>

        {/* Status logs */}
        <div className="p-2.5 bg-gray-50 border border-gray-300 rounded-md h-[150px] overflow-y-auto font-mono text-sm">
          {statusMessages.map((msg, idx) => (
            <div key={idx}>{msg}</div>
          ))}
        </div>
      </div>
    </main>
  );
}

