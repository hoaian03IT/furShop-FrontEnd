const { useState, useEffect } = require("react");

let recognition = null;

if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "vi-VI";
}

const useSpeechRecognition = () => {
    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (e) => {
            setText(e.results[e.results.length - 1][0].transcript);
        };
    }, []);

    const startListening = () => {
        setText("");
        setIsListening(true);
        recognition.start();
    };
    const stopListening = () => {
        setIsListening(false);
        recognition.stop();
    };

    return { text, isListening, startListening, stopListening, hasSpeechRecognitionSupport: !!recognition };
};

export default useSpeechRecognition;
