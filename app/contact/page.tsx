import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Contact <span className="text-yellow-400">LibraryNear.com</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            We are here to help connect you with libraries in your community
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold">Get In Touch</h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="mr-4 h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Our Location</h3>
                  </div>
                  <p className="text-gray-700">
                    House No. 419, Gali No. 3<br />
                    Mandawali, Delhi - 110092<br />
                    India
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Mail className="mr-4 h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Email Address</h3>
                  </div>
                  <p className="text-gray-700">
                    <a href="mailto:librarynear@gmail.com" className="hover:text-yellow-500 transition-colors">
                      librarynear@gmail.com
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Phone className="mr-4 h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Phone Number</h3>
                  </div>
                  <p className="text-gray-700">
                    <a href="tel:+919354610893" className="hover:text-yellow-500 transition-colors">
                      +91 9354610893
                    </a>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Clock className="mr-4 h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-bold">Office Hours</h3>
                  </div>
                  <p className="text-gray-700">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-md border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-md border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  placeholder="How can we help you?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full rounded-md border border-gray-300 p-3 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-200"
                  placeholder="Type your message here..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="flex items-center justify-center rounded-md bg-yellow-500 px-6 py-3 text-white hover:bg-yellow-600 transition-colors"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Find Us</h2>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-lg shadow-lg">
            <div className="h-96 w-full bg-gray-200 relative">
              {/* This would be replaced with an actual Google Maps embed */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <p className="text-center">
                  Google Maps Embed<br />
                  <span className="text-sm">House No. 419, Gali No. 3, Mandawali, Delhi - 110092</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-12 text-3xl font-bold">Frequently Asked Questions</h2>
            
            <div className="space-y-6 text-left">
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-3 text-xl font-bold">How quickly can I expect a response?</h3>
                <p className="text-gray-700">
                  We typically respond to all inquiries within 24-48 business hours. For urgent matters, please contact us by phone.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-3 text-xl font-bold">Can libraries register themselves on your platform?</h3>
                <p className="text-gray-700">
                  Yes! Libraries can register and manage their profiles on LibraryNear.com. Please contact us for more information about getting your library listed.
                </p>
              </div>
              
              <div className="rounded-lg bg-white p-6 shadow">
                <h3 className="mb-3 text-xl font-bold">Do you offer support for library event promotion?</h3>
                <p className="text-gray-700">
                  Absolutely. We offer various options for libraries to promote their events and special programs through our platform. Reach out to learn more about our promotional services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}