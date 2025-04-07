import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  IconCloud,
  IconPalette,
  IconAlertCircle,
  IconClock,
  IconFunction,
  IconWorld,
  IconDatabase,
  IconEaseInOut,
  IconHeart,
  IconCode,
  IconTerminal2,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Built for developers",
      description:
        "Built for engineers, developers, dreamers, thinkers and doers.",
      icon: <IconTerminal2 />,
      img: '/screenshots/ui.png'
    },
    {
      title: "Ease of use",
      description:
        "It's as easy as using an Apple, and as expensive as buying one.",
      icon: <IconEaseInOut />,
      img: '/screenshots/ui.png'
    },
    {
      title: "100% Uptime guarantee",
      description: "We just cannot be taken down by anyone.",
      icon: <IconCloud />,
      img: '/screenshots/ui.png'
    },
    {
      title: "Beautiful User Interface",
      description: "Experience code analysis in a visually stunning and intuitive interface.",
      icon: <IconPalette />, // Replace with an appropriate icon component
      img: '/screenshots/ui.png' // You might want a specific UI screenshot here
  },
  
  {
      title: "Time Complexity Analysis",
      description: "Instantly understand the time complexity of your code snippets.",
      icon: <IconClock />, // Replace with an appropriate icon component
      img: '/screenshots/code.png'
  },
  {
      title: "Algorithm Complexity Analysis",
      description: "Get detailed time complexity analysis for specific algorithms.",
    //icon: <IconAlgorithm />, // You might need to create or find a suitable icon
      icon: <IconCode />,
      img: '/screenshots/algo.png'
  },
  {
      title: "Function Complexity Analysis",
      description: "Analyze the time complexity of individual functions within your code.",
      icon: <IconFunction />, // You might need to create or find a suitable icon
      img: '/screenshots/function.png'
  },
  {
      title: "Universal Language Support",
      description: "Works seamlessly with virtually any programming language you throw at it.",
      icon: <IconWorld />, // Replace with an appropriate icon component
      img: '/screenshots/ui.png'
  },
  {
      title: "Space Complexity Analysis", // Or "Included" if already implemented
      description: "Understand the memory usage of your code with space complexity analysis.",
      icon: <IconDatabase />, // Replace with an appropriate icon component
      img: '/screenshots/ui.png'
  },
  {
    title: "Efficient Error Handling",
    description: "We gracefully handle errors in your code, providing clear and helpful feedback.",
    icon: <IconAlertCircle />, // Replace with an appropriate icon component
    img: '/screenshots/error.png'
},
    {
      title: "And everything else",
      description: "I just ran out of copy ideas. Accept my sincere apologies",
      icon: <IconHeart />,
      img: '/screenshots/ui.png'
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
  img = '/bigo-2.png', // Default value in case img is not provided
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  img?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:py-10 md:py-10 py-4 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
        "lg:border-r"
      )}
    >
      {/* Gradient effects */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      
      {/* Image container with better styling */}
      <div className="mb-6 lg:px-8 md:px-4 relative z-10">
        <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
          <Image 
            src={img} 
            alt={title}
            width={400}
            height={250}
            className="w-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
      
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
      
      {/* Add horizontal divider for small screens */}
      <div className="mt-6 w-full border-t border-gray-200 dark:border-gray-700 md:hidden"></div>
    </div>
  );
};
