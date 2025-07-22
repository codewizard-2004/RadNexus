export default function AuthPage() {
  return (
    <main className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white font-sans">
      <div className="bg-gray-900 bg-opacity-90 rounded-lg shadow-lg p-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">Welcome to MedReportX</h1>
        <p className="text-gray-300 mb-8 text-center">Sign up or log in to access your AI-powered medical imaging reports.</p>
        <a href="/signup" className="w-full mb-4 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded text-lg font-semibold text-center transition block">Sign Up</a>
        <a href="/login" className="w-full mb-4 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg font-semibold text-center transition block">Log In</a>
        <div className="flex items-center w-full my-4">
          <div className="flex-grow h-px bg-gray-700" />
          <span className="mx-2 text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-700" />
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded hover:bg-gray-200 transition shadow-md">
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 19.5-21 0-1.4-.1-2.7-.3-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 5.1 29.6 3 24 3c-7.2 0-13 5.8-13 13 0 2.1.5 4.1 1.3 5.7z"/><path fill="#FBBC05" d="M24 45c5.8 0 10.7-1.9 14.3-5.2l-6.6-5.4C29.7 36.9 27 38 24 38c-5.7 0-10.6-3.1-13.1-7.7l-7 5.4C7.2 42.2 14.9 45 24 45z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.7 33.9 29.8 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.1-6.1C34.5 5.1 29.6 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 19.5-7.6 19.5-21 0-1.4-.1-2.7-.3-4z"/></g></svg>
          Continue with Google
        </button>
      </div>
    </main>
  );
} 