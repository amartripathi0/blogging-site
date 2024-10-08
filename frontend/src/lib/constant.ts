import { Twitter, Linkedin, Globe, Github } from "lucide-react";
import { SocialHandleProps } from "./types";
import { BlogType } from "@amartripathi/blog-types";

export const socialHandles: SocialHandleProps[] = [
  {
    name: "My Portfolio",
    icon: Globe,
    link: "https://amartripathi.vercel.app/",
  },
  {
    name: "Github",
    icon: Github,
    link: "https://github.com/amartripathi0",
  },
  {
    name: "Twitter",
    icon: Twitter,
    link: "https://twitter.com/amartripathi_",
  },
  {
    name: "Linkedin",
    icon: Linkedin,
    link: "https://github.com/amartripathi0",
  },
];

export const homepageBlogPosts: BlogType[] = [
  {
    id: "1",
    title: "The Future of Web Development",
    content:
      "In this article, we explore the emerging trends in web development that are shaping the industry today and into the future. As technologies evolve, so do the methodologies developers use. The rise of frameworks such as React, Angular, and Vue has made front-end development more dynamic and efficient, while the JAMstack architecture promotes faster, more secure web applications. Moreover, the integration of AI and machine learning into web apps is becoming commonplace, enabling developers to create more personalized user experiences. We also examine the importance of Progressive Web Apps (PWAs) in enhancing mobile accessibility and performance. These innovations not only improve user engagement but also streamline development processes. By staying ahead of these trends, developers can ensure they are well-equipped to meet the demands of the digital landscape. In conclusion, embracing these changes is essential for anyone looking to succeed in web development, and we invite you to explore these topics in depth to better understand the future.",
    published: true,
    authorId: "1",
    category: "Web Development",
    date: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "Mastering React Hooks",
    content:
      "React Hooks have revolutionized how we manage state and side effects in functional components, moving away from class-based components and enabling a more concise and modular approach to React programming. In this comprehensive guide, we dive deep into the most commonly used hooks: useState and useEffect. We illustrate how to effectively manage local component state and perform side effects such as data fetching and subscriptions. The introduction of custom hooks further allows developers to extract and reuse logic, promoting cleaner code and enhancing maintainability. Throughout the article, we provide practical examples and code snippets to illustrate each concept, helping you master the art of hooks. Additionally, we address common pitfalls and best practices for using hooks in complex applications, ensuring you can harness their full potential. By the end of this guide, you will have a solid understanding of React Hooks and how they can significantly improve your React applications.",
    published: true,
    authorId: "1",
    category: "React",
    date: "2024-02-20T12:00:00Z",
  },
  {
    id: "3",
    title: "Design Systems: A Comprehensive Guide",
    content:
      "Design systems are becoming increasingly essential in the world of product design and development. They provide a single source of truth for design assets, guidelines, and patterns, ensuring consistency across products and platforms. In this comprehensive guide, we outline the key components of a successful design system, including typography, color palettes, and component libraries. We delve into the importance of documentation, illustrating how effective documentation can facilitate collaboration between design and development teams. Additionally, we discuss the role of design tokens in creating scalable and maintainable design systems. With case studies from leading tech companies, we illustrate how well-implemented design systems can lead to improved efficiency and user experience. Whether you're starting from scratch or looking to enhance an existing system, this guide offers valuable insights and practical tips for creating and maintaining a robust design system that meets the needs of your organization.",
    published: true,
    authorId: "1",
    category: "Design",
    date: "2024-03-10T14:00:00Z",
  },
  {
    id: "4",
    title: "The Art of Productive Coding",
    content:
      "Productivity is a crucial aspect of software development that can significantly affect the quality and speed of deliverables. In this article, we explore various techniques and tools designed to enhance coding productivity. From time management strategies like the Pomodoro Technique to code organization practices such as modular programming, we provide actionable insights for developers at all levels. Effective debugging is another critical skill we discuss, along with tips for leveraging integrated development environments (IDEs) that streamline coding processes. Additionally, we touch on the importance of continuous learning and community engagement in keeping skills sharp and relevant. By implementing these strategies, you can improve your workflow, write better code, and ultimately become a more productive developer. This article serves as a roadmap for anyone looking to boost their coding efficiency and achieve their development goals more effectively.",
    published: true,
    authorId: "1",
    category: "Productivity",
    date: "2024-04-05T09:00:00Z",
  },
  // {
  //   id: "5",
  //   title: "Accessibility in Modern Web Apps",
  //   content:
  //     "As the digital landscape continues to evolve, ensuring that web applications are accessible to all users has never been more important. In this article, we delve into the best practices for achieving accessibility in modern web apps. We start with the fundamentals of semantic HTML and how it lays the groundwork for accessibility. Then, we explore ARIA (Accessible Rich Internet Applications) roles and properties, detailing how they enhance user experience for individuals with disabilities. We also discuss the significance of keyboard navigation, color contrast, and text alternatives for images. Furthermore, we provide tips on testing your applications with screen readers and other assistive technologies to ensure compliance with accessibility standards. By prioritizing accessibility, developers not only widen their audience but also contribute to a more inclusive web. This guide is essential for anyone looking to build web applications that cater to all users, regardless of their abilities.",
  //   published: true,
  //   authorId: "1",
  //   category: "Accessibility",
  //   date: "2024-05-15T11:30:00Z",
  // },
  // {
  //   id: "6",
  //   title: "Serverless Architecture Explained",
  //   content:
  //     "Serverless architecture is a game-changer in the world of cloud computing, allowing developers to focus on writing code without the burden of managing servers. In this article, we explain the fundamentals of serverless computing, its benefits, and its challenges. We cover how platforms like AWS Lambda, Azure Functions, and Google Cloud Functions enable developers to build applications that automatically scale and only charge for the compute time consumed. The article also highlights the event-driven nature of serverless applications, illustrating how they respond to events from various sources, such as HTTP requests, database changes, and file uploads. However, we also discuss the potential drawbacks, including vendor lock-in and cold start latency, offering strategies to mitigate these challenges. By the end of this article, you will have a comprehensive understanding of serverless architecture and how it can transform your development workflow, enabling you to build more scalable and cost-effective applications.",
  //   published: true,
  //   authorId: "1",
  //   category: "Cloud Computing",
  //   date: "2024-06-25T16:45:00Z",
  // },
];
