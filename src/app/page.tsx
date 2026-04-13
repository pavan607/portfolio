import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Skills } from "@/components/site/Skills";
import { Experience } from "@/components/site/Experience";
import { Projects } from "@/components/site/Projects";
import { Education } from "@/components/site/Education";
import { Achievements } from "@/components/site/Achievements";
import { AdditionalInfo } from "@/components/site/AdditionalInfo";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const profile = await prisma.profile.findUnique({ where: { id: "default" } });
  const [skillCategories, experience, projects, education, achievements, careerNotes, additional] =
    await Promise.all([
      prisma.skillCategory.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.experienceItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.projectItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.educationItem.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.achievement.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.careerNote.findMany({ orderBy: { sortOrder: "asc" } }),
      prisma.additionalInfo.findMany({ orderBy: { sortOrder: "asc" } }),
    ]);

  if (!profile) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-muted">Database not seeded. Run:</p>
        <pre className="mt-4 rounded-xl bg-slate-100 p-4 text-left text-sm dark:bg-slate-900">
          npm run db:push && npm run db:seed
        </pre>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col">
      <Header />
      <main className="flex-1">
        <Hero
          name={profile.name}
          title={profile.title}
          email={profile.email}
          location={profile.location}
          linkedinUrl={profile.linkedinUrl}
          githubUrl={profile.githubUrl}
        />
        <About summary={profile.summary} />
        <Skills categories={skillCategories} />
        <Experience items={experience} />
        <Projects projects={projects} />
        <Education education={education} careerNotes={careerNotes} />
        <Achievements items={achievements} />
        <AdditionalInfo rows={additional} />
        <Contact email={profile.email} />
      </main>
      <Footer githubUrl={profile.githubUrl} linkedinUrl={profile.linkedinUrl} />
    </div>
  );
}
