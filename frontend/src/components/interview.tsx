import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';

// Type definitions
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionStatic {
  new(): SpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: SpeechRecognitionStatic;
    webkitSpeechRecognition: SpeechRecognitionStatic;
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

const AIVoiceAssistant: React.FC = () => {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [displayedResponse, setDisplayedResponse] = useState<string>('');
  const [circleScale, setCircleScale] = useState<number>(1);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationRef = useRef<number | null>(null);
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          handleUserInput(finalTranscript);
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        stopAudioAnalysis();
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechSynthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Audio analysis for microphone input
  const startAudioAnalysis = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      analyserRef.current.fftSize = 256;
      microphoneRef.current.connect(analyserRef.current);
      
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      
      const updateAudioLevel = (): void => {
        if (analyserRef.current && isListening) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
          setAudioLevel(average);
          setCircleScale(1 + (average / 255) * 0.5);
          animationRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioAnalysis = (): void => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setAudioLevel(0);
    setCircleScale(1);
  };

  const toggleListening = (): void => {
    if (isListening) {
      recognitionRef.current?.stop();
      stopAudioAnalysis();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start();
        startAudioAnalysis();
        setIsListening(true);
        setTranscript('');
      }
    }
  };

  // Simple AI responses (in a real app, you'd call an actual AI API)
  const getAIResponse = (input: string): string => {
    const responses: string[] = [
      "That's an interesting question! Let me think about that for a moment.",
      "I understand what you're asking. Here's what I think about that topic.",
      "Thanks for sharing that with me. I'd be happy to help you with this.",
      "That's a great point you've raised. Let me provide some insights on this.",
      "I see what you mean. This is definitely something worth discussing further.",
      "You've brought up something important. Here's my perspective on this matter.",
      "I appreciate you asking about this. Let me give you a thoughtful response."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleUserInput = (input: string): void => {
    const aiResponse = getAIResponse(input);
    setResponse(aiResponse);
    setDisplayedResponse('');
    animateResponse(aiResponse);
  };

  // Animate text word by word and speak
  const animateResponse = (text: string): void => {
    setIsSpeaking(true);
    const words = text.split(' ');
    let currentIndex = 0;
    
    // Start speech synthesis
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCircleScale(1);
      };
      
      // Animate circle while speaking
      const speakingAnimation = (): void => {
        if (isSpeaking) {
          setCircleScale(1 + Math.sin(Date.now() * 0.01) * 0.2);
          requestAnimationFrame(speakingAnimation);
        }
      };
      speakingAnimation();
      
      speechSynthRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
    
    // Animate text display
    const displayWords = (): void => {
      if (currentIndex < words.length) {
        setDisplayedResponse(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
        currentIndex++;
        setTimeout(displayWords, 150); // Adjust speed here
      }
    };
    
    displayWords();
  };

  const stopSpeaking = (): void => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setCircleScale(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      {/* AI Agent Circle */}
      <div className="relative mb-12">
        <div 
          className="w-32 h-32 bg-white rounded-full shadow-lg transition-transform duration-100 ease-out border-2 border-gray-100"
          style={{ 
            transform: `scale(${circleScale})`,
            boxShadow: isListening || isSpeaking ? '0 0 30px rgba(59, 130, 246, 0.3)' : '0 10px 25px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            {isListening && (
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            )}
            {isSpeaking && (
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            )}
            {!isListening && !isSpeaking && (
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
            )}
          </div>
        </div>
        
        {/* Audio level indicator */}
        {isListening && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
            <div 
              className="h-2 bg-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${Math.max(20, audioLevel)}px` }}
            ></div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={toggleListening}
          className={`p-4 rounded-full transition-all duration-200 ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
              : 'bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200'
          }`}
          disabled={isSpeaking}
        >
          {isListening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="p-4 rounded-full bg-white hover:bg-gray-50 text-gray-700 shadow-md border border-gray-200 transition-all duration-200"
          >
            <Volume2 size={24} />
          </button>
        )}
      </div>

      {/* Status */}
      <div className="text-center mb-8">
        {isListening && (
          <p className="text-blue-600 font-medium">Listening...</p>
        )}
        {isSpeaking && (
          <p className="text-green-600 font-medium">Speaking...</p>
        )}
        {!isListening && !isSpeaking && (
          <p className="text-gray-500">Click the microphone to start</p>
        )}
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="w-full max-w-2xl mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">You said:</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800">{transcript}</p>
          </div>
        </div>
      )}

      {/* AI Response */}
      {displayedResponse && (
        <div className="w-full max-w-2xl">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">AI Response:</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-gray-800">
              {displayedResponse}
              {isSpeaking && <span className="animate-pulse">|</span>}
            </p>
          </div>
        </div>
      )}

      {/* Browser compatibility note */}
      {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800 text-sm">
            Speech recognition is not supported in this browser. Please use Chrome or Edge for the best experience.
          </p>
        </div>
      )}
    </div>
  );
};

export default AIVoiceAssistant;