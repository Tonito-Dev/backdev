# 🚀 Backend Generator (backdev)

A powerful AI-powered tool that helps frontend developers automatically generate backend code and database schemas from their frontend code. Built with Next.js, TypeScript, and GroqCloud's AI model.

## ✨ Features

- **🤖 AI-Powered Generation**: Uses GroqCloud's `llama-3.3-70b-versatile` model to generate high-quality backend code
- **🔄 Multi-Framework Support**: Generate backend code for various frameworks and languages
- **🗄️ Database Schema Generation**: Automatically creates PostgreSQL schemas based on your frontend code
- **🎯 TypeScript First**: Fully typed for better development experience
- **⚡ Real-time Generation**: Instant backend code generation as you type or paste frontend code
- **📚 Multiple Database Support**: Currently supports PostgreSQL with more databases coming soon

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

**Backend:**
- Next.js API Routes
- TypeScript
- GroqCloud AI Integration

**AI Model:**
- GroqCloud - `llama-3.3-70b-versatile`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GroqCloud API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/backend-generator.git
   cd backend-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your_groqcloud_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💡 How to Use

1. **Paste Frontend Code**: Input your frontend code in the provided editor
2. **Select Database**: Choose your preferred database (currently PostgreSQL)
3. **Choose Framework**: Select your backend framework/language
4. **Generate**: Let the AI create your backend code and database schema
5. **Copy & Use**: Copy the generated code and integrate into your project

### Example Usage

**Input (Frontend Code):**
```javascript
// Example API endpoints from your frontend
// GET /api/users
// POST /api/users  
// GET /api/users/:id
```

**Generated Output:**
- Express.js backend code with all endpoints
- PostgreSQL database schema
- Model definitions and API routes

## 🏗️ Project Structure

```
backend-generator/
├── app/
│   ├── api/              # API routes
│   │   └── generate/     # Backend generation endpoint
│   ├── components/       # React components
│   ├── lib/             # Utility functions
│   └── page.tsx         # Main application page
├── public/              # Static assets
├── types/               # TypeScript type definitions
└── package.json
```

## 🔧 API Reference

### Generate Backend Code

```http
POST /api/generate
Content-Type: application/json

{
  "frontendCode": "string",
  "database": "postgresql",
  "framework": "express"
}
```

Response:
```json
{
  "backendCode": "generated code here",
  "schema": "database schema here"
}
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests, report bugs, or suggest new features.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GroqCloud](https://groq.com/) for providing the AI model
- [Next.js](https://nextjs.org/) for the amazing framework
- The open-source community for inspiration and tools

## 📞 Support

If you have any questions or need help, please open an issue or reach out to the development team.

---

**Note**: This project is in active development. Features and documentation are subject to change.
