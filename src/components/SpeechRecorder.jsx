import React, { useEffect, useRef } from 'react';

const SpeechRecorder = ({ isRecording, onTranscriptUpdate, onStop }) => {
  const recognitionRef = useRef(null);
  const isStartedRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported in this browser.');
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          onTranscriptUpdate(finalTranscript);
        }
      };

      recognition.onend = () => {
        isStartedRef.current = false;
        if (isRecording) {
          try {
            recognition.start();
            isStartedRef.current = true;
          } catch (e) {}
        } else {
          onStop();
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          isStartedRef.current = false;
        }
      };

      recognitionRef.current = recognition;
    }

    if (isRecording && !isStartedRef.current) {
      try {
        recognitionRef.current.start();
        isStartedRef.current = true;
      } catch (e) {
        console.log('Start error:', e);
      }
    } else if (!isRecording && isStartedRef.current) {
      try {
        recognitionRef.current.stop();
        isStartedRef.current = false;
      } catch (e) {
        console.log('Stop error:', e);
      }
    }

    return () => {
      if (recognitionRef.current && isStartedRef.current) {
        recognitionRef.current.stop();
        isStartedRef.current = false;
      }
    };
  }, [isRecording, onTranscriptUpdate, onStop]);

  return null;
};

export default SpeechRecorder;
