"use client";
import Link from "next/link";
import { useState } from "react";

import TestimonialCard from "./Testimonial/testimonial";
import Constant from "./constant";
import Footer from "./Footer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate animation delays for row-by-row effect
  const getAnimationDelay = (index) => {
    const cardsPerRow = 3; // Adjust based on your grid
    const row = Math.floor(index / cardsPerRow);
    return row * 1.5; // 1.5 second delay between rows
  };
  const containerHeight = 600; // Adjust to your container size

  const duration = 10; // Match TestimonialCard duration
  const stagger = duration / 2; // Stagger by half duration (5s)

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
        <section className="testimonials relative z-10">
          <div className="container">
            <h2>Testimonials</h2>
            <p>What our customers say about us</p>
          </div>
        </section>

        <div className="testimonial-section relative">
          <div className="testimonial-grid">
            {Constant.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                animationDelay={getAnimationDelay(index)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
