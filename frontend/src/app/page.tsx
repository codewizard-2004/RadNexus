import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-xl font-bold text-purple-400">
            RadNexus
          </Link>
        </div>
        <nav className="flex gap-6">
          {/* Keep <a> for same-page scroll links */}
          <Link href="#features" className="hover:text-purple-400 transition">Features</Link>
          <Link href="#pricing" className="hover:text-purple-400 transition">Pricing</Link>
          <Link href="#signup" className="hover:text-purple-400 transition">Sign Up</Link>
        </nav>
        <Link href="/auth/login" className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded text-white font-semibold transition">
          Get Started
        </Link>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">AI-Powered Medical Imaging Reports</h1>
        <p className="text-lg md:text-2xl max-w-2xl mb-8 text-gray-300">
          Since you have an MRI scanner, you can upload your images and receive instant, AI-generated test reports. Download your results as PDFs. Fast, secure, and easy to use.
        </p>
        <Link href="/auth/signup" className="mt-4 bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded text-lg font-semibold transition">
          Sign Up Free
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Why RadNexus?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg flex flex-col items-center">
            <span className="text-purple-400 text-4xl mb-4">🧠</span>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-400">Advanced AI interprets your medical images and generates detailed, easy-to-understand reports.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg flex flex-col items-center">
            <span className="text-blue-400 text-4xl mb-4">🔒</span>
            <h3 className="text-xl font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-400">Your data is encrypted and never shared. We prioritize your privacy and security at every step.</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg flex flex-col items-center">
            <span className="text-green-400 text-4xl mb-4">⚡</span>
            <h3 className="text-xl font-semibold mb-2">Instant Results</h3>
            <p className="text-gray-400">Get your test report in seconds. Download as PDF and share with your doctor or keep for your records.</p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-gray-900 rounded-lg p-8 shadow-lg flex flex-col items-center border-2 border-purple-600">
            <h3 className="text-2xl font-bold mb-2">Free</h3>
            <p className="text-gray-400 mb-4">Perfect for individuals who need basic reports.</p>
            <ul className="mb-6 text-gray-300 self-start list-disc list-inside">
              <li>Upload MRI & X-ray images</li>
              <li>Instant AI-generated report</li>
              <li>Download PDF report</li>
              <li>Secure & private</li>
            </ul>
            <span className="text-3xl font-bold mb-4">$0</span>
            <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded text-white font-semibold transition">
              Get Started
            </Link>
          </div>
          {/* Paid Plan */}
          <div className="bg-gray-900 rounded-lg p-8 shadow-lg flex flex-col items-center border-2 border-blue-600">
            <h3 className="text-2xl font-bold mb-2">Pro</h3>
            <p className="text-gray-400 mb-4">For professionals and users who need more options.</p>
            <ul className="mb-6 text-gray-300 self-start list-disc list-inside">
              <li>All Free features</li>
              <li>Upload CT, PET, Ultrasound, and more</li>
              <li>Priority AI processing</li>
              <li>Advanced analytics</li>
              <li>Premium support</li>
            </ul>
            <span className="text-3xl font-bold mb-4">$9<span className="text-lg font-normal">/mo</span></span>
            <Link href="/signup?plan=pro" className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-semibold transition">
              Upgrade Now
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action / Signup */}
      <section id="signup" className="py-20 px-4 flex flex-col items-center bg-gradient-to-t from-black via-gray-900 to-black">
        <h2 className="text-3xl font-bold mb-4">Ready to get your AI-powered report?</h2>
        <p className="text-lg text-gray-300 mb-8">Sign up now and experience the future of medical imaging analysis.</p>
        <Link href="/signup" className="bg-purple-600 hover:bg-purple-700 px-10 py-4 rounded text-xl font-semibold transition">
          Sign Up Free
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800 mt-10">
        &copy; {new Date().getFullYear()} RadNexus. All rights reserved.
      </footer>
    </main>
  );
}