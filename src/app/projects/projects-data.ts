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
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with Next.js and Tailwind CSS with interactive animations and smooth transitions.",
    imageUrl:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/tengkuzainul/v1-portfolio-zyn",
    liveUrl: "https://tengkuzainul.me",
    id: "DEV.001",
  },
  {
    title: "E-Commerce Dashboard",
    description:
      "An admin dashboard for managing products, orders, and customers for an e-commerce platform with analytics.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3",
    technologies: ["Laravel", "MySQL", "Livewire", "Alpine.js", "Tailwind CSS"],
    githubUrl: "https://github.com/tengkuzainul/e-commerce-dashboard",
    id: "DEV.002",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team collaboration features.",
    imageUrl:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io"],
    githubUrl: "https://github.com/tengkuzainul/task-management-app",
    liveUrl: "https://tasks.example.com",
    id: "DEV.003",
  },
  {
    title: "Weather Forecast App",
    description:
      "A weather forecast application that provides real-time weather data and forecasts for locations worldwide.",
    imageUrl:
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    technologies: ["React", "Weather API", "Chart.js", "Tailwind CSS"],
    githubUrl: "https://github.com/tengkuzainul/weather-forecast",
    liveUrl: "https://weather.example.com",
    id: "DEV.004",
  },
  // Additional projects for the projects page
  {
    title: "Recipe Finder App",
    description:
      "A recipe finder application that allows users to search for recipes by ingredients, cuisine, and dietary restrictions.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    technologies: ["React", "Redux", "Food API", "Tailwind CSS"],
    githubUrl: "https://github.com/tengkuzainul/recipe-finder",
    liveUrl: "https://recipes.example.com",
    id: "DEV.005",
  },
  {
    title: "Virtual Classroom",
    description:
      "An online learning platform with live classes, assignments, and progress tracking for students and teachers.",
    imageUrl:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    technologies: ["React", "Firebase", "WebRTC", "Node.js"],
    githubUrl: "https://github.com/tengkuzainul/virtual-classroom",
    liveUrl: "https://classroom.example.com",
    id: "DEV.006",
  },
];
