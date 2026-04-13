import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.profile.upsert({
    where: { id: "default" },
    create: {
      id: "default",
      name: "Y Pavan Kumar",
      title: "Full-Stack Software Engineer",
      email: "yelepavan1002@gmail.com",
      phone: "+91 70328 79607",
      location: "Hyderabad, India",
      linkedinUrl: "https://linkedin.com/in/y-pavan-kumar-13a067245",
      githubUrl: "https://github.com/YelePavanKumar?tab=repositories",
      summary:
        "Full-stack Software Engineer with 2 years of professional experience delivering production-grade systems for DRDO government clients. Specialises in building scalable web applications and real-time industrial monitoring solutions using Python, Django, React, Next.js, and TypeScript. Track record of eliminating manual processes, achieving 99% accuracy in barcode tracking, and automating 85% of CNC machine data entry. Adept at end-to-end delivery — from database design and REST API development to containerised deployment with Docker.",
    },
    update: {
      name: "Y Pavan Kumar",
      title: "Full-Stack Software Engineer",
      email: "yelepavan1002@gmail.com",
      phone: "+91 70328 79607",
      location: "Hyderabad, India",
      linkedinUrl: "https://linkedin.com/in/y-pavan-kumar-13a067245",
      githubUrl: "https://github.com/YelePavanKumar?tab=repositories",
      summary:
        "Full-stack Software Engineer with 2 years of professional experience delivering production-grade systems for DRDO government clients. Specialises in building scalable web applications and real-time industrial monitoring solutions using Python, Django, React, Next.js, and TypeScript. Track record of eliminating manual processes, achieving 99% accuracy in barcode tracking, and automating 85% of CNC machine data entry. Adept at end-to-end delivery — from database design and REST API development to containerised deployment with Docker.",
    },
  });

  await prisma.experienceItem.deleteMany();
  await prisma.experienceItem.createMany({
    data: [
      {
        role: "Software Engineer",
        company: "Techfluent Solutions",
        location: "Hyderabad, India",
        period: "Mar 2024 – Present",
        sortOrder: 0,
        highlights: [
          "TraceBar Inventory System (Client: LRDE DRDO): Architected and shipped a full-stack supply chain platform managing supplier onboarding, receipt processing, item issues, and repair tracking — eliminating 90% of manual tracking errors.",
          "Implemented EAN-13 barcode generation and scanning for product receipts, achieving 99% scan accuracy and removing all manual data entry from the receiving workflow.",
          "CNC OEE Monitor (Client: MTPF ODF): Designed a real-time Overall Equipment Effectiveness dashboard consuming REST API data from CNC machines, reducing manual reporting effort by 85% and enabling live downtime analytics.",
          "EasyDAQ (Client: KITS Warangal): Built a Python desktop data acquisition application with serial port communication supporting LED control, voltage/resistance measurement, power source control, logic analyser, and 3-channel oscilloscope. Packaged as standalone .exe via PyInstaller.",
          "CRM (Client: DRDL DRDO): Delivered a full-stack Customer Relationship Management system (Next.js, React, TypeScript, MySQL) with session auth, role-based access, enquiry pipeline, proposal/order management, PDF/Excel export, and real-time notifications.",
          "QMS (Client: CABS DRDO): Built a Quality Management System (Next.js, TypeScript, PostgreSQL) with 8 role-based workflows, inspection request lifecycle, multi-stage approvals, inspection checks, and a complete audit trail.",
          "PMS: Developed an enterprise Project Management System featuring SVAR Gantt charts, task dependencies, resource management, and executive reporting.",
        ],
      },
    ],
  });

  await prisma.projectItem.deleteMany();
  await prisma.projectItem.createMany({
    data: [
      {
        title: "TraceBar Inventory System",
        client: "LRDE DRDO",
        description:
          "Full-stack supply chain platform for supplier onboarding, receipts, issues, and repair tracking.",
        highlights: [
          "Eliminated 90% of manual tracking errors",
          "EAN-13 barcode integration with 99% scan accuracy",
        ],
        sortOrder: 0,
      },
      {
        title: "CNC OEE Monitor",
        client: "MTPF ODF",
        description:
          "Real-time Overall Equipment Effectiveness dashboard with live downtime analytics.",
        highlights: [
          "Reduced manual reporting effort by 85%",
          "REST API integration with CNC machines",
        ],
        sortOrder: 1,
      },
      {
        title: "EasyDAQ",
        client: "KITS Warangal",
        description:
          "Python desktop DAQ with serial communication, LED control, measurements, and oscilloscope views.",
        highlights: ["PyInstaller standalone .exe", "Hardware–software integration"],
        sortOrder: 2,
      },
      {
        title: "CRM",
        client: "DRDL DRDO",
        description:
          "Customer Relationship Management with RBAC, pipeline, proposals, exports, and notifications.",
        highlights: ["Next.js + TypeScript + MySQL", "PDF/Excel export"],
        sortOrder: 3,
      },
      {
        title: "QMS",
        client: "CABS DRDO",
        description:
          "Quality Management with 8 role workflows, inspections, approvals, and audit trail.",
        highlights: ["Next.js + PostgreSQL", "Multi-stage approvals"],
        sortOrder: 4,
      },
      {
        title: "PMS",
        client: "Enterprise",
        description:
          "Project management with SVAR Gantt charts, dependencies, resources, and reporting.",
        highlights: ["Gantt & dependencies", "Executive reporting"],
        sortOrder: 5,
      },
    ],
  });

  await prisma.educationItem.deleteMany();
  await prisma.educationItem.createMany({
    data: [
      {
        degree: "Bachelor of Engineering — Information Technology",
        institution: "MVSR Engineering College, Hyderabad",
        period: "2020 – 2023",
        sortOrder: 0,
      },
      {
        degree: "Diploma — Computer Science Engineering",
        institution: "Government Institute of Electronics, Secunderabad",
        period: "2016 – 2020",
        sortOrder: 1,
      },
    ],
  });

  await prisma.skillCategory.deleteMany();
  await prisma.skillCategory.createMany({
    data: [
      {
        name: "Languages",
        skills: ["Python", "JavaScript", "TypeScript", "SQL"],
        sortOrder: 0,
      },
      {
        name: "Frameworks & Libraries",
        skills: ["React", "Next.js", "Django", "Node.js", "Bootstrap", "Tailwind CSS"],
        sortOrder: 1,
      },
      {
        name: "Databases",
        skills: ["PostgreSQL", "MySQL"],
        sortOrder: 2,
      },
      {
        name: "Tools & DevOps",
        skills: ["Git", "Docker", "REST API", "PyInstaller", "NextAuth.js", "Serial Communication"],
        sortOrder: 3,
      },
      {
        name: "Testing & Methodology",
        skills: ["API testing", "Debugging", "Hardware-Software Integration"],
        sortOrder: 4,
      },
      {
        name: "Other",
        skills: [
          "EAN-13 Barcode",
          "DataTables",
          "Gantt Charts",
          "OEE Metrics",
          "Role-Based Access Control",
        ],
        sortOrder: 5,
      },
    ],
  });

  await prisma.achievement.deleteMany();
  await prisma.achievement.createMany({
    data: [
      {
        text: "Reduced inventory tracking errors by 90% through EAN-13 barcode integration for a DRDO defence lab",
        sortOrder: 0,
      },
      {
        text: "Automated CNC machine OEE monitoring, eliminating 85% of manual data entry at a government ordnance factory",
        sortOrder: 1,
      },
      {
        text: "Delivered 7+ production-ready applications across web and desktop platforms for DRDO, KITS, and enterprise clients",
        sortOrder: 2,
      },
      {
        text: "Designed and shipped a multi-role QMS with 8 workflow stages used by CABS DRDO quality inspection teams",
        sortOrder: 3,
      },
    ],
  });

  await prisma.careerNote.deleteMany();
  await prisma.careerNote.createMany({
    data: [
      {
        title: "Self-directed Learning & Skill Development",
        period: "2023 – 2024",
        body: "Dedicated period post-graduation to mastering full-stack technologies — React, Next.js, Django, PostgreSQL, REST APIs, and Docker — before joining professional employment.",
        sortOrder: 0,
      },
    ],
  });

  await prisma.additionalInfo.deleteMany();
  await prisma.additionalInfo.createMany({
    data: [
      { label: "Relocation", value: "Open to relocating anywhere within India", sortOrder: 0 },
      { label: "Work mode", value: "On-site, Hybrid, or Remote", sortOrder: 1 },
      { label: "Notice period", value: "Immediate joiner / 30 days", sortOrder: 2 },
      { label: "Languages", value: "English (Fluent) · Hindi (Fluent) · Telugu (Native)", sortOrder: 3 },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
