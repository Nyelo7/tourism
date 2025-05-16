import React, { useEffect, useRef, useState } from 'react';
import './QRScanner.css';

const QRScanner = ({ onResult, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        setError('Could not access camera. Please make sure you have granted camera permissions.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setScanning(false);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !scanning) return;

    const scanQRCode = async () => {
      try {
        if ('BarcodeDetector' in window) {
          const barcodeDetector = new window.BarcodeDetector({
            formats: ['qr_code']
          });

          const checkForQRCode = async () => {
            if (!videoRef.current || !scanning) return;
            
            try {
              const codes = await barcodeDetector.detect(videoRef.current);
              if (codes.length > 0) {
                const qrData = codes[0].rawValue;
                onResult(qrData);
                setScanning(false);
              } else {
                if (scanning) {
                  requestAnimationFrame(checkForQRCode);
                }
              }
            } catch (err) {
              console.error('QR Detection error:', err);
              if (scanning) {
                requestAnimationFrame(checkForQRCode);
              }
            }
          };

          checkForQRCode();
        } else {
          // Fallback to canvas-based detection
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          const scanFrame = () => {
            if (!videoRef.current || !scanning) return;
            
            try {
              canvas.width = videoRef.current.videoWidth;
              canvas.height = videoRef.current.videoHeight;
              context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              
              // Here you would implement a QR code detection algorithm
              // For now, we'll just simulate detection with a timeout
              setTimeout(() => {
                if (scanning) {
                  requestAnimationFrame(scanFrame);
                }
              }, 100);
            } catch (err) {
              console.error('Canvas scanning error:', err);
              if (scanning) {
                requestAnimationFrame(scanFrame);
              }
            }
          };

          videoRef.current.addEventListener('loadedmetadata', () => {
            if (scanning) {
              scanFrame();
            }
          });
        }
      } catch (err) {
        console.error('Scanner initialization error:', err);
        setError('Failed to initialize QR code scanner.');
      }
    };

    scanQRCode();
  }, [scanning, onResult]);

  return (
    <div className="qr-scanner-container">
      <div className="qr-scanner-overlay">
        <div className="qr-scanner-header">
          <h2>Scan QR Code</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="video-container">
          {error ? (
            <div className="error-message">{error}</div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
              />
              <div className="scan-region">
                <div className="scan-frame"></div>
              </div>
            </>
          )}
        </div>

        <div className="qr-scanner-footer">
          <p>Position the QR code within the frame to scan</p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner; 