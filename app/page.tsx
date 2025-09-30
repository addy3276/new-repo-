"use client";
import Link from "next/link";
import { useState } from "react";
import TestimonialCard from "./Testimonial/testimonial";
import Constant from "./constant";
import Footer from "./Footer";
import HeroSection from "./HeroSection";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="page-wrapper overflow-hidden">
      <nav className="navbar">
        <div className="container">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="logo">
                <span role="img" aria-label="logo">
                  🏠
                </span>
              </Link>
              <div className="nav-links">
                <Link href="/products">Products</Link>
                <Link href="/solutions">Solutions</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/resources">Resources</Link>
              </div>
            </div>
            <div className="cta">
              <button className="cta-button">Start free or get a demo</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content relative">
        <HeroSection />

        <section className="testimonials relative z-10">
          <div className="container">
            <h2>Testimonials</h2>
            <p>What our customers say about us</p>
          </div>
        </section>

        <div className="testimonial-section relative px-4 py-8">
          <div className="md:max-w-7xl md:mx-auto md:bg-gray-50 md:rounded-3xl md:border-2 md:border-gray-200 md:p-8 md:shadow-xl">
            <div className="md:overflow-y-auto md:max-h-[600px] md:pr-2 md:scrollbar-thin md:scrollbar-thumb-gray-400 md:scrollbar-track-gray-200">
              <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Constant.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
