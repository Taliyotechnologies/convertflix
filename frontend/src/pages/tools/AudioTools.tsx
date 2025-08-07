import React, { useState, useRef } from 'react';
import './ToolsPage.css';

interface FileInfo {
  name: string;
  size: number;
  type: string;
  url: string;
}

const AudioTools: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<FileInfo | null>(null);
  const [compressionLevel, setCompressionLevel] = useState(80);
  const [outputFormat, setOutputFormat] = useState('mp3');
  const [bitrate, setBitrate] = useState('128');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      alert('Please select a valid audio file.');
      return;
    }

    const fileInfo: FileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file)
    };

    setSelectedFile(fileInfo);
    setProcessedFile(null);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleProcess = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock processed file
    const processedSize = Math.round(selectedFile.size * (compressionLevel / 100));
    const processedFileInfo: FileInfo = {
      name: selectedFile.name.replace(/\.[^/.]+$/, '') + '_compressed.' + outputFormat,
      size: processedSize,
      type: `audio/${outputFormat}`,
      url: selectedFile.url
    };
    
    setProcessedFile(processedFileInfo);
    setIsProcessing(false);
  };

  const handleDownload = () => {
    if (!processedFile) return;
    
    const link = document.createElement('a');
    link.href = processedFile.url;
    link.download = processedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="tools-page">
      <div className="container">
        <div className="tools-header">
          <h1 className="tools-title">Audio Compression & Conversion</h1>
          <p className="tools-subtitle">
            Convert audio files with high-quality compression
          </p>
        </div>

        <div className="tools-content">
          {/* Upload Area */}
          <div className="upload-section">
            <div 
              className={`upload-area ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="upload-content">
                  <div className="upload-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" stroke="currentColor" strokeWidth="2"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="upload-title">Drop your audio here</h3>
                  <p className="upload-subtitle">or click to browse</p>
                  <button className="btn btn-primary" onClick={handleBrowseClick}>
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileInputChange}
                    style={{ display: 'none' }}
                  />
                </div>
              ) : (
                <div className="file-preview">
                  <audio src={selectedFile.url} className="preview-audio" controls />
                  <div className="file-info">
                    <h4 className="file-name">Audio File</h4>
                    <p className="file-size">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <button className="btn btn-ghost" onClick={() => setSelectedFile(null)}>
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          {selectedFile && (
            <div className="settings-section">
              <h3 className="settings-title">Compression Settings</h3>
              <div className="settings-grid">
                <div className="setting-group">
                  <label className="setting-label">Compression Level</label>
                  <div className="compression-control">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={compressionLevel}
                      onChange={(e) => setCompressionLevel(Number(e.target.value))}
                      className="compression-slider"
                    />
                    <span className="compression-value">{compressionLevel}%</span>
                  </div>
                  <p className="setting-description">
                    Higher values = smaller file size, lower quality
                  </p>
                </div>

                <div className="setting-group">
                  <label className="setting-label">Output Format</label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="format-select"
                  >
                    <option value="mp3">MP3</option>
                    <option value="wav">WAV</option>
                    <option value="flac">FLAC</option>
                    <option value="aac">AAC</option>
                  </select>
                  <p className="setting-description">
                    Choose your preferred output format
                  </p>
                </div>

                <div className="setting-group">
                  <label className="setting-label">Bitrate</label>
                  <select
                    value={bitrate}
                    onChange={(e) => setBitrate(e.target.value)}
                    className="format-select"
                  >
                    <option value="64">64 kbps</option>
                    <option value="128">128 kbps</option>
                    <option value="192">192 kbps</option>
                    <option value="320">320 kbps</option>
                  </select>
                  <p className="setting-description">
                    Choose audio quality bitrate
                  </p>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="btn btn-primary btn-large"
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className="spinner"></div>
                      Processing...
                    </>
                  ) : (
                    'Compress & Convert'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Results */}
          {processedFile && (
            <div className="results-section">
              <h3 className="results-title">Compression Results</h3>
              <div className="results-grid">
                <div className="result-card original">
                  <h4 className="result-title">Original</h4>
                  <div className="result-info">
                    <p className="result-size">{formatFileSize(selectedFile!.size)}</p>
                    <p className="result-format">{selectedFile!.type}</p>
                  </div>
                </div>
                
                <div className="result-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                
                <div className="result-card processed">
                  <h4 className="result-title">Compressed</h4>
                  <div className="result-info">
                    <p className="result-size">{formatFileSize(processedFile.size)}</p>
                    <p className="result-format">{processedFile.type}</p>
                    <p className="result-savings">
                      {Math.round(((selectedFile!.size - processedFile.size) / selectedFile!.size) * 100)}% smaller
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="download-section">
                <button className="btn btn-primary btn-large" onClick={handleDownload}>
                  Download Compressed File
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioTools;
