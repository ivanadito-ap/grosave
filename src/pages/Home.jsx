import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 text-base-content">
      {/* Hero Section */}
      <section className="hero min-h-[80vh] bg-gradient-to-b from-[#121212] to-[#0f2018] text-center px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Save More, Waste Less 🛒
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10">
            GroSave helps you manage groceries, track waste, and optimize
            spending. Simplify your shopping while reducing waste — all in one
            smart dashboard.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn btn-primary px-8 text-base font-semibold">
              Get Started
            </button>
            <button className="btn btn-outline text-base text-gray-200 border-gray-400 hover:border-primary hover:text-primary">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 mt-16 px-6 max-w-6xl w-full mb-24">
        <div className="card bg-[#1e1e1e] shadow-lg border border-[#2f2f2f] hover:border-primary transition-all">
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Track Waste</h2>
            <p className="text-gray-300">
              Monitor your household waste and identify ways to shop smarter and
              reduce leftovers.
            </p>
          </div>
        </div>

        <div className="card bg-[#1e1e1e] shadow-lg border border-[#2f2f2f] hover:border-primary transition-all">
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Save Money</h2>
            <p className="text-gray-300">
              Set budgets, log expenses, and visualize spending trends to
              achieve sustainable savings.
            </p>
          </div>
        </div>

        <div className="card bg-[#1e1e1e] shadow-lg border border-[#2f2f2f] hover:border-primary transition-all">
          <div className="card-body text-left">
            <h2 className="card-title text-primary">Smart Shopping</h2>
            <p className="text-gray-300">
              Get recommendations based on your purchase history to make
              efficient and eco-friendly decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pb-10 text-gray-500 text-sm text-center">
        Built with <span className="text-primary">💚</span> by the GroSave Team — RPL Project 2025
      </footer>
    </div>
  );
}