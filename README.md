# Windsurf Logo Generator

A Next.js application that generates unique and professional logos for windsurfing brands using DALL-E AI.

## Features

- Generate custom logos with brand name and tagline
- Specify preferred colors for your logo
- Modern, responsive UI built with Next.js and Tailwind CSS
- Integration with DALL-E for AI-powered logo generation

## Prerequisites

Before running this application, make sure you have:

1. Node.js installed (v18 or later)
2. An OpenAI API key

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd windsurf-logo-generator
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter your brand name (required)
2. Add an optional tagline
3. Specify preferred colors (optional)
4. Click "Generate Logo" to create your custom logo
5. The generated logo will appear below the form
6. Right-click and save the logo image to download it

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI API (DALL-E)
- React Hook Form
- Zod for form validation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
