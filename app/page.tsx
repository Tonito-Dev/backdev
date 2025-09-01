"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";
import Image from "next/image";

export default function Home() {
  const [code, setCode] = useState(`// Welcome to Backend Generator!
// Paste your frontend code here and we'll generate
// the corresponding backend code.

interface User {
  id: string;
  name: string;
  email: string;
}

// Example API endpoints:
// GET /api/users
// POST /api/users
// GET /api/users/:id`);
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
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/window.svg" alt="Logo" width={32} height={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Backend Generator
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://github.com/Tonito-Dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Image src="/globe.svg" alt="GitHub" width={24} height={24} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel: Input */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Image src="/file.svg" alt="Code" width={20} height={20} />
                Frontend Code
              </h2>
              <div className="flex gap-2">
                <select
                  value={db}
                  onChange={(e) => setDb(e.target.value)}
                  className="bg-gray-800/50 p-2 rounded border border-gray-700 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="postgres">PostgreSQL</option>
                  <option value="mysql">MySQL</option>
                  <option value="mongodb">MongoDB</option>
                </select>

                <select
                  value={framework}
                  onChange={(e) => setFramework(e.target.value)}
                  className="bg-gray-800/50 p-2 rounded border border-gray-700 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="express">Express (Node.js)</option>
                  <option value="nestjs">NestJS</option>
                  <option value="fastapi">FastAPI (Python)</option>
                  <option value="go">Go + GORM</option>
                </select>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden border border-gray-800">
              <Editor
                height="500px"
                defaultLanguage="typescript"
                value={code}
                onChange={(val) => setCode(val || "")}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: true },
                  scrollBeyondLastLine: false,
                  padding: { top: 16 },
                }}
              />
            </div>

            <button
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto"
              onClick={generateBackend}
            >
              <Image src="/next.svg" alt="Generate" width={20} height={20} />
              <span>Generate Backend</span>
            </button>
          </div>

          {/* Right Panel: Output */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Image src="/vercel.svg" alt="Output" width={20} height={20} />
                Generated Backend
              </h2>
            </div>
            <div className="flex-1 bg-black/50 rounded-lg border border-gray-800 overflow-hidden">
              <pre className="p-6 h-[500px] overflow-y-auto font-mono text-sm leading-relaxed">
                {backendCode || "Your generated backend code will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
