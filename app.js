class SentimentAnalyzer {
    constructor() {
        this.video = document.getElementById('video');
        this.overlay = document.getElementById('overlay');
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.snapshotBtn = document.getElementById('snapshotBtn');
        this.closeSnapshotBtn = document.getElementById('closeSnapshot');
        this.errorCloseBtn = document.getElementById('errorClose');
        this.modelSelect = document.getElementById('modelSelect');
        this.loading = document.getElementById('loading');
        this.fpsDisplay = document.getElementById('fps');
        this.faceCountDisplay = document.getElementById('faceCount');
        this.emotionDisplay = document.getElementById('emotionDisplay');
        this.snapshotContainer = document.getElementById('snapshotContainer');
        this.errorModal = document.getElementById('errorModal');
        this.statusText = document.getElementById('statusText');
        
        this.stream = null;
        this.isDetecting = false;
        this.animationId = null;
        this.lastFrameTime = Date.now();
        this.frameCount = 0;
        this.fps = 0;
        this.modelsLoaded = false;
        this.currentModel = 'ssd';
        
        this.emotionEmojis = {
            neutral: '😐',
            happy: '😊',
            sad: '😢',
            angry: '😠',
            fearful: '😨',
            disgusted: '🤢',
            surprised: '😲'
        };
        
        this.emotionColors = {
            neutral: '#94a3b8',
            happy: '#4ade80',
            sad: '#60a5fa',
            angry: '#f87171',
            fearful: '#c084fc',
            disgusted: '#a3e635',
            surprised: '#fbbf24'
        };
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        await this.loadModels();
    }
    
    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.startCamera());
        this.stopBtn.addEventListener('click', () => this.stopCamera());
        this.snapshotBtn.addEventListener('click', () => this.takeSnapshot());
        this.closeSnapshotBtn.addEventListener('click', () => this.closeSnapshot());
        this.errorCloseBtn.addEventListener('click', () => this.closeError());
        this.modelSelect.addEventListener('change', (e) => this.switchModel(e.target.value));
    }
    
    async loadModels() {
        try {
            this.showLoading(true);
            this.updateStatus('Loading AI models...');
            
            const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
            
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
            ]);
            
            this.modelsLoaded = true;
            this.showLoading(false);
            this.updateStatus('Models loaded');
            console.log('Face detection models loaded successfully');
        } catch (error) {
            console.error('Error loading models:', error);
            this.showError('Failed to load AI models. Please refresh the page and try again.');
            this.showLoading(false);
            this.updateStatus('Error loading models');
        }
    }
    
    async startCamera() {
        if (!this.modelsLoaded) {
            this.showError('Please wait for the AI models to load.');
            return;
        }
        
        try {
            this.updateStatus('Accessing camera...');
            
            const constraints = {
                video: {
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            };
            
            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.video.srcObject = this.stream;
            
            this.video.addEventListener('loadedmetadata', () => {
                this.overlay.width = this.video.videoWidth;
                this.overlay.height = this.video.videoHeight;
                this.startDetection();
            });
            
            this.startBtn.disabled = true;
            this.stopBtn.disabled = false;
            this.snapshotBtn.disabled = false;
            this.updateStatus('Camera active');
        } catch (error) {
            console.error('Error accessing camera:', error);
            this.handleCameraError(error);
        }
    }
    
    handleCameraError(error) {
        let message = 'Unable to access camera. ';
        
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            message += 'Please grant camera permissions and reload the page.';
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
            message += 'No camera device found. Please connect a camera and try again.';
        } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
            message += 'Camera is already in use by another application.';
        } else if (error.name === 'OverconstrainedError' || error.name === 'ConstraintNotSatisfiedError') {
            message += 'Camera does not support the requested settings.';
        } else {
            message += 'Please check your camera and try again.';
        }
        
        this.showError(message);
        this.updateStatus('Camera error');
    }
    
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
            this.stream = null;
        }
        
        this.stopDetection();
        this.clearOverlay();
        
        this.startBtn.disabled = false;
        this.stopBtn.disabled = true;
        this.snapshotBtn.disabled = true;
        this.emotionDisplay.classList.add('hidden');
        this.updateStatus('Camera stopped');
    }
    
    startDetection() {
        this.isDetecting = true;
        this.emotionDisplay.classList.remove('hidden');
        this.detect();
    }
    
    stopDetection() {
        this.isDetecting = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    async detect() {
        if (!this.isDetecting) return;
        
        this.updateFPS();
        
        const options = this.currentModel === 'tiny' 
            ? new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 })
            : new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
        
        try {
            const detections = await faceapi
                .detectAllFaces(this.video, options)
                .withFaceLandmarks()
                .withFaceExpressions();
            
            this.drawDetections(detections);
            this.updateEmotionDisplay(detections);
            this.faceCountDisplay.textContent = detections.length;
        } catch (error) {
            console.error('Detection error:', error);
        }
        
        this.animationId = requestAnimationFrame(() => this.detect());
    }
    
    drawDetections(detections) {
        const ctx = this.overlay.getContext('2d');
        ctx.clearRect(0, 0, this.overlay.width, this.overlay.height);
        
        detections.forEach(detection => {
            const { x, y, width, height } = detection.detection.box;
            
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);
            
            const maxEmotion = this.getMaxEmotion(detection.expressions);
            if (maxEmotion) {
                const emoji = this.emotionEmojis[maxEmotion.emotion];
                const confidence = Math.round(maxEmotion.probability * 100);
                
                ctx.fillStyle = 'rgba(102, 126, 234, 0.9)';
                ctx.fillRect(x, y - 35, width, 35);
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px Arial';
                ctx.fillText(`${emoji} ${maxEmotion.emotion} ${confidence}%`, x + 5, y - 10);
                
                this.drawLandmarks(ctx, detection.landmarks);
            }
        });
    }
    
    drawLandmarks(ctx, landmarks) {
        const points = landmarks.positions;
        
        ctx.fillStyle = 'rgba(240, 147, 251, 0.8)';
        points.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fill();
        });
    }
    
    getMaxEmotion(expressions) {
        const emotions = Object.entries(expressions);
        if (emotions.length === 0) return null;
        
        const maxEmotion = emotions.reduce((max, [emotion, probability]) => 
            probability > max.probability ? { emotion, probability } : max,
            { emotion: null, probability: 0 }
        );
        
        return maxEmotion.emotion ? maxEmotion : null;
    }
    
    updateEmotionDisplay(detections) {
        if (detections.length === 0) {
            document.getElementById('emotionBars').innerHTML = '<p style="color: #a0a0b8;">No face detected</p>';
            document.getElementById('emotionName').textContent = '-';
            document.getElementById('emotionConfidence').textContent = '0%';
            return;
        }
        
        const expressions = detections[0].expressions;
        const sortedEmotions = Object.entries(expressions)
            .sort(([, a], [, b]) => b - a);
        
        const emotionBarsHTML = sortedEmotions.map(([emotion, probability]) => {
            const percentage = Math.round(probability * 100);
            const emoji = this.emotionEmojis[emotion];
            const color = this.emotionColors[emotion];
            
            return `
                <div class="emotion-bar">
                    <span class="emotion-icon">${emoji}</span>
                    <div class="emotion-info">
                        <span class="emotion-name">${emotion}</span>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%; background: ${color};"></div>
                        </div>
                    </div>
                    <span class="emotion-percentage">${percentage}%</span>
                </div>
            `;
        }).join('');
        
        document.getElementById('emotionBars').innerHTML = emotionBarsHTML;
        
        const dominantEmotion = sortedEmotions[0];
        document.getElementById('emotionName').textContent = dominantEmotion[0];
        document.getElementById('emotionConfidence').textContent = `${Math.round(dominantEmotion[1] * 100)}%`;
    }
    
    async takeSnapshot() {
        const snapshotCanvas = document.getElementById('snapshotCanvas');
        const ctx = snapshotCanvas.getContext('2d');
        
        snapshotCanvas.width = this.video.videoWidth;
        snapshotCanvas.height = this.video.videoHeight;
        
        ctx.drawImage(this.video, 0, 0);
        
        const options = this.currentModel === 'tiny' 
            ? new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.5 })
            : new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 });
        
        const detections = await faceapi
            .detectAllFaces(snapshotCanvas, options)
            .withFaceLandmarks()
            .withFaceExpressions();
        
        detections.forEach(detection => {
            const { x, y, width, height } = detection.detection.box;
            
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 3;
            ctx.strokeRect(x, y, width, height);
            
            const maxEmotion = this.getMaxEmotion(detection.expressions);
            if (maxEmotion) {
                const emoji = this.emotionEmojis[maxEmotion.emotion];
                const confidence = Math.round(maxEmotion.probability * 100);
                
                ctx.fillStyle = 'rgba(102, 126, 234, 0.9)';
                ctx.fillRect(x, y - 35, width, 35);
                
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px Arial';
                ctx.fillText(`${emoji} ${maxEmotion.emotion} ${confidence}%`, x + 5, y - 10);
            }
        });
        
        const snapshotEmotions = document.getElementById('snapshotEmotions');
        if (detections.length > 0) {
            const emotions = Object.entries(detections[0].expressions)
                .sort(([, a], [, b]) => b - a)
                .map(([emotion, probability]) => {
                    const percentage = Math.round(probability * 100);
                    return `<div>${this.emotionEmojis[emotion]} ${emotion}: ${percentage}%</div>`;
                })
                .join('');
            snapshotEmotions.innerHTML = `<h4>Emotion Analysis:</h4>${emotions}`;
        } else {
            snapshotEmotions.innerHTML = '<p>No face detected in snapshot</p>';
        }
        
        this.snapshotContainer.classList.remove('hidden');
    }
    
    closeSnapshot() {
        this.snapshotContainer.classList.add('hidden');
    }
    
    async switchModel(model) {
        this.currentModel = model;
        if (this.isDetecting) {
            this.stopDetection();
            await new Promise(resolve => setTimeout(resolve, 100));
            this.startDetection();
        }
    }
    
    updateFPS() {
        this.frameCount++;
        const currentTime = Date.now();
        const elapsed = currentTime - this.lastFrameTime;
        
        if (elapsed >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / elapsed);
            this.fpsDisplay.textContent = this.fps;
            this.frameCount = 0;
            this.lastFrameTime = currentTime;
        }
    }
    
    clearOverlay() {
        const ctx = this.overlay.getContext('2d');
        ctx.clearRect(0, 0, this.overlay.width, this.overlay.height);
    }
    
    showLoading(show) {
        this.loading.classList.toggle('hidden', !show);
    }
    
    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        this.errorModal.classList.remove('hidden');
    }
    
    closeError() {
        this.errorModal.classList.add('hidden');
    }
    
    updateStatus(status) {
        this.statusText.textContent = status;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SentimentAnalyzer();
});