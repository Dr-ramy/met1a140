'use client';

export interface DialogueNode {
  message: string;
  options?: string[];
}

export interface FAQEntry {
  question: string;
  answer: string;
  keywords?: string[];
}

export interface NPCData {
  greeting: string;
  faqs: FAQEntry[];
  voice?: 'female' | 'male';
}

export const npcFAQs: Record<string, NPCData> = {
  npc1: {
    greeting: "Hello! I'm your guide to E-Learning Course Design. Let's explore how to create engaging digital learning experiences.",
    faqs: [
      {
        question: "What is e-learning course design?",
        answer: "It is the process of creating educational content delivered digitally, focusing on instructional design principles like the ADDIE model to enhance learning.",
        keywords: ["E-learning design", "What is course design"]
      },
      {
        question: "Why is multimedia important in e-learning?",
        answer: "Multimedia such as images, interactive tools, and videos keep learners engaged, accommodate different learning styles, and improve knowledge retention.",
        keywords: ["Multimedia", "Importance of multimedia"]
      },
      {
        question: "What tools do I need to start?",
        answer: "You will need authoring tools like Articulate Storyline, graphic design tools like Canva, and video creation apps like Powtoon or Animoto.",
        keywords: ["E-learning tools", "Getting started"]
      }
    ],
    voice: 'male'
  },

  wpc2: {
    greeting: "Welcome! I will explain how to use Canva for your visual design needs in e-learning.",
    faqs: [
      {
        question: "What is Canva?",
        answer: "Canva is a user-friendly graphic design platform used to create visual content like presentations, posters, and educational graphics easily.",
        keywords: ["What is Canva", "Canva basics"]
      },
      {
        question: "How can Canva be used in course design?",
        answer: "You can use it to design course banners, custom slides, worksheets, and visually appealing certificates for your students.",
        keywords: ["Canva for education", "Course graphics"]
      },
      {
        question: "Do I need design experience to use Canva?",
        answer: "Not at all! Canva provides thousands of pre-made templates and a simple drag-and-drop interface suitable for beginners.",
        keywords: ["Design experience", "Using Canva"]
      }
    ],
    voice: 'female'
  },

  wpc3: {
    greeting: "Hello, I will guide you on using Articulate Storyline for interactive e-learning development.",
    faqs: [
      {
        question: "What is Articulate Storyline?",
        answer: "Storyline is a powerful authoring tool used to create highly interactive e-learning courses with custom assessments, triggers, and multimedia.",
        keywords: ["Articulate Storyline", "What is Storyline"]
      },
      {
        question: "How does Storyline differ from PowerPoint?",
        answer: "While it looks similar, Storyline allows for complex interactivity using triggers, variables, and states tailored specifically for digital learning.",
        keywords: ["Storyline vs PowerPoint", "Interactivity"]
      },
      {
        question: "What formats can Storyline export to?",
        answer: "It exports to SCORM, xAPI (Tin Can), and HTML5 formats, which are the standard formats required for Learning Management Systems (LMS).",
        keywords: ["Storyline export", "SCORM format"]
      }
    ],
    voice: 'male'
  },

  prof1: {
    greeting: "Welcome! I will guide you through creating animated videos using Powtoon.",
    faqs: [
      {
        question: "What is Powtoon?",
        answer: "Powtoon is a web-based animation software used to create engaging animated presentations and explainer videos.",
        keywords: ["What is Powtoon", "Animation software"]
      },
      {
        question: "How does Powtoon enhance an online course?",
        answer: "It brings concepts to life through digital storytelling, animated characters, and dynamic text, making complex topics much easier to understand.",
        keywords: ["Powtoon benefits", "Course animation"]
      }
    ],
    voice: 'female'
  },

  prof2: {
    greeting: "Hello! I will explain how to create quick educational videos using Animoto.",
    faqs: [
      {
        question: "What is Animoto?",
        answer: "Animoto is a cloud-based video creation service that turns photos, video clips, and music into professional video slideshows.",
        keywords: ["What is Animoto", "Video creation"]
      },
      {
        question: "Why use Animoto for educational courses?",
        answer: "It is incredibly fast for creating course introductions, module summaries, or engaging promotional videos without needing advanced editing skills.",
        keywords: ["Animoto in education", "Quick videos"]
      }
    ],
    voice: 'male'
  },

  prof3: {
    greeting: "Hello! I will guide you on creating infographics and data visualization using Piktochart.",
    faqs: [
      {
        question: "What is Piktochart?",
        answer: "Piktochart is a visual communication app that helps you create professional infographics, reports, and educational charts easily.",
        keywords: ["What is Piktochart", "Infographic tool"]
      },
      {
        question: "When should I use infographics in a course?",
        answer: "Use them to summarize large amounts of data, show historical timelines, compare concepts, or break down complex processes into visual steps.",
        keywords: ["Using infographics", "Data visualization"]
      },
      {
        question: "Can I embed Piktochart in my course?",
        answer: "Yes, you can export your designs as high-quality images or PDF files to include them in your LMS or authoring tools like Storyline.",
        keywords: ["Embed Piktochart", "Export infographics"]
      }
    ],
    voice: 'female'
  },

  prof4: {
    greeting: "Hello! I will guide you on integrating these tools together.",
    faqs: [
      {
        question: "How do I combine all these tools?",
        answer: "You can create graphics in Canva, an intro video in Animoto, an explainer in Powtoon, and embed them all into an interactive Articulate Storyline course.",
        keywords: ["Combining tools", "Tool integration"]
      },
      {
        question: "How do I choose the right tool for a lesson?",
        answer: "Base your choice on your learning objectives. Use Storyline for quizzes and interactivity, Powtoon for engagement, and Piktochart for data.",
        keywords: ["Choosing tools", "Learning objectives"]
      }
    ],
    voice: 'male'
  },

  prof6: {
    greeting: "Hello! I will guide you on managing audio and visual assets for your digital courses.",
    faqs: [
      {
        question: "Where can I find assets for my courses?",
        answer: "Tools like Canva and Powtoon have built-in asset libraries. You can also use stock websites for royalty-free audio, images, and vectors.",
        keywords: ["Course assets", "Finding images"]
      },
      {
        question: "How important is audio in e-learning?",
        answer: "High-quality voiceovers and background music significantly enhance the professional feel, learner engagement, and overall accessibility of your course.",
        keywords: ["Audio in e-learning", "Voiceovers"]
      }
    ],
    voice: 'female'
  },

  prof7: {
    greeting: "Hello! I will guide you on publishing your course and LMS integration.",
    faqs: [
      {
        question: "What is an LMS?",
        answer: "A Learning Management System (LMS) is a software application used to deliver, track, and manage your e-learning courses and students.",
        keywords: ["What is LMS", "Learning Management System"]
      },
      {
        question: "What is SCORM?",
        answer: "SCORM is a set of technical standards. Exporting your course as SCORM ensures it plays correctly on your LMS and tracks student progress and scores.",
        keywords: ["What is SCORM", "Course tracking"]
      },
      {
        question: "Can I sell my e-learning courses?",
        answer: "Yes, once designed, you can export your interactive lessons or worksheets and sell them on platforms like Teachers Pay Teachers (TpT) or your own site.",
        keywords: ["Selling courses", "Course publishing"]
      }
    ],
    voice: 'male'
  }
};