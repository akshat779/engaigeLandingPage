"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChevronRight, Globe, MessageSquare, Smile } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function WaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent, formLocation: string) => {
    e.preventDefault()

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Google Forms submission
      // Replace FORM_ID with your actual Google Form ID
      const formId = "1FAIpQLSf7YM3nZyfmA1N-ec0KH-fnMDDc84eDUiuCzGVLgL6bAkaiLg"
      const formEntryId = "2104977470" // This is the entry ID for the email field in your Google Form

      const formData = new FormData()
      formData.append(`entry.${formEntryId}`, email)

      const response = await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
        method: "POST",
        body: formData,
        mode: "no-cors", // Google Forms requires no-cors mode
      })

      // Since we're using no-cors, we can't actually check the response status
      // So we'll just assume it worked if no error was thrown

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. We'll notify you when we launch!",
      })

      setEmail("")
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <header className="w-full py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="font-bold flex justify-center items-center text-2xl text-white">
              <Image src={"/logo.png"} alt="engAige Logo" width={80} height={80} />
              <span className="text-blue-400 text-3xl font-bold tracking-tighter sm:text-3xl xl:text-3xl/none">engAige</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-md font-medium text-slate-200 hover:text-blue-400 transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-md font-medium text-slate-200 hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="#waitlist" className="text-md font-medium text-slate-200 hover:text-blue-400 transition-colors">
              Join Waitlist
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section with Waitlist Form */}
        <section id="waitlist" className="w-full py-12 md:py-24 ">
          <div className="container mx-auto px-2 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-400 mb-2">
                    Coming Soon
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                    Transform Your Instagram Engagement with engAige
                  </h1>
                  <p className="max-w-[600px] text-slate-300 md:text-xl">
                  engAige revolutionizes how you connect with your audience on Instagram. Automate responses and boost
                    engagement effortlessly.
                  </p>
                </div>

                <div className="mt-6">
                  <form onSubmit={(e) => handleSubmit(e, "hero")} className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isSubmitting}>
                      {isSubmitting ? "Joining..." : "Join the Waitlist"}
                    </Button>
                  </form>
                  <p className="text-xs text-slate-400 mt-2">Be the first to know when we launch. No spam, ever.</p>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/landingPage.png"
                  width={1200}
                  height={1200}
                  alt="Instagram Engagement Platform"
                  
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 ">
          <div className="container mx-auto px-2 md:px-2 ">
            <div className="flex flex-col items-center justify-center  space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-400">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Powerful Tools for Instagram Success
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl">
                engAige provides everything you need to enhance your Instagram engagement.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <Card className="bg-slate-800/50 border-slate-700 text-white h-full">
                <CardHeader className="pb-2 flex flex-col items-center">
                  <Smile className="h-12 w-12 text-blue-400 mb-2" />
                  <CardTitle className="text-center">Real-time Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-300">
                    Understand how your audience feels with AI-powered sentiment analysis of comments and messages.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700 text-white h-full">
                <CardHeader className="pb-2 flex flex-col items-center">
                  <Globe className="h-12 w-12 text-blue-400 mb-2" />
                  <CardTitle className="text-center">Language Translation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-300">
                    Connect with a global audience by automatically translating comments and messages in real-time.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700 text-white h-full">
                <CardHeader className="pb-2 flex flex-col items-center">
                  <MessageSquare className="h-12 w-12 text-blue-400 mb-2" />
                  <CardTitle className="text-center">Real-time Chat with Customers</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-slate-300">
                    Engage with your followers instantly through our streamlined chat interface.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="about" className="w-full py-12 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Simplifying Instagram Engagement
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl">
                  Our platform makes it easy to connect with your audience and grow your Instagram presence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Connect Your Account</h3>
                <p className="text-slate-300">
                  Easily link your Instagram account to our platform with just a few clicks.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Customize Your Settings</h3>
                <p className="text-slate-300">
                  Set up your preferences for automated responses and engagement strategies.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Watch Your Engagement Grow</h3>
                <p className="text-slate-300">
                  Sit back and watch as your engagement metrics improve and your audience grows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section with Waitlist Form */}
        <section className="w-full py-12 md:py-24 ">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">
                  Be the First to Experience engAige
                </h2>
                <p className="max-w-[600px] text-slate-300 md:text-xl">
                  Join our waitlist today and get early access when we launch.
                </p>
              </div>

              <div className="w-full max-w-md mt-6">
                <form onSubmit={(e) => handleSubmit(e, "cta")} className="flex flex-col sm:flex-row gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white" disabled={isSubmitting}>
                    {isSubmitting ? "Joining..." : "Join the Waitlist"}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              {/* <div className="font-bold text-2xl text-white">
                <span className="text-blue-400">engAige</span>
              </div> */}
              <div className="font-bold flex justify-center items-center text-2xl text-white">
              <Image src={"/logo.png"} alt="engAige Logo" width={60} height={60} />
              <span className=" text-md text-blue-400">engAige</span>
            </div>
              <p className="text-sm text-slate-400">
                Revolutionizing Instagram engagement through AI-powered solutions.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Product</h3>
              <nav className="flex flex-col space-y-2 text-sm text-slate-400">
                <Link href="#features" className="hover:text-blue-400">
                  Features
                </Link>
                <Link href="#about" className="hover:text-blue-400">
                  How It Works
                </Link>
                <Link href="#waitlist" className="hover:text-blue-400">
                  Join Waitlist
                </Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Company</h3>
              <nav className="flex flex-col space-y-2 text-sm text-slate-400">
                <Link href="#" className="hover:text-blue-400">
                  About
                </Link>
                <Link href="#" className="hover:text-blue-400">
                  Blog
                </Link>
                <p className="hover:text-blue-400">
                  Contact: support@engaige.in
                </p>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-white">Legal</h3>
              <nav className="flex flex-col space-y-2 text-sm text-slate-400">
                <Link href="#" className="hover:text-blue-400">
                  Terms
                </Link>
                <Link href="/privacy-policy" className="hover:text-blue-400">
                  Privacy
                </Link>
                <p className="hover:text-blue-400">
                  Cookies
                </p>
              </nav>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-800 pt-8">
            <p className="text-xs text-slate-400 text-center">
              &copy; {new Date().getFullYear()} engAige. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}



// https://docs.google.com/forms/d/e/1FAIpQLSf7YM3nZyfmA1N-ec0KH-fnMDDc84eDUiuCzGVLgL6bAkaiLg/viewform?usp=sharing

