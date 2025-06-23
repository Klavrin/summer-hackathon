import { useState } from 'react'
import { Play, Brain, BookOpen, Target, ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function SophiraLanding() {
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Navigation */}
      <nav className="py-2 px-6 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-semibold">Sophira</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-neutral-600 hover:text-neutral-900">
              Features
            </a>
            <a href="#how" className="text-neutral-600 hover:text-neutral-900">
              How it works
            </a>
            <a href="#pricing" className="text-neutral-600 hover:text-neutral-900">
              Pricing
            </a>
            <button className="bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-800">
              Get started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Turn YouTube videos into
            <br />
            <span className="text-neutral-600">interactive learning</span>
          </h1>
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto">
            Paste any YouTube link. Get instant quizzes, flashcards, and practice problems
            powered by AI. Learn faster, remember more.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Link
              to="/home"
              className="bg-neutral-900 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-neutral-800 flex items-center space-x-2"
            >
              <span>Start learning</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900">
              <Play className="w-5 h-5" />
              <span>Watch demo</span>
            </button>
          </div>
          {/* Simple app preview */}
          <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-semibold mb-2">Sophira</h3>
                <p className="text-neutral-500">Watch. Learn. Remember</p>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Enter YouTube video URL..."
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg text-lg focus:outline-none focus:border-neutral-400"
                  defaultValue="https://youtube.com/watch?v=example"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <div className="flex items-center space-x-2 bg-neutral-100 px-4 py-2 rounded-lg">
                  <Brain className="w-4 h-4 text-neutral-600" />
                  <span className="text-sm">Quiz</span>
                </div>
                <div className="flex items-center space-x-2 bg-neutral-100 px-4 py-2 rounded-lg">
                  <BookOpen className="w-4 h-4 text-neutral-600" />
                  <span className="text-sm">Flashcards</span>
                </div>
                <div className="flex items-center space-x-2 bg-neutral-100 px-4 py-2 rounded-lg">
                  <Target className="w-4 h-4 text-neutral-600" />
                  <span className="text-sm">Practice</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-neutral-600">Active learners</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">1M+</div>
              <div className="text-neutral-600">Videos processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-neutral-600">Retention rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">4.9</div>
              <div className="text-neutral-600">User rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to learn better
            </h2>
            <p className="text-xl text-neutral-600">
              Simple tools that make complex topics easy to understand and remember.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">YouTube Integration</h3>
              <p className="text-neutral-600">
                Paste any YouTube link and we'll analyze the content instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Quizzes</h3>
              <p className="text-neutral-600">
                AI-generated questions that test your understanding of key concepts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flashcards</h3>
              <p className="text-neutral-600">
                Automatically created flashcards with spaced repetition for better memory.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-6 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-xl text-neutral-600">
              Three simple steps to transform any video into a learning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Paste YouTube URL</h3>
              <p className="text-neutral-600">
                Copy and paste any YouTube video link into Sophira.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">AI analyzes content</h3>
              <p className="text-neutral-600">
                Our AI processes the video and extracts key learning points.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Start learning</h3>
              <p className="text-neutral-600">
                Get quizzes, flashcards, and practice problems instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple pricing</h2>
            <p className="text-xl text-neutral-600">
              Start free, upgrade when you need more.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-neutral-600 mb-6">Perfect for trying out Sophira</p>
              <div className="text-4xl font-bold mb-6">
                $0<span className="text-lg text-neutral-600 font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>5 videos per month</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Basic quizzes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Simple flashcards</span>
                </li>
              </ul>
              <button className="w-full border border-neutral-300 text-neutral-900 py-3 rounded-lg hover:bg-neutral-50">
                Get started free
              </button>
            </div>

            <div className="border-2 border-neutral-900 rounded-2xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-neutral-900 text-white px-4 py-1 rounded-full text-sm">
                  Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-neutral-600 mb-6">For serious learners</p>
              <div className="text-4xl font-bold mb-6">
                $19<span className="text-lg text-neutral-600 font-normal">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Unlimited videos</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Advanced quizzes</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Smart flashcards</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Practice problems</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Progress tracking</span>
                </li>
              </ul>
              <button className="w-full bg-neutral-900 text-white py-3 rounded-lg hover:bg-neutral-800">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to learn smarter?</h2>
          <p className="text-xl text-neutral-600 mb-8">
            Join thousands of learners who are already using Sophira to master new topics.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-neutral-300 rounded-lg text-lg w-full sm:w-80 focus:outline-none focus:border-neutral-500"
            />
            <button className="bg-neutral-900 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-neutral-800 w-full sm:w-auto">
              Get started free
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <span className="text-xl font-semibold">Sophira</span>
            </div>
            <div className="text-neutral-600">© 2025 Sophira. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
