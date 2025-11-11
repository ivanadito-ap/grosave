import React from 'react';

export default function LearnMore() {
    return (
        <div className="min-h-screen pt-20 px-6 bg-base-100">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
                    About GroSave
                </h1>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-gray-300 leading-relaxed mb-6">
                        GroSave is designed to revolutionize how households manage their groceries
                        and reduce food waste. We believe that smart shopping leads to both
                        environmental and financial benefits.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                    <div className="grid gap-6">
                        <div className="card bg-[#1e1e1e] shadow-lg border hover:border-primary border-[#2f2f2f] transition-all">
                            <div className="card-body">
                                <h3 className="text-xl font-semibold text-primary">Track Your Groceries</h3>
                                <p className="text-gray-300">Log your purchases, set expiry reminders, and monitor your pantry inventory.</p>
                            </div>
                        </div>
                        <div className="card bg-[#1e1e1e] shadow-lg border hover:border-primary border-[#2f2f2f] transition-all">
                            <div className="card-body">
                                <h3 className="text-xl font-semibold text-primary">Analyze Your Spendings</h3>
                                <p className="text-gray-300">Get insights into your spending patterns and find opportunities to save.</p>
                            </div>
                        </div>
                        <div className="card bg-[#1e1e1e] shadow-lg border hover:border-primary border-[#2f2f2f] transition-all">
                            <div className="card-body">
                                <h3 className="text-xl font-semibold text-primary">Reduce Waste</h3>
                                <p className="text-gray-300">Receive alerts for items nearing expiration and tips to minimize food waste.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 max-w-6xl w-full mb-12">
                        <div className="card bg-[#1e1e1e] shadow-lg border border-[#2f2f2f] hover:border-primary transition-all">
                            <div className="card-body text-left">
                                <h2 className="card-title text-primary">Damn.</h2>
                                <p className="text-gray-300">I don't even know what to say anymore dawg.</p>
                            </div>
                        </div>
                        <div className="card bg-[#1e1e1e] shadow-lg border border-[#2f2f2f] hover:border-primary transition-all">
                            <div className="card-body text-left">
                                <h2 className="card-title text-primary">Tyshi.</h2>
                                <p className="text-gray-300">Ts is so ahh 💔</p>
                            </div>
                        </div>
                        <div className="card bg-[#1e1e1e] shadow-lg border border-[#2f2f2f] hover:border-primary transition-all">
                            <div className="card-body text-left">
                                <h2 className="card-title text-primary">We're out of time.</h2>
                                <p className="text-gray-300">Sayy, I'm there for you but I'm ouut of time!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}