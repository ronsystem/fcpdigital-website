'use client'

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-white font-bold text-lg">FCP Digital</p>
            <p className="text-gray-400 text-sm mt-1">
              AI Call Answering for Service Businesses
            </p>
          </div>
          <div className="flex gap-8">
            <a href="/terms" className="text-gray-400 hover:text-red-600 transition">
              Terms
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-red-600 transition">
              Privacy
            </a>
            <a href="mailto:hello@fcpdigital.net" className="text-gray-400 hover:text-red-600 transition">
              Contact
            </a>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            © 2026 FCP Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
