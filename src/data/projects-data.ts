// Define a type for project data
export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  id?: string;
}

// Sample project data
export const projects: Project[] = [
  {
    title: "StuntGuard-App",
    description:
      "A web-based expert system designed for the early diagnosis of stunting and the assessment of nutritional status in toddlers. This full-stack application is powered by Laravel and Livewire, featuring a modern and responsive user interface crafted with Tailwind CSS and Alpine.js.",
    imageUrl: "/images/assets/projects/StuntGuard-App.svg",
    technologies: [
      "Laravel",
      "Livewire",
      "TailwindCSS",
      "AlpineJS",
      "MySQL",
      "PHP",
    ],
    githubUrl: "https://github.com/tengkuzainul/stuntguard-app",
    liveUrl: "http://stuntguard.kampungrempak.com",
    id: "DEV.001",
  },
  {
    title: "Zyn-StarterKits",
    description:
      "A comprehensive full-stack TALL stack starter kit, complete with a pre-configured multi-auth system. It is meticulously engineered to provide a robust foundation and significantly accelerate development for complex applications requiring different user roles.",
    imageUrl: "/images/assets/projects/Zyn-StarterKits.svg",
    technologies: [
      "Laravel",
      "Livewire",
      "TailwindCSS",
      "AlpineJS",
      "MySQL",
      "PHP",
    ],
    githubUrl: "https://github.com/tengkuzainul/zyn-starter-kits",
    // liveUrl: "https://starterkits.tengkuzainul.me",
    id: "DEV.002",
  },
  {
    title: "Book Shop",
    description:
      "A comprehensive e-commerce platform specifically designed for the online book retail market. Its robust backend is powered by Laravel, while the clean, user-friendly, and responsive interface was expertly crafted using Bootstrap.",
    imageUrl: "/images/assets/projects/Book-Shop.svg",
    technologies: ["Laravel", "Bootstrap", "MySQL", "Javascript", "PHP"],
    githubUrl: "https://github.com/tengkuzainul/market-book",
    // liveUrl: "https://tengkuzainul.me",
    id: "DEV.003",
  },
  {
    title: "RO-App",
    description:
      "A powerful, Laravel-based, full-stack platform that enables outdoor enthusiasts to seamlessly rent equipment through integrated search, booking, and secure online payment features, greatly streamlining their entire adventure preparation process.",
    imageUrl: "/images/assets/projects/RO-App.svg",
    technologies: ["Laravel", "Bootstrap", "MySQL", "Javascript", "PHP"],
    githubUrl: "https://github.com/tengkuzainul/kerja-praktek",
    // liveUrl: "https://ro-app.tengkuzainul.me",
    id: "DEV.004",
  },
  {
    title: "SIMAG APP",
    description:
      "A comprehensive internship management system, professionally developed using the powerful Laravel framework. This centralized platform streamlines intern activity monitoring and simplifies the digital logbook submission process for both students and supervisors.",
    imageUrl: "/images/assets/projects/Simag-App.svg",
    technologies: ["Laravel", "Bootstrap", "MySQL", "Javascript", "PHP"],
    githubUrl: "https://github.com/tengkuzainul/si-magang",
    // liveUrl: "https://ro-app.tengkuzainul.me",
    id: "DEV.005",
  },
  {
    title: "SIPUSTAKA",
    description:
      "A modern and reliable Library Management System, built with the robust Laravel framework. Designed to automate, streamline, and secure every stage of book borrowing and returning, ensuring efficiency, accuracy, and convenience for libraries of any scale.",
    imageUrl: "/images/assets/projects/Si-Pustaka.svg",
    technologies: ["Laravel", "Bootstrap", "MySQL", "Javascript", "PHP"],
    githubUrl: "https://github.com/tengkuzainul/si-pustaka",
    // liveUrl: "https://ro-app.tengkuzainul.me",
    id: "DEV.006",
  },
];
