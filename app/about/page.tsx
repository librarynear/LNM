import Image from "next/image"
import { BookOpen, Users, Award, Globe } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
// import TeamMember from "@/components/team-member"
// import NewsletterSignup from "@/components/newsletter-signup"

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="py-28">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            About <span className="text-yellow-400">LibraryNear.com</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
            Connecting communities with libraries since 2023
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold">Our Story</h2>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div>
                <p className="mb-4 text-gray-700">
                  LibraryNear.com was founded with a simple mission: to connect people with libraries and help libraries
                  showcase their services to the community.
                </p>
                <p className="mb-4 text-gray-700">
                  Our founder, an avid reader and library enthusiast, noticed that many people were unaware of the
                  incredible resources available at their local libraries. At the same time, libraries were struggling
                  to reach new patrons and communicate their evolving services.
                </p>
                <p className="text-gray-700">
                  What started as a small project to list libraries in a single city has grown into a comprehensive
                  platform serving libraries and patrons across the country. Today, LibraryNear.com helps thousands of
                  people discover libraries and connect with these vital community resources.
                </p>
              </div>
              <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/placeholder.svg"
                  alt="Library interior with bookshelves"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="mb-12 text-xl text-gray-700">
              We believe that libraries are essential community resources that provide equal access to information,
              education, and culture for all.
            </p>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <BookOpen className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="mb-2 text-xl font-bold">Promote Library Services</h3>
                  <p className="text-gray-600">
                    Help libraries showcase their services, collections, and programs to reach more patrons.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Users className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="mb-2 text-xl font-bold">Connect Communities</h3>
                  <p className="text-gray-600">
                    Make it easy for people to discover and engage with libraries in their communities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Award className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="mb-2 text-xl font-bold">Advocate for Libraries</h3>
                  <p className="text-gray-600">
                    Champion the value of libraries as essential institutions for education and community building.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <Globe className="mx-auto mb-4 h-12 w-12 text-yellow-500" />
                  <h3 className="mb-2 text-xl font-bold">Expand Access</h3>
                  <p className="text-gray-600">
                    Increase awareness of library resources to ensure everyone can benefit from these public services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Meet Our Team</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* <TeamMember /> components commented out */}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Our <span className="text-yellow-400">Values</span>
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
            <div className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-3 text-xl font-bold">Accessibility</h3>
              <p className="text-gray-800">
                We believe information should be accessible to everyone, regardless of background or ability.
              </p>
            </div>
            <div className="rounded-lg bg-gray-100 p-6">
              <h3 className="mb-3 text-xl font-bold">Community</h3>
              <p className="text-gray-800">
                Libraries are community hubs, and we&apos;re committed to strengthening these vital connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      {/* <NewsletterSignup /> */}
    </main>
  )
}