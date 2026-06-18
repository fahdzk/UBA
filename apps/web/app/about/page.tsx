// apps/web — About page
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import Image from "next/image";

const teamMembers = [
  {
    name: "Marcus Chen",
    title: "Executive Director",
    bio: "Marcus leads UBA with over 15 years of experience in labor advocacy and union organizing. He has dedicated his career to protecting workers' rights and building equitable partnerships between brands and ambassadors.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Sarah Williams",
    title: "Director of Member Services",
    bio: "Sarah oversees member onboarding, benefits administration, and support operations. She ensures every UBA member receives the resources, guidance, and personalized attention they need to succeed.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "David Okonkwo",
    title: "Director of Legal Affairs",
    bio: "David manages UBA's legal network and complaint resolution system. With a background in employment law, he connects members with attorneys and ensures every complaint is handled with the seriousness it deserves.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Elena Rodriguez",
    title: "Director of Agency Relations",
    bio: "Elena vets and verifies agency partners, negotiates service agreements, and maintains UBA's standards for ethical agency conduct. She builds lasting partnerships that benefit both members and brands.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "James Nakamura",
    title: "Director of Operations",
    bio: "James keeps UBA running smoothly — managing day-to-day operations, technology infrastructure, and cross-team coordination. His focus is on efficiency, reliability, and scalable systems.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Amara Thompson",
    title: "Director of Communications",
    bio: "Amara leads UBA's outreach, content strategy, and community engagement. She amplifies member stories, manages public relations, and ensures the ambassador voice is heard at every level.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#032B66]">About UBA</h1>
        <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg">
            The <strong>Union of Brand Ambassadors (UBA)</strong> is the premier platform dedicated to
            protecting and empowering brand ambassadors across the United States. We believe that the
            people who represent brands deserve protection, fair treatment, and a voice.
          </p>
          <h2 className="text-2xl font-bold text-[#032B66] pt-4">Our Mission</h2>
          <p>
            To provide brand ambassadors with the tools, resources, and legal support they need to
            thrive in their careers. We fight against unfair treatment, wage theft, and unsafe working
            conditions.
          </p>
          <h2 className="text-2xl font-bold text-[#032B66] pt-4">What We Do</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Complaint System:</strong> File and track complaints against agencies with full transparency.</li>
            <li><strong>Legal Network:</strong> Connect with employment attorneys who specialize in worker rights.</li>
            <li><strong>Job Board:</strong> Access exclusive opportunities from verified, trusted agencies.</li>
            <li><strong>Agency Verification:</strong> We vet agencies to ensure they meet our quality standards.</li>
            <li><strong>Community:</strong> Join a network of ambassadors who support and uplift each other.</li>
          </ul>
          <h2 className="text-2xl font-bold text-[#032B66] pt-4">Our Values</h2>
          <p>
            <strong>Transparency</strong> — Every complaint, every review, every action is visible and tracked.
            <br />
            <strong>Solidarity</strong> — We stand together because we are stronger as a union.
            <br />
            <strong>Justice</strong> — Every worker deserves fair treatment and legal protection.
            <br />
            <strong>Excellence</strong> — We hold ourselves and our partner agencies to the highest standards.
          </p>
        </div>

        {/* Our Team Section */}
        <section id="our-team" className="mt-20">
          <h2 className="text-3xl font-bold text-[#032B66]">Our Team</h2>
          <p className="mt-4 text-lg text-gray-600 leading-relaxed">
            UBA is led by a dedicated team of professionals committed to protecting brand ambassadors and
            building a fair, transparent ecosystem for everyone who represents brands.
          </p>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full ring-4 ring-[#032B66]/10 group-hover:ring-[#032B66]/30 transition-all">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-gray-900 text-center">{member.name}</h3>
                <p className="text-sm font-semibold text-[#032B66] text-center">{member.title}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
