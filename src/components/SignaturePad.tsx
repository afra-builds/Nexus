import React, { useRef, useState } from 'react';

const SignaturePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState(false);
  const [status, setStatus] = useState('Draft');

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx?.beginPath();
    ctx?.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx?.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx?.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureSaved(false);
  };

  const saveSignature = () => {
    setSignatureSaved(true);
    alert('Signature saved successfully!');
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow">
      <h3 className="text-lg font-bold mb-3">Document Signature</h3>
      <p className="text-sm text-gray-600 mb-2">Sign below to approve document</p>
      <canvas
        ref={canvasRef}
        width={500}
        height={150}
        style={{ border: '2px solid #ccc', backgroundColor: '#fafafa', cursor: 'crosshair' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className="flex gap-3 mt-3">
        <button onClick={clearSignature} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
          Clear
        </button>
        <button onClick={saveSignature} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Save Signature
        </button>
      </div>
      {signatureSaved && (
        <p className="text-green-600 text-sm mt-2">✓ Document signed successfully</p>
      )}
      
      <div className="mt-4 pt-3 border-t">
        <label className="block text-sm font-medium mb-1">Document Status</label>
        <select 
          className="border rounded px-3 py-2 w-48"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Draft</option>
          <option>In Review</option>
          <option>Signed</option>
        </select>
      </div>
    </div>
  );
};

export default SignaturePad;
