import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Section, SocialLinks } from "@/components/Shell";
import { ArticleList } from "@/components/ArticleList";
import { profile, expertise } from "@/content/profile";
import { experience } from "@/content/experience";
import { getArticles } from "@/lib/articles";
import { origin, jsonLd } from "@/lib/metadata";
export default function Home() {
  return (
    <main id="main" className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": origin + "/#person",
                name: profile.name,
                url: origin,
                jobTitle: profile.designation,
                sameAs: [profile.github, profile.linkedin],
              },
              { "@type": "WebSite", name: "Tahsin Abrar", url: origin },
            ],
          }),
        }}
      />
      <section className="hero">
        <div className="eyebrow">
          <span className="status-dot" /> {profile.name}{" "}
          <span className="eyebrow-divider">/</span> {profile.designation}
        </div>
        <h1>
          Engineering scalable systems.
          <br />
          <span>Solving complex problems.</span>
          <br />
          Growing people.
        </h1>
        <div className="hero-bottom">
          <p>{profile.intro}</p>
          <div>
            <SocialLinks />
            <a className="text-link explore" href="#about">
              More about Tahsin <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="hero-foot">
          <span>ENGINEERING · ARCHITECTURE · LEADERSHIP</span>
          <span>Thoughtful systems. Lasting impact.</span>
        </div>
      </section>
      <Section id="about" number="01" label="About">
        <h2>
          Good engineering goes
          <br />
          beyond the code.
        </h2>
        <div className="prose-intro">
          <p>
            I am a Solution Architect specializing in backend engineering,
            distributed systems, and software architecture. I turn business
            challenges into practical technical solutions that support growth.
          </p>
          <p>
            I specialize in designing scalable digital platforms, solving
            complex engineering challenges, and optimizing high-throughput
            systems. I care about the decisions that make software reliable
            today and easier to evolve tomorrow.
          </p>
          <p>
            Alongside hands-on engineering, I help teams grow through technical
            guidance and mentorship — building the confidence to ask better
            questions, make considered decisions, and take ownership.
          </p>
        </div>
      </Section>
      <Section id="expertise" number="02" label="Expertise">
        <h2>
          From the foundations
          <br />
          to the bigger picture.
        </h2>
        <div className="expertise-grid">
          {expertise.map((e, i) => (
            <div className="expertise-item" key={e.title}>
              <span className="small-index">0{i + 1}</span>
              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <p className="technologies">{e.technologies}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section id="experience" number="03" label="Experience">
        <h2>Engineering in practice.</h2>
        {experience.map((e) => (
          <article className="experience-row" key={e.organization}>
            <h3>{e.organization}</h3>
            <div>
              {e.roles.map((r) => (
                <p className="role" key={r}>
                  {r}
                </p>
              ))}
              <p>{e.description}</p>
              <p className="content-note">{e.period}</p>
            </div>
          </article>
        ))}
      </Section>
      <Section id="mentorship" number="04" label="Leadership">
        <h2>
          Build the system.
          <br />
          <span className="accent">Grow the people behind it.</span>
        </h2>
        <p className="section-intro">
          Technical leadership happens in everyday engineering decisions.
        </p>
        <div className="leadership-grid">
          <div>
            <h3>Make room for better questions.</h3>
            <p>
              I help engineers break down unfamiliar problems, explore
              trade-offs, and think beyond the task in front of them.
            </p>
          </div>
          <div>
            <h3>Guide decisions. Build ownership.</h3>
            <p>
              My approach is to provide context and technical guidance while
              encouraging independent execution and thoughtful decision-making.
            </p>
          </div>
          <div>
            <h3>Turn delivery into development.</h3>
            <p>
              Coaching and mentorship connect day-to-day work with longer-term
              growth — strengthening engineering judgment and delivery quality
              together.
            </p>
          </div>
        </div>
      </Section>
      <Section id="writing" number="05" label="Recent writing">
        <div className="section-heading">
          <h2>Notes from the workbench.</h2>
          <Link className="text-link" href="/blog/">
            View all articles <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ArticleList articles={getArticles().slice(0, 3)} />
      </Section>
      <Section id="contact" number="06" label="Contact">
        <h2>Let’s talk engineering.</h2>
        <p className="section-intro">
          Connect with me to discuss systems, software architecture, and growing
          engineering teams.
        </p>
        <SocialLinks />
      </Section>
    </main>
  );
}
