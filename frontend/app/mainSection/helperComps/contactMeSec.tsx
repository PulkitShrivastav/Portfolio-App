import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { data } from "react-router"


const ContactMeSec = () => {

    const nameRef = useRef<HTMLInputElement | null>(null)
    const emailRef = useRef<HTMLInputElement | null>(null)
    const mssgRef = useRef<HTMLTextAreaElement>(null)

    const toastRef = useRef<HTMLDivElement | null>(null)
    const [toastMssg, setToastMssg] = useState('Toast')

    useEffect(() => {
        setTimeout(() => {
            gsap.set(toastRef.current, {
                scale: 0.8
            })
        }, 10);
    }, [])

    const toast = (mssg: string) => {
        setToastMssg(mssg)
        const tl = gsap.timeline().to(toastRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.in'
        }).to(toastRef.current, {
            delay: 1,
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: 'power2.out',
            onComplete: () => {
                tl.kill()
            }
        })
    }

    const transmitt = () => {
        const url = import.meta.env.VITE_API_URL

        const name = nameRef.current?.value
        const email = emailRef.current?.value
        const mssg = mssgRef.current?.value
        const body = {
            name: name,
            senderEmail: email,
            message: mssg
        }
        if (name === '' || email === '' || mssg === '') {
            toast('[ 500 // Please fill all the required values. ]')
            return
        } else {
            fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            }).then(data => data.json()).then(data => {
                console.log(data)
                if (data.success) {
                    toast("[ 200 // Transmission Dispatched ]")
                } else {
                    toast(`[ 404 // ${data.error} ]`)
                }
            })
        }
    }

    return (<section id="contact" className="min-h-screen bg-[#F5F2EB] text-[#1A1A1A] py-24 px-6 sm:px-12 lg:px-20 relative overflow-hidden font-sans selection:bg-[#E27D60] selection:text-white">

        {/* Subtle dot matrix background */}
        <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '24px 24px'
            }}>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

            <div className="flex items-center justify-between border-b border-[#1A1A1A]/15 pb-4 my-16 text-xs uppercase tracking-widest font-mono text-[#7A5C43]">
                <span>[ Volume 04 : Inquiries ]</span>
                <span>Correspondence &amp; Exchange</span>
                <span>Index — 04</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
                <div className="lg:col-span-6">
                    <span className="block text-xs font-mono text-[#E27D60] uppercase tracking-widest mb-3">Reach &amp; Dialogue</span>
                    <h1 className="text-6xl sm:text-8xl font-serif font-normal tracking-tight text-[#1A1A1A] leading-[0.95]">
                        Initiate <br />
                        <span className="italic font-light ml-4 sm:ml-12 text-[#7A5C43]">Contact.</span>
                    </h1>
                </div>

                <div className="lg:col-span-6 flex flex-col justify-between pt-2">
                    <div className="border-l-2 border-[#1A1A1A] pl-6 mb-6">
                        <span className="block font-mono text-xs text-[#999] uppercase tracking-widest mb-1">Direct Transmission</span>
                        <p className="text-xl sm:text-2xl font-serif text-[#333] leading-relaxed">
                            Email me directly at{" "}
                            <a
                                href="mailto:srivas.p117@gmail.com"
                                className="text-[#E27D60] underline underline-offset-4 decoration-[#E27D60]/40 hover:decoration-[#E27D60] transition-colors"
                            >
                                srivas.p117@gmail.com
                            </a>
                        </p>
                    </div>
                    <p className="text-sm sm:text-base text-[#666] leading-relaxed max-w-xl">
                        Whether discussing system architecture, engineering contracts, or speculative work, alternate channels remain open via the correspondence terminal below.
                    </p>
                </div>
            </div>

            {/* Form Container */}
            <div className="border-t border-b border-[#1A1A1A] relative">
                <div className="absolute bottom-full left-0 w-full mb-4 flex justify-end">
                    <div ref={toastRef}
                        className="flex items-center gap-3 border border-[#1A1A1A] bg-[#F5F2EB] px-4 py-2 
                    font-mono text-xs uppercase tracking-widest text-[#1A1A1A] opacity-0"> {/*shadow-[4px_4px_0px_0px_#1A1A1A]*/}
                        <span className="h-1.5 w-1.5 bg-[#E27D60]" />
                        <span>{toastMssg}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12">

                    {/* Meta Panel */}
                    <div className="lg:col-span-4 p-8 sm:p-10 border-b lg:border-b-0 lg:border-r border-[#1A1A1A] flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-baseline mb-8">
                                <span className="font-mono text-xs text-[#E27D60] tracking-widest">DISP // 01</span>
                                <span className="text-xs font-mono text-[#999] uppercase">Status: Ready</span>
                            </div>
                            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-3">Leave a message</h2>
                            <p className="text-xs text-[#666] leading-relaxed mb-6">
                                All inputs are validated. Enter your contact credentials alongside project specifications.
                            </p>
                        </div>

                        <div className="border-t border-[#1A1A1A]/10 pt-6 font-mono text-xs text-[#333] space-y-2">
                            <div className="flex justify-between py-1">
                                <span>Protocol</span>
                                <span className="text-[#999]">POST /inquiry</span>
                            </div>
                            <div className="flex justify-between py-1">
                                <span>Response Time</span>
                                <span className="text-[#999]">&lt; 24 Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Form Input Area */}
                    <form
                        // onSubmit={(e) => e.preventDefault()}
                        className="lg:col-span-8 p-8 sm:p-12 space-y-10"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Name Field */}
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="name"
                                    className="font-mono text-xs uppercase tracking-widest text-[#7A5C43] flex justify-between"
                                >
                                    <span>01 // Name</span>
                                    <span className="text-[#E27D60] text-[10px]">*required</span>
                                </label>
                                <input
                                    ref={nameRef}
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Your full name"
                                    className="bg-transparent border-b border-[#1A1A1A]/20 pb-2 text-base text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#E27D60] transition-colors rounded-none"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col space-y-2">
                                <label
                                    htmlFor="email"
                                    className="font-mono text-xs uppercase tracking-widest text-[#7A5C43] flex justify-between"
                                >
                                    <span>02 // Email</span>
                                    <span className="text-[#E27D60] text-[10px]">*required</span>
                                </label>
                                <input
                                    ref={emailRef}
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    placeholder="name@domain.com"
                                    className="bg-transparent border-b border-[#1A1A1A]/20 pb-2 text-base text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#E27D60] transition-colors rounded-none"
                                />
                            </div>
                        </div>

                        {/* Message Field */}
                        <div className="flex flex-col space-y-2">
                            <label
                                htmlFor="message"
                                className="font-mono text-xs uppercase tracking-widest text-[#7A5C43] flex justify-between"
                            >
                                <span>03 // Leave a message</span>
                                <span className="text-[#E27D60] text-[10px]">*required</span>
                            </label>
                            <textarea
                                ref={mssgRef}
                                id="message"
                                name="message"
                                required
                                rows={4}
                                placeholder="State your objectives, scope, or initial briefing..."
                                className="bg-transparent border-b border-[#1A1A1A]/20 pb-2 text-base text-[#1A1A1A] placeholder-[#999] focus:outline-none focus:border-[#E27D60] transition-colors rounded-none resize-none leading-relaxed"
                            ></textarea>
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 flex justify-end">
                            <button onClick={() => transmitt()}
                                type="submit"
                                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-[#1A1A1A] text-[#F5F2EB] font-mono text-xs uppercase tracking-widest hover:bg-[#E27D60] transition-colors duration-300 cursor-pointer"
                            >
                                <span>Transmit Inquiry</span>
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                            </button>
                        </div>
                    </form>

                </div>
            </div>

        </div>
    </section>)
}

export default ContactMeSec