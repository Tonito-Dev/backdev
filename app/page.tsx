"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [code, setCode] = useState("// Paste your frontend code here...")
  const [backendCode, setBackendCode] = useState("");
  const [db, setDb] = useState("postgres");
  const [framework, setFramework] = useState("express");


  const generateBackend = async () => {
    setBackendCode(""); //reseting output 
    const res = await fetch("/api/generate",{
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ code, db, framework }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    let result = "";
    while (true) {
      const { done, value } = await reader!.read();
      if(done) break;
      result += decoder.decode(value);
      setBackendCode(result);
    }
  };

  return (
    <main className="p-6 grid grid-cols-2 gap-6 min-h-screen bg-gray-900 text-white">
      {/* Left Panel: Input */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Frontend Code</h2>
        <Editor
          height="400px"
          defaultLanguage="typescript"
          value={code}
          onChange={(val) => setCode(val || "")}
          theme="vs-dark"
        />

        {/* Controls */}
        <div className="mt-4 flex gap-2">
          <select
            value={db}
            onChange={(e) => setDb(e.target.value)}
            className="bg-gray-800 p-2 rounded"
          >
            <option value="postgres">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="mongodb">MongoDB</option>
          </select>

          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="bg-gray-800 p-2 rounded"
          >
            <option value="express">Express (Node.js)</option>
            <option value="nestjs">NestJS</option>
            <option value="fastapi">FastAPI (Python)</option>
            <option value="go">Go + GORM</option>
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            onClick={generateBackend}
          >
            Generate Backend
          </button>
        </div>
      </div>

      {/* Right Panel: Output */}
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mb-2">Generated Backend</h2>
        <pre className="bg-black p-4 rounded overflow-y-auto flex-1">
          {backendCode}
        </pre>
      </div>
    </main>
  );
}

