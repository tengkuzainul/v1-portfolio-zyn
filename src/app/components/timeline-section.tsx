"use client";

import { TimelineItems } from "./timeline-item";
import { ReactNode } from "react";

// Create a reusable TechBadge component
const TechBadge = ({ children }: { children: ReactNode }) => (
  <span className="px-3 py-1 border border-neutral-600 dark:border-gray-400 uppercase transition duration-200 text-xs md:text-sm rounded-br-md rounded-tl-md font-medium whitespace-nowrap">
    {children}
  </span>
);

// Define the type for a single project
interface Project {
  name: string;
  description: string;
  technologies: string[];
}

// Create a reusable TimelineProject component
const TimelineProject = ({
  title,
  date,
  institution,
  projects,
}: {
  title: string;
  date: string;
  institution: string;
  projects: Project[];
}) => (
  <div>
    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">
      {date}
    </p>
    <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4 z-20">
      {title} &mdash; {institution}
    </h3>
    <div className="space-y-8">
      {projects.map((project, idx) => (
        <div key={idx} className="space-y-4">
          <h4 className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
            ✦ {project.name}
          </h4>
          <div className="px-5 space-y-4">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {project.technologies.map((tech, index) => (
                <TechBadge key={index}>{tech}</TechBadge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const timelineData = [
  {
    title: "Educations",
    content: (
      <div className="flex flex-col gap-12">
        <TimelineProject
          title="Bachelor Computer Science"
          date="Oct 2021 - Sep 2025"
          institution="Muhammadiyah University of Riau"
          projects={[
            {
              name: "StuntGuard App",
              description:
                "Developing an expert system to diagnose and recommend prevention measures for stunting and nutritional status in toddlers using the forward-chaining method with the TALL Stack to improve healthcare outcomes.",
              technologies: [
                "Tailwind CSS",
                "Alpine JS",
                "Laravel",
                "Livewire",
              ],
            },
            {
              name: "Zyn — TALL Starter Kit",
              description:
                "A starter kit for building web applications using the TALL stack (Tailwind CSS, Alpine.js, Laravel, Livewire) to streamline development and enhance productivity.",
              technologies: [
                "Tailwind CSS",
                "Alpine JS",
                "Laravel",
                "Livewire",
              ],
            },
            {
              name: "SIMAG App",
              description:
                "A web-based application for managing student internships, facilitating the tracking of internship placements, progress, and evaluations to enhance administrative efficiency.",
              technologies: ["Laravel", "Bootstrap", "MySQL"],
            },
            {
              name: "Outdoor Rental System",
              description:
                "Developed a web-based rental management system for outdoor equipment, streamlining the booking, inventory, and payment processes to enhance customer experience and operational efficiency.",
              technologies: ["Laravel", "Javascript", "Bootstrap", "MySQL"],
            },
            {
              name: "Event Booking System",
              description:
                "Created a web application for managing event bookings, allowing users to browse, reserve, and pay for event tickets online, improving accessibility and convenience.",
              technologies: ["Laravel", "Bootstrap", "MySQL"],
            },
          ]}
        />
      </div>
    ),
  },
  // Uncomment and update when ready to add more sections
  {
    title: "Experiences",
    content: (
      <div className="flex flex-col gap-12">
        <TimelineProject
          title="Full Stack Web Developer"
          date="Feb 2024 - Jun 2024"
          institution="PT. Nurul Fikri Cipta Inovasi"
          projects={[
            {
              name: "PustakaConnect",
              description:
                "Developed a comprehensive library management system using the Laravel to streamline book lending, returns, and inventory management for educational institutions in Kampus Merdeka KEMENDIKBUD Program.",
              technologies: ["Laravel", "Bootstrap", "MySQL"],
            },
          ]}
        />
        <TimelineProject
          title="Web Development"
          date="Aug 2023 - Des 2023"
          institution="Infinite Learning"
          projects={[
            {
              name: "Riland App",
              description:
                "Developed an information system for tourism villages in Riau Province, Indonesia using React to promote local culture and attractions, enhancing visitor engagement and boosting tourism.",
              technologies: ["ReactJS", "ExpressJS", "MySQL"],
            },
          ]}
        />
      </div>
    ),
  },
];

export default function TimelineSections() {
  return (
    <section className="w-full relative overflow-hidden">
      <TimelineItems data={timelineData} />
    </section>
  );
}
