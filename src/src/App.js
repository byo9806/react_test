import React, { useRef, useState } from "react";
import { removeBackground } from "@imgly/background-removal";

function App() {
  const [resultUrl, setResultUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const imgArrayBuffer = await file.arrayBuffer();
      const result = await removeBackground(new Uint8Array(imgArrayBuffer));
      const blob = new Blob([result], { type: "image/png" });
      setResultUrl(URL.createObjectURL(blob));
    } catch (err) {
      alert("배경 제거 중 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", textAlign: "center" }}>
      <h2>AI 배경 제거 데모</h2>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageUpload}
        disabled={loading}
      />
      {loading && <p>배경 제거 중입니다. 잠시만 기다려 주세요...</p>}
      {resultUrl && (
        <div>
          <h4>결과:</h4>
          <img
            src={resultUrl}
            alt="배경 제거 결과"
            style={{ maxWidth: "100%", border: "1px solid #ccc" }}
          />
          <br />
          <a href={resultUrl} download="removed-bg.png">
            결과 이미지 다운로드
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
