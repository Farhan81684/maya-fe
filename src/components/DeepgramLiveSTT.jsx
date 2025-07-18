"use client";
import React, { useRef, useState, useEffect, use } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";
import { useMicVAD } from "@ricky0123/vad-react";

const DEEPGRAM_API_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || "";

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function DeepgramLiveSTT({ onTranscribed, interruptSpeaking, messageLoading, isAISpeaking, isStarted, finalTranscript, setFinalTranscript, transcript, setTranscript, stopListening, setStopListening, setCountdown, setCountdownPercent }) {


  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState("Ready");

  const mediaRecorderRef = useRef(null);
  const deepgramLiveRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const [hasSpokenOnce, setHasSpokenOnce] = useState(false);


  const countdownIntervalRef = useRef(null);
  const timeoutRef = useRef(null);

  const startStreaming = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        // audio: true,
        audio: {
          noiseSuppression: true,
          echoCancellation: true,
          autoGainControl: true,
        },
        video: false,
      });
      console.log('stream: ', stream);
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
        console.log("Connected to Deepgram...!!!");
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0 && live.getReadyState() === WebSocket.OPEN) {
            live.send(event.data);
          }
        };
        mediaRecorderRef.current.start(100);
        setStatus("Streaming audio...");
      });

      live.on(LiveTranscriptionEvents.Transcript, (data) => {
        const text = data.channel.alternatives[0]?.transcript || "";
        if (data.is_final && text.trim()) {
          if (!finalTranscriptRef.current.includes(text.trim())) {
            finalTranscriptRef.current += ` ${text.trim()}`;
            setFinalTranscript(finalTranscriptRef.current.trim());
          }
        }
      });

      live.on(LiveTranscriptionEvents.Error, (err) => {
        console.error("Deepgram error:", err);
        setStatus(`Deepgram error: ${err.message}`);
      });

      live.on(LiveTranscriptionEvents.Close, () => {
        setStatus("Deepgram Connection closed");
        console.log("Deepgram Connection closed...!!!");
      });
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setStatus(`Microphone error: ${err.message}`);
    }
  };

  const stopStreaming = () => {
    console.log('Deepgram stopStreaming called!!!');
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    if (deepgramLiveRef.current) {
      deepgramLiveRef.current.requestClose();
      deepgramLiveRef.current = null;
    } else {
      console.log('deepgramLiveRef.current is null!!!');
    }
    setIsRecording(false);
    setStatus("Stopped");
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

  const vad = useMicVAD({
    startOnLoad: true,
    userSpeakingThreshold: .6,
    positiveSpeechThreshold: .6,
    negativeSpeechThreshold: .5,
    minSpeechFrames: 7,
    additionalAudioConstraints: {
      noiseSuppression: true,
      echoCancellation: true,
      autoGainControl: true,
    },
  });


  const handleUserNotSpeaking = () => {
    if (!hasSpokenOnce) return; // Don't trigger countdown if user hasn't spoken yet

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    let timeLeft = 2; // in seconds
    setCountdown(timeLeft);
    setCountdownPercent(100);

    countdownIntervalRef.current = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      setCountdownPercent((timeLeft / 2) * 100);
      if (timeLeft <= 0) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }, 1000);

    timeoutRef.current = setTimeout(async () => {
      console.log("⏳ Countdown complete. Handling speech end...");
      setCountdown(null);
      setCountdownPercent(0);
      await handleSpeechEnd();
    }, 2000);
  };

  const cancelCountdown = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    setCountdown(null);
    setCountdownPercent(0);
  };

  useEffect(() => {
    if (stopListening || isAISpeaking) return;
    if (vad.userSpeaking && !hasSpokenOnce) {
      setHasSpokenOnce(true);
    }
    if (vad.userSpeaking) {
      cancelCountdown();
    } else {
      handleUserNotSpeaking();
    }
  }, [vad.userSpeaking]);

  const handleSpeechEnd = async () => { // Main function: called after speech ended

    try {
      await onTranscribed(finalTranscriptRef.current.trim());
      setFinalTranscript('');
      finalTranscriptRef.current = '';
      console.log('resume after processing() ✅');

    } catch (e) {
      console.log('There is an error in handling Speech!', e?.message || e);
      setStatus('There is an error in handling Speech!');
    }
  }


  const handleVadStart = () => {
    if (vad.pause) {
      vad.start();
      mediaRecorderRef.current?.resume();
      console.log('vad started!');
    }
  };

  const handleVadPause = async () => {
    if (vad.listening) {
      console.log('vad paused!');
      vad.pause();
      mediaRecorderRef.current?.pause();
    }
  };

  useEffect(() => {
    if (stopListening) handleVadPause();
    if (!stopListening) handleVadStart();
  }, [stopListening]);

  useEffect(() => {
    const initiateRecording = async () => {
      await handleStart();
    };
    isStarted ? initiateRecording() : stopStreaming();

    return () => stopStreaming();
  }, [isStarted]);


  return null;

}
