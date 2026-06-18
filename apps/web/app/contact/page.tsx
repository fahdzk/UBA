// apps/web — Contact page
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import ContactForm from "./contact-form";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#032B66] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto">
            Have a question or need support? We're here to help. Reach out to the UBA team
            and we'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#032B66] mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#032B66] mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#032B66]/10">
                    <Mail className="h-6 w-6 text-[#032B66]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">support@uba.org</p>
                    <p className="text-gray-600">legal@uba.org</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#032B66]/10">
                    <Phone className="h-6 w-6 text-[#032B66]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">1-800-UBA-HELP</p>
                    <p className="text-gray-600">(1-800-822-4357)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#032B66]/10">
                    <MapPin className="h-6 w-6 text-[#032B66]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Address</h3>
                    <p className="text-gray-600">1200 K Street NW, Suite 800</p>
                    <p className="text-gray-600">Washington, DC 20005</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#032B66]/10">
                    <Clock className="h-6 w-6 text-[#032B66]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Hours</h3>
                    <p className="text-gray-600">Monday – Friday: 9:00 AM – 6:00 PM EST</p>
                    <p className="text-gray-600">Saturday: 10:00 AM – 2:00 PM EST</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-500">Map placeholder</p>
                <p className="text-xs text-gray-400">1200 K Street NW, Washington DC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="bg-[#F21B23] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold text-white">Need Urgent Legal Assistance?</h3>
          <p className="mt-2 text-red-100">
            If you are facing immediate workplace danger or exploitation, call our emergency hotline at
            1-800-UBA-911 or file an urgent complaint through your dashboard.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
