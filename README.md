# [Big-O Complexity Analyzer](https://big-o-bot.vercel.app)
A web application that analyzes code snippets and determines their time and space complexity using AI technology.
## Demo 
- link : [big-o-bot.vercel.app](https://big-o-bot.vercel.app)
## Features
- Code Analysis : Submit code snippets to get instant time and space complexity analysis
- Responsive Design : Works seamlessly across desktop and mobile devices
- Real-time Feedback : Visual indicators for loading states and error conditions
- Detailed Results : Clear presentation of time and space complexity with explanations
## Technologies Used
- React : Frontend UI library for building the user interface
- Next.js : React framework for server-side rendering and improved performance
- TypeScript : Type-safe JavaScript for better developer experience
- Tailwind CSS : Utility-first CSS framework for styling
- OpenRouter API : AI integration for code analysis
- Fetch API : For making asynchronous requests to the backend

## Screenshots
![Screenshot 1](/public/screenshots/ui.png)
![Screenshot 2](/public/screenshots/code.png)
![Screenshot 3](/public/screenshots/algo.png)
![Screenshot 4](/public/screenshots/function.png)
![Screenshot 5](/public/screenshots/error.png)
## Getting Started
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone https://github.com/ms0031/big-o.git
cd big-o
 ```
2. Install dependencies:
```bash
npm install
# or
yarn install
 ```

 3. Create a .env.local file in the root directory and add your API key:
```plaintext
OPENROUTER_API_KEY=your_api_key_here
 ```
4. Start the development server:
```bash
npm run dev
# or
```
5. Open http://localhost:3000 in your browser to see the application.

## Usage
1. Enter or paste your code snippet in the text area
2. Click "Get Answer" to analyze the code
3. View the time and space complexity results displayed below

## Project Structure
```plaintext
big-o/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts
│   │   ├── components/
│   │   │   ├── Cover.tsx
│   │   │   └── Navbar.tsx
│   │   └── page.tsx
│   └── ...
├── .env.local
├── package.json
└── ...
 ```

 ## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments
- Thanks to OpenRouter for providing the AI capabilities
- Inspired by the need to quickly understand algorithm efficiency