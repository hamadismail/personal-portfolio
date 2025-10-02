import React from "react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  const skills = [
    {
      category: "Frontend Development",
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "HTML/CSS",
        "JavaScript",
      ],
    },
    {
      category: "Backend Development",
      technologies: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "MongoDB",
        "REST APIs",
        "Prisma",
      ],
    },
    {
      category: "Tools & Others",
      technologies: ["Git", "Docker", "AWS", "Vercel", "Figma", "Jest"],
    },
  ];

  const experience = [
    {
      period: "2025 - Present",
      role: "Full Stack Developer - Remote",
      company: "Xpeed Holiday Sdn. Bhd.",
      description: "System Automation Design and Development",
    },
    {
      period: "2023 - 2024",
      role: "Software Quality Assurance - Intern",
      company: "Bangladesh Computer Council - BCC",
      description:
        "Identify, evaluate and record questionable behavior, defects, inconsistencies and errors with application functionality, online screens, output and content.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      {/* Hero Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                👋 Nice to meet you
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Me
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                I&#39;m a passionate{" "}
                <span className="font-semibold text-gray-900">
                  Full Stack Developer
                </span>{" "}
                with a love for creating digital experiences that are both
                beautiful and functional. I believe in writing clean, efficient
                code and solving complex problems with elegant solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View My Work
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  Get In Touch
                </Link>
              </div>
            </div>

            {/* Profile Image/Graphic */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Main profile container */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl opacity-10 animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-2xl flex items-center justify-center">
                  {/* <div className="text-8xl">👨‍💻</div> */}
                  <Image
                    src="/hamad.png"
                    alt="Hamad Ismail"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-100 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                  <span className="text-2xl">💡</span>
                </div>
                <div
                  className="absolute -bottom-4 -right-4 w-14 h-14 bg-green-100 rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "1s" }}
                >
                  <span className="text-xl">🚀</span>
                </div>
                <div
                  className="absolute top-1/2 -left-6 w-12 h-12 bg-red-100 rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "2s" }}
                >
                  <span className="text-lg">❤️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
              My Journey
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                My journey in web development started with a curiosity about how
                websites work. What began as a hobby quickly turned into a
                passion as I discovered the endless possibilities of creating
                digital experiences that can impact people&#39;s lives.
              </p>
              <p>
                Over the years, I&#39;ve had the opportunity to work on various
                projects ranging from small business websites to complex web
                applications. Each project has taught me valuable lessons about
                user experience, performance optimization, and the importance of
                writing maintainable code.
              </p>
              <p>
                I&#39;m constantly learning and staying up-to-date with the
                latest technologies and industry trends. I believe that the best
                developers are those who never stop learning and are always
                willing to adapt to new challenges.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                When I&#39;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                my knowledge through blog posts and tutorials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to
            life
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {skills.map((skillGroup) => (
              <div
                key={skillGroup.category}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {skillGroup.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:border-blue-300 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            My journey through the tech industry and the roles that shaped my
            career
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="md:w-1/4">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold text-center md:text-left">
                      {job.period}
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.role}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {job.company}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12">
            My Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "🎯",
                title: "Quality First",
                description:
                  "I believe in delivering high-quality code that is maintainable, scalable, and follows best practices.",
              },
              {
                icon: "💡",
                title: "Innovation",
                description:
                  "Always exploring new technologies and approaches to solve problems in creative ways.",
              },
              {
                icon: "🤝",
                title: "Collaboration",
                description:
                  "Great products are built through teamwork, communication, and shared understanding.",
              },
              {
                icon: "⚡",
                title: "Performance",
                description:
                  "Optimizing for speed and efficiency to create seamless user experiences.",
              },
              {
                icon: "🔍",
                title: "Attention to Detail",
                description:
                  "Paying close attention to the small things that make a big difference in the final product.",
              },
              {
                icon: "🌱",
                title: "Continuous Learning",
                description:
                  "Committed to constantly improving my skills and staying current with industry trends.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Let&#39;s Build Something Amazing Together
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            I&#39;m always excited to take on new challenges and collaborate on
            interesting projects. Whether you have a specific project in mind or
            just want to connect, I&#39;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start a Conversation
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View My Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
