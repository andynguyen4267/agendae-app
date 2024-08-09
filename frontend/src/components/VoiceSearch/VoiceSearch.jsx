import React, { useState, useEffect } from 'react';
import './VoiceSearch.css';

function VoiceSearch({ addTask }) {
    const [recognition, setRecognition] = useState(null);
    const [listening, setListening] = useState(false);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window)) {
            alert('Your browser does not support speech recognition. Please try this in a supported browser like Google Chrome.');
            return;
        }

        const processVoiceCommand = (command) => {
            if (command.toLowerCase().includes('add task')) {
                const task = command.replace(/add task/i, '').trim();
                if (task) {
                    addTask(task);
                }
            } else {
                console.log('Command not recognized:', command);
            }
        };

        const recog = new window.webkitSpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-US';

        recog.onstart = () => {
            console.log('Voice recognition started. Speak now.');
            setListening(true);
        };

        recog.onerror = (event) => {
            console.log('Voice recognition error', event);
        };

        recog.onend = () => {
            console.log('Voice recognition ended.');
            setListening(false);
        };

        recog.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            console.log('Transcript:', transcript);
            processVoiceCommand(transcript);
        };

        setRecognition(recog);
    }, [addTask]);

    const startRecognition = () => {
        if (recognition) {
            recognition.start();
        }
    };

    const stopRecognition = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    const toggleRecognition = () => {
        if (listening) {
            stopRecognition();
        } else {
            startRecognition();
        }
    };

    return (
        <div className="voice-search-container">
            <button 
                className={`voice-button ${listening ? 'listening' : ''}`} 
                onClick={toggleRecognition}
            >
                {listening ? 'Stop' : 'Start'}
            </button>
            {listening && <div className="spinner"></div>}
        </div>
    );
}

export default VoiceSearch;
