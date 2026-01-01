# 🚀 RePRo - The Refined Prompt Enhancer

> **The Ultimate AI Prompt Engineering Tool** - Transform any raw prompt into a powerful, optimized prompt using advanced AI techniques.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)](https://github.com/pavank-code/RePRo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/pavank-code/RePRo/pulls)

**RePRo** is a free, open-source Chrome Extension that acts as **"Grammarly for AI Prompts"** — paste any prompt and get an optimized version that works better with ChatGPT, Claude, Gemini, Midjourney, DALL-E, Sora, and more.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🧠 **Context-Aware Enhancement** | Auto-detects prompt type (text, code, image, video) and applies specialized optimization |
| 🎯 **One-Click Optimization** | Paste any prompt → Click "Enhance" → Get a 3-5x more effective prompt |
| 📋 **Copy to Clipboard** | One-click copy for immediate use |
| 🔄 **Compare View** | Side-by-side original vs enhanced comparison |
| 🌙 **Beautiful Dark UI** | Sleek neon glow design with smooth animations |
| 🔐 **Secure API Keys** | Your keys never leave your browser |
| 🆓 **Free Models** | Works with free OpenRouter models |

---

## 🎨 Supported Prompt Types

RePRo automatically detects and optimizes prompts for:

### 🖼️ Image Generation (DALL-E, Midjourney, Stable Diffusion)
- Adds style, lighting, composition, and quality modifiers
- Structure: `[Subject], [Action], [Environment], [Style], [Lighting], [Quality]`

### 🎬 Video Generation (Sora, Runway, Pika, Kling)
- Adds motion, camera movement, scene transitions
- Structure: `[Scene], [Camera], [Motion], [Transition], [Duration], [Quality]`

### 💻 Code Prompts
- Uses XML/JSON structured requirements
- Includes input/output examples and error handling

### 📊 Data & Analysis
- JSON schema for expected output
- Clear aggregation and transformation rules

### 📝 General Text
- Chain-of-Thought reasoning
- Role prompting for expertise

---

## 🛠️ Prompt Engineering Techniques

RePRo applies industry-standard prompt engineering techniques:

- ⛓️ **Chain-of-Thought (CoT)** - Step-by-step reasoning
- 🎭 **Role Prompting** - Expert persona assignment
- 📝 **Few-Shot** - Example-based formatting
- 🌳 **Tree of Thoughts (ToT)** - Multiple solution paths
- 📋 **Structured Templates** - Reusable formats
- 🏷️ **XML Prompting** - Tagged structured sections
- 📦 **JSON Prompting** - Schema-based output

---

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pavank-code/RePRo.git
   cd RePRo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open `chrome://extensions`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder

5. **Configure API Key**
   - Click the extension icon
   - Click ⚙️ Settings
   - Choose Gemini or OpenRouter
   - Enter your API key

### Get Free API Keys

| Provider | Link | Notes |
|----------|------|-------|
| **OpenRouter** | [openrouter.ai/keys](https://openrouter.ai/keys) | Free models available ⭐ |
| **Gemini** | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | Free tier with limits |

---

## 📸 Screenshots

<p align="center">
  <img src="docs/screenshot-main.png" alt="RePRo Main Interface" width="400">
  <img src="docs/screenshot-settings.png" alt="RePRo Settings" width="400">
</p>

---

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build**: Vite
- **Extension**: Chrome Manifest V3
- **APIs**: Gemini, OpenRouter (supports 20+ models)
- **Styling**: Custom CSS with neon effects

---

## 📁 Project Structure

```
RePRo/
├── src/
│   ├── popup/           # Main popup UI
│   ├── components/      # React components
│   ├── services/        # API integrations
│   ├── utils/           # Enhancement logic
│   └── styles/          # CSS styles
├── dist/                # Built extension
├── manifest.json        # Chrome extension config
└── package.json
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Star History

If you find RePRo useful, please ⭐ star the repository!

---

## 🔗 Links

- **GitHub**: [github.com/pavank-code/RePRo](https://github.com/pavank-code/RePRo)
- **Issues**: [Report bugs or request features](https://github.com/pavank-code/RePRo/issues)
- **Author**: [@pavank-code](https://github.com/pavank-code)

---

<p align="center">
  <b>RePRo</b> - Refined Prompt Enhancer | AI Prompt Engineering Tool<br>
  <i>prompt enhancer • prompt optimizer • AI prompt tool • ChatGPT prompt • Midjourney prompt • DALL-E prompt • prompt engineering • AI writing assistant</i>
</p>
