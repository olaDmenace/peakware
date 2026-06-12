export type Service = {
  slug: string;
  number: string; // "01".."08" for mono eyebrows
  name: string;
  navName: string; // shorter label for nav/footer
  tagline: string; // the hook line
  narrative: string[]; // body paragraphs
  deliverables: string[];
};

export const services: Service[] = [
  {
    slug: "cloud-data-management",
    number: "01",
    name: "Cloud & Data Management",
    navName: "Cloud & Data",
    tagline:
      "Your cloud spend and your data are usually your two largest, least-understood assets. We bring both under control.",
    narrative: [
      "We architect, migrate and optimise cloud environments across AWS, Azure and Google Cloud, then put the data layer on top of it: pipelines, warehouses, governance and the controls that keep it clean and compliant. The result is infrastructure you can reason about and data you can trust.",
    ],
    deliverables: [
      "Cloud migration and modernisation (lift-and-shift through to full re-architecture)",
      "Multi-cloud and hybrid architecture design",
      "Cost optimisation and FinOps — stop paying for capacity you don't use",
      "Data platforms, pipelines and warehousing",
      "Data governance, quality and compliance (UK GDPR-aligned)",
    ],
  },
  {
    slug: "infrastructure-virtualization",
    number: "02",
    name: "Infrastructure & Virtualization",
    navName: "Infrastructure",
    tagline:
      "The unglamorous layer that everything else depends on. When it's right, nobody notices. When it's wrong, everyone does.",
    narrative: [
      "We design and run resilient infrastructure — virtualised, containerised or bare metal — with the automation and observability to keep it stable at scale. Whether you're consolidating servers, standing up Kubernetes, or building a disaster-recovery posture you can actually rely on, we make the foundation solid.",
    ],
    deliverables: [
      "Virtualisation and server consolidation (VMware, Hyper-V, Proxmox)",
      "Containerisation and orchestration (Docker, Kubernetes)",
      "Infrastructure-as-Code and automation (Terraform, Ansible)",
      "High availability, backup and disaster recovery",
      "Monitoring, observability and performance tuning",
    ],
  },
  {
    slug: "agentic-ai",
    number: "03",
    name: "Agentic AI",
    navName: "Agentic AI",
    tagline:
      "AI that does the work, not just talks about it. Agentic systems can plan, use tools, call your APIs and complete multi-step tasks — but only when they're built with real guardrails.",
    narrative: [
      "We design and deploy AI agents that automate genuine workflows: research, support, operations, internal tooling. We handle the unglamorous parts that make agents trustworthy — tool integration, permissions, monitoring and human oversight — so you ship something dependable, not a demo that breaks the first time a customer touches it.",
    ],
    deliverables: [
      "Custom AI agents and multi-agent workflows",
      "Tool, API and system integration (including MCP-based architectures)",
      "Workflow and process automation",
      "Retrieval-augmented generation (RAG) over your own knowledge",
      "Guardrails, evaluation and human-in-the-loop controls",
    ],
  },
  {
    slug: "machine-learning",
    number: "04",
    name: "Machine Learning",
    navName: "Machine Learning",
    tagline:
      "Models are easy to build and hard to operate. We focus on the ones that survive contact with production.",
    narrative: [
      "We help you find the problems where ML actually pays off, then build, train and deploy models that hold up under real data and real load. Just as importantly, we put the monitoring in place to catch drift before it costs you — because a model that was accurate six months ago isn't a strategy.",
    ],
    deliverables: [
      "ML opportunity assessment and feasibility",
      "Model development, training and fine-tuning",
      "Predictive analytics and forecasting",
      "MLOps — deployment, monitoring and retraining pipelines",
      "Computer vision and natural language processing",
    ],
  },
  {
    slug: "custom-software-development",
    number: "05",
    name: "Custom Software Development",
    navName: "Software",
    tagline:
      "Off-the-shelf software fits the average company. It rarely fits yours.",
    narrative: [
      "We build web applications, internal platforms and integrations that map to how your business actually runs. Modern stack, clean architecture, and code your own team can read and extend. We sweat the things that determine whether software lasts: maintainability, testing, documentation and a sensible deployment pipeline.",
    ],
    deliverables: [
      "Web and SaaS application development",
      "Internal tools, dashboards and admin platforms",
      "API design and third-party integration",
      "Legacy system modernisation",
      "Maintainable, well-documented, test-covered delivery",
    ],
  },
  {
    slug: "cybersecurity",
    number: "06",
    name: "Cybersecurity",
    navName: "Cybersecurity",
    tagline:
      "Security isn't a product you buy — it's a posture you maintain. We help you build one that matches your actual risk, not someone else's checklist.",
    narrative: [
      "We assess where you're exposed, fix what matters first, and put the controls and monitoring in place to keep you protected as you grow. From access management to incident response planning, we make security something your business runs with, rather than something it works around.",
    ],
    deliverables: [
      "Security audits and vulnerability assessments",
      "Penetration testing and threat modelling",
      "Identity and access management (IAM)",
      "Cloud and infrastructure hardening",
      "Compliance support (ISO 27001, Cyber Essentials, UK GDPR)",
      "Incident response planning and monitoring",
    ],
  },
  {
    slug: "analytics",
    number: "07",
    name: "Analytics",
    navName: "Analytics",
    tagline:
      "Dashboards everywhere, decisions nowhere. The problem is rarely a shortage of data — it's a shortage of clarity.",
    narrative: [
      "We turn your data into reporting that people actually use to make decisions. We connect the sources, build the models, and design the dashboards around the questions your team keeps asking — so the answer is a glance, not a meeting.",
    ],
    deliverables: [
      "Business intelligence and reporting (Power BI, Looker, Tableau)",
      "KPI design and metrics frameworks",
      "Data modelling and self-serve analytics",
      "Real-time and operational dashboards",
      "Advanced and predictive analytics",
    ],
  },
  {
    slug: "training-enablement",
    number: "08",
    name: "Training & Enablement",
    navName: "Training",
    tagline:
      "The best system in the world is worthless if your team can't run it. We make sure they can.",
    narrative: [
      "We don't hand over a solution and disappear. We train your people on the tools, platforms and practices we've put in place — cloud, data, AI, security, development — so the capability stays in-house. Practical, hands-on, and pitched at your team's actual level.",
    ],
    deliverables: [
      "Hands-on workshops and bootcamps",
      "Cloud, data and AI upskilling",
      "Secure development and DevOps practices",
      "Tailored enablement for the systems we deliver",
      "Ongoing advisory and team mentoring",
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
