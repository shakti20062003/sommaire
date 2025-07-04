'use client';

import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const { user } = useUser();

  return (
    <footer className="w-full bg-gradient-to-r from-rose-200 via-gray-100 to-orange-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo or profile image */}
        <div className="flex items-center gap-3">
          {user?.imageUrl ? (
            <Image
              src={user.imageUrl}
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-rose-300"
            />
          ) : (
            <span className="text-lg font-semibold text-gray-700">Sommaire.ai</span>
          )}
          <span className="text-sm text-gray-600">AI-Powered PDF Summarizer</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <Link href="/" className="hover:text-orange-500 transition">Home</Link>
          <Link href="/pricing" className="hover:text-orange-500 transition">Pricing</Link>
          <Link href="/dashboard" className="hover:text-orange-500 transition">My Summaries</Link>
          <Link href="/upload" className="hover:text-orange-500 transition">Upload Pdf</Link>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Sommaire.ai. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
