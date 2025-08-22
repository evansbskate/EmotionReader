# 🎭 EmotionReader

A real-time face and emotion detection web application powered by face-api.js and TensorFlow.js. Detect and analyze human emotions through your webcam with high accuracy and beautiful visualizations.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.0+-orange.svg)
![face-api.js](https://img.shields.io/badge/face--api.js-latest-green.svg)

## ✨ Features

- 🎥 **Real-time Webcam Detection** - Instant emotion analysis from your camera feed
- 😊 **7 Emotion Categories** - Detects happy, sad, angry, surprised, neutral, fearful, and disgusted expressions
- 📊 **Confidence Visualization** - Live emotion bars showing probability scores
- 📸 **Snapshot Analysis** - Capture and analyze still images
- ⚡ **Performance Monitoring** - Real-time FPS counter
- 🎨 **Modern UI** - Beautiful glassmorphism design with gradient accents
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🔄 **Model Selection** - Choose between fast (Tiny) or balanced (SSD) detection models

## 🚀 Quick Start

1. Clone the repository:
```bash
git clone https://github.com/yourusername/EmotionReader.git
cd EmotionReader
```

2. Open `index.html` in any modern web browser
3. Allow camera permissions when prompted
4. Start detecting emotions!

No installation, no build process, no server required - it just works! 🎉

## 🛠️ Technology Stack

- **face-api.js** - Face detection and emotion recognition
- **TensorFlow.js** - Machine learning in the browser
- **Vanilla JavaScript** - No framework dependencies
- **Modern CSS3** - Glassmorphism and animations
- **HTML5 Canvas** - Real-time overlay rendering

## 📋 Browser Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Webcam access
- JavaScript enabled

## 🎯 Use Cases

- **Mental Health Applications** - Monitor emotional states
- **User Experience Research** - Analyze user reactions
- **Educational Tools** - Learn about facial expressions
- **Entertainment** - Fun emotion-based games and filters
- **Accessibility** - Emotion-based interfaces

## 🔧 Configuration

### Switching Detection Models

The app offers two detection models:

- **Fast (Tiny)**: Lower accuracy but higher FPS (~190KB model)
- **Balanced (SSD)**: Better accuracy with good performance (~5.4MB model)

You can switch between models using the dropdown in the stats panel.

## 📊 Detected Emotions

The app recognizes the following emotions with confidence scores:

| Emotion | Emoji | Description |
|---------|-------|-------------|
| Happy | 😊 | Joy, contentment, smiling |
| Sad | 😢 | Sadness, disappointment |
| Angry | 😠 | Anger, frustration |
| Surprised | 😲 | Shock, amazement |
| Neutral | 😐 | No strong emotion |
| Fearful | 😨 | Fear, anxiety |
| Disgusted | 🤢 | Disgust, displeasure |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [face-api.js](https://github.com/vladmandic/face-api) by vladmandic
- [TensorFlow.js](https://www.tensorflow.org/js) team
- Face detection models trained on public datasets

## 🔒 Privacy

This application runs entirely in your browser. No images or data are sent to any server. Your privacy is completely protected.

---

Built with ❤️ using face-api.js and TensorFlow.js