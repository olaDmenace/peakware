export const academy = {
  name: "Peakware Academy",
  intro: [
    "Peakware Academy is a UK-based workforce development arm committed to developing future-ready talent through high-quality education, industry-recognised certifications, and practical skills development. We empower individuals, professionals, businesses, and public sector organisations with the knowledge and competencies needed to thrive in an increasingly digital, technology-driven, and globally competitive economy.",
    "Our mission is to bridge the gap between education and employment by delivering employer-led training programmes that align with the evolving needs of industry. We equip learners with technical expertise, professional competencies, leadership capabilities, and entrepreneurial skills that enhance employability, improve productivity, and support lifelong career development.",
    "Working closely with employers, industry experts, professional bodies, and technology partners, Peakware designs and delivers flexible learning solutions that respond to current and emerging workforce demands across the United Kingdom and international markets.",
  ],
  delivery:
    "Our delivery model combines instructor-led training, virtual learning, blended learning, corporate workshops, coaching, and hands-on practical projects — so learners develop both theoretical knowledge and real-world capability.",
};

export const vision =
  "To become one of the UK's leading workforce development institutions, recognised for transforming lives and organisations through innovative learning, professional excellence, and industry-aligned skills development.";

export const mission =
  "To bridge the gap between education and employment by equipping individuals, professionals, and organisations with future-focused skills, globally recognised certifications, and practical capabilities demanded by employers and emerging industries.";

export const coreValues = [
  {
    name: "Excellence",
    icon: "lni-certificate-badge-1",
    body: "Delivering training that meets the highest professional and educational standards.",
  },
  {
    name: "Innovation",
    icon: "lni-bulb-2",
    body: "Embracing emerging technologies and modern learning methodologies.",
  },
  {
    name: "Integrity",
    icon: "lni-shield-2-check",
    body: "Building trust through transparency, professionalism, and accountability.",
  },
  {
    name: "Inclusion",
    icon: "lni-hand-taking-user",
    body: "Creating accessible learning opportunities for diverse communities and learners.",
  },
  {
    name: "Impact",
    icon: "lni-trend-up-1",
    body: "Driving measurable improvements in careers, organisations, and economic growth.",
  },
  {
    name: "Lifelong Learning",
    icon: "lni-graduation-cap-1",
    body: "Promoting continuous professional development in a rapidly evolving world.",
  },
];

export type CourseCategory = {
  slug: string;
  name: string;
  icon: string;
  blurb: string;
  courses: string[];
};

export const courseCategories: CourseCategory[] = [
  {
    slug: "project-management",
    name: "Project Management",
    icon: "lni-layers-1",
    blurb:
      "Globally recognised delivery frameworks and the certifications employers ask for by name.",
    courses: [
      "PRINCE2® Training",
      "Agile Training",
      "Scrum Certification",
      "PMP® Training",
      "APM Training",
      "Change Management Certification",
      "MSP® Training",
      "P3O® Training",
      "MoR® — Management of Risk",
      "Project Management Tools",
    ],
  },
  {
    slug: "it-security-data-protection",
    name: "IT Security & Data Protection",
    icon: "lni-shield-2",
    blurb:
      "From GDPR fundamentals to advanced security certifications and ISO compliance.",
    courses: [
      "GDPR Training",
      "CISSP Courses",
      "CISA Training",
      "CISM Training",
      "CCSP Training",
      "CRISC Training",
      "Cyber Resilience Courses",
      "ISO 27001 Training",
      "ISO 28000 Training",
      "ISO 37301 Training",
      "Compliance Training",
    ],
  },
  {
    slug: "cloud-computing",
    name: "Cloud Computing",
    icon: "lni-cloud-2",
    blurb:
      "AWS, Google Cloud and the infrastructure tooling that runs on top of them.",
    courses: [
      "AWS Cloud Practitioner Training",
      "AWS AI Practitioner Training",
      "AWS Associate Solutions Architect Training",
      "AWS Professional Solutions Architect Training",
      "AWS Professional DevOps Engineer Training",
      "AWS Associate SysOps Administrator Training",
      "Google Cloud Platform Fundamentals",
      "Google Cloud Digital Leader Training",
      "Architecting Infrastructure with Google Cloud Platform",
      "Introduction to Google Cloud Security",
      "Big Data & Machine Learning with Google Cloud Platform",
      "Google BigQuery Training",
      "Certified AI for Cloud Professionals Training",
      "Cloud Computing Training",
      "Terraform Training",
      "Microservices Architecture Training",
      "Linux OpenStack Administration Training",
    ],
  },
  {
    slug: "data-analytics-ai",
    name: "Data Analytics & Artificial Intelligence",
    icon: "lni-pie-chart-2",
    blurb:
      "Three AI tracks — for users, builders and leaders — plus the full data science and analytics ladder.",
    courses: [
      "AI Productivity Foundation & Practitioner (The Users)",
      "AI Agents Foundation & Practitioner (The Builders)",
      "AI Strategy & Governance Foundation & Practitioner (The Leaders)",
      "AI & ML with Excel Training",
      "AI with Microsoft Office Tools Training",
      "AI with MS Project Training",
      "Advanced Data Science Certification",
      "Python Data Science Course",
      "Predictive Analytics Course",
      "Pandas for Data Analysis Training",
      "Data Mining Training",
      "Data Science with R Training",
      "Advanced Data Analytics Course",
      "Certified AI for Data Analysts Training",
      "Data Analytics with R",
      "Data Science Analytics",
      "Data Analysis Training using MS Excel",
      "Data Analysis & Visualisation with Python",
    ],
  },
  {
    slug: "business-analysis",
    name: "Business Analysis",
    icon: "lni-bar-chart-dollar",
    blurb:
      "Business analysis and software testing pathways, including agile delivery.",
    courses: [
      "IIBA® Business Analysis Training",
      "Agile Business Analysis Training",
      "Business Analyst Course",
      "Software Testing Training",
      "Agile Software Testing Training",
    ],
  },
  {
    slug: "other-technology",
    name: "Other Technology",
    icon: "lni-monitor-code",
    blurb:
      "Vendor and networking certifications that underpin everyday IT operations.",
    courses: [
      "CCNA Training",
      "CompTIA Certification Training",
      "SAP Training",
      "Cisco Training",
      "Oracle Training",
      "Linux Certification",
      "Citrix Training",
      "IBM Training",
    ],
  },
  {
    slug: "advanced-technologies",
    name: "Advanced Technologies",
    icon: "lni-gears-3",
    blurb:
      "Emerging fields for teams looking past the horizon.",
    courses: ["Blockchain Courses", "Robotic Process Automation (RPA) Training"],
  },
];

export function totalCourseCount(): number {
  return courseCategories.reduce((n, c) => n + c.courses.length, 0);
}
