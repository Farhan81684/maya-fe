"use client";
import React, { useRef, useState, useEffect } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { useMicVAD } from "@ricky0123/vad-react";

const DEEPGRAM_API_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || "";

export default function DeepgramLiveSTT({ onTranscribed }) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [status, setStatus] = useState("Ready");

  const mediaRecorderRef = useRef(null);
  const deepgramLiveRef = useRef(null);
  const finalTranscriptRef = useRef("");

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      finalTranscriptRef.current = "";
      setFinalTranscript("");

      const deepgram = createClient(DEEPGRAM_API_KEY);
      const live = deepgram.listen.live({
        model: "nova-3",
        punctuate: true,
        interim_results: true,
      });
      deepgramLiveRef.current = live;

      live.on(LiveTranscriptionEvents.Open, () => {
        setStatus("Connected to Deepgram");
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0 && live.getReadyState() === WebSocket.OPEN) {
            live.send(event.data);
          }
        };
        mediaRecorderRef.current.start(250);
        setStatus("Streaming audio...");
      });

      live.on(LiveTranscriptionEvents.Transcript, (data) => {
        const text = data.channel.alternatives[0]?.transcript || "";
        setTranscript(text);
        if (data.is_final) {
          finalTranscriptRef.current += " " + text.trim();
          setFinalTranscript(finalTranscriptRef.current.trim());
        }
      });

      live.on(LiveTranscriptionEvents.Error, (err) => {
        console.error("Deepgram error:", err);
        setStatus(`Deepgram error: ${err.message}`);
      });

      live.on(LiveTranscriptionEvents.Close, () => {
        setStatus("Connection closed");
      });
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setStatus(`Microphone error: ${err.message}`);
    }
  };

  const stopStreaming = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (deepgramLiveRef.current) {
      deepgramLiveRef.current.requestClose();
    }
    setIsRecording(false);
    setStatus("Stopped");
    
    if (onTranscribed && typeof onTranscribed === "function") {
      onTranscribed(finalTranscriptRef.current.trim());
    }
  };


  // Main Functions  
  const handleStart = async () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript("");
      setStatus("Connecting to Deepgram...");
      await startStreaming();
      handleVadStart(); // VAD start
    } else {
      console.log('Recording already started!!');
    }
  };

//   const handleToggleRecord = async () => {
//     if (!isRecording) {
//       setIsRecording(true);
//       setTranscript("");
//       setStatus("Connecting to Deepgram...");
//       await startStreaming();
//     } else {
//       stopStreaming();
//     }
//   };

  const pauseStreaming = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.pause();
      setStatus("Paused streaming audio...");
    }
  };
  
  const resumeStreaming = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "paused") {
      mediaRecorderRef.current.resume();
      setStatus("Streaming audio...");
    }
  };



  // VAD *****
    const [vadStarted, setVadStarted] = useState(false);
    const timerRef = useRef(null);
  
    const vad = useMicVAD({
      startOnLoad: false,
      onSpeechEnd: (audio) => {
        console.log("User stopped talking");
        handleSpeechEnd(); // comment it, if you uncomment the useEffect
      },
    });
  
    // uncomment: Important
    // useEffect(() => {
    // //   if(!vadStarted) return;
  
    //   if (!vad.userSpeaking) {
    //     timerRef.current = setTimeout(() => {
    //       handleSpeechEnd();
    //     }, 1000);
    //   } else {
    //     if (timerRef.current) {
    //       clearTimeout(timerRef.current);
    //       timerRef.current = null;
    //     }
    //   }
  
    //   return () => {
    //     if (timerRef.current) clearTimeout(timerRef.current);
    //   };
    // }, [vad.userSpeaking]);

    // useEffect(() => {
    //     // if(!vadStarted) return;
    
    //     if (!vad.userSpeaking) {
    //         handleSpeechEnd();
    //     }
    // }, [vad.userSpeaking]);
  

    // VAD functions
    const handleSpeechEnd = async () => { // Main function: called after speech ended
        console.log("User has not spoken for 1 second!");
  
        // if(!finalTranscript) return;
        if(!finalTranscript && !transcript) {
          console.log('speech end cancelled because there is not text to send!!!!!!!!');
          // console.log('finalRef: ', finalTranscriptRef.current);
          // console.log('transcript: ', transcript);
          return;
        }

        pauseStreaming();
        handleVadPause();
  
        // API calls will be made here
        try {
          if (onTranscribed && typeof onTranscribed === "function") {
            //   onTranscribed(finalTranscriptRef.current.trim());
            await onTranscribed(finalTranscriptRef.current.trim());
          }
          
          // after that
          setFinalTranscript('');
          finalTranscriptRef.current = '';
          console.log('resume after processing() ✅');
  
          resumeStreaming();
          handleVadStart();
        } catch {
          console.log('There is an error in handling Speech!');
          setStatus('There is an error in handling Speech!');
        }
    }
  
    const handleVadStart = () => {
      if (vad.start) {
        console.log('vad started!');
        vad.start();
      }
      setVadStarted(true);
    };
  
    const handleVadPause = () => {
      if (vad.listening) {
        console.log('vad paused!');
        vad.pause();
      }
      setVadStarted(false);
    };


  return (
    <div className="p-4 border rounded-md">
      <div className="mb-2">
        <button
        //   onClick={handleToggleRecord}
          disabled={isRecording}
          onClick={handleStart}
          className={`px-4 py-2 text-white rounded-md ${isRecording ? 'bg-blue-200' : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          {/* {isRecording ? "Stop Streaming" : "Start Streaming"} */}
          Talk to the Agent
        </button>
      </div>
      <p className="text-gray-800 text-sm mb-1">Status: {status}</p>
      <p className="text-gray-600 text-sm">
        Interim Transcript: <span className="font-semibold">{transcript}</span>
      </p>
      <div className="mt-4 p-2 border-t">
        <h3 className="font-bold">Final Transcript:</h3>
        <p className="text-gray-800">{finalTranscript}</p>
      </div>
    </div>
  );
}
