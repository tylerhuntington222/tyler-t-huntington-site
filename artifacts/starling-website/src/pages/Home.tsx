import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu, X, ArrowUpRight } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  publications,
  publicationTypeLabel,
  SCHOLAR_PROFILE_URL,
  splitAuthorsWithHighlight,
  getPublicationUrl,
} from "@/data/publications";

const contactFormSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  organization: z.string().min(1, "Please enter your organization"),
  projectDetails: z.string().min(10, "Please share a few details about what you're trying to build"),
  budget: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const HEADSHOT_SRC = `${import.meta.env.BASE_URL}tyler-huntington-headshot.png`;

const navLinks = [
  { id: "projects", label: "Work" },
  { id: "services", label: "Services" },
  { id: "publications", label: "Publications" },
  { id: "approach", label: "Approach" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      projectDetails: "",
      budget: "",
    },
  });

  function onSubmit(_data: ContactFormValues) {
    setIsSubmitted(true);
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-home">
      <header
        className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl"
        data-testid="header-main"
      >
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-3.5 text-left min-w-0"
            data-testid="link-home"
          >
            <img
              src={HEADSHOT_SRC}
              alt=""
              aria-hidden
              className="size-13 shrink-0 rounded-full object-cover object-[center_15%] border border-border/70"
              data-testid="img-nav-headshot"
            />
            <span className="min-w-0">
              <span className="block text-base font-medium tracking-tight text-foreground group-hover:text-foreground/80 transition-colors truncate">
                Tyler T. Huntington
              </span>
              <span className="block text-xs text-muted-foreground tracking-wide truncate">
                Scientific Software Contractor
              </span>
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-main">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/60"
                data-testid={`link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("contact")}
              size="sm"
              className="ml-3 h-9 px-4 font-medium"
              data-testid="button-nav-cta"
            >
              Get in touch
            </Button>
          </nav>

          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md text-foreground hover:bg-muted/60 transition-colors"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-xl"
              data-testid="mobile-menu"
            >
              <nav className="flex flex-col px-6 py-4 gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-left py-3 text-base text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`mobile-link-${link.id}`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-3 pb-2">
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="w-full font-medium"
                    data-testid="mobile-button-cta"
                  >
                    Get in touch
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section className="hero-glow pt-24 pb-20 md:pt-36 md:pb-28 px-6" data-testid="section-hero">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="eyebrow mb-6">Scientific Software Contractor</p>
              <h1 className="font-serif text-[2.75rem] md:text-[4.25rem] leading-[1.05] tracking-tight text-foreground mb-7">
                Production-grade software,
                <br />
                built around your science.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                I help research teams turn 
                spreadsheets, scripts, and Jupyter notebooks
                into fully-deployed web apps that will make your science shine. 
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={() => scrollToSection("contact")}
                  size="lg"
                  className="h-12 px-6 text-base font-medium"
                  data-testid="button-hero-contact"
                >
                  Get in touch
                  <ArrowUpRight className="ml-1.5 size-4" />
                </Button>
                <Button
                  onClick={() => scrollToSection("services")}
                  variant="outline"
                  size="lg"
                  className="h-12 px-6 text-base font-medium border-border bg-background/50 hover:bg-muted/40"
                  data-testid="button-hero-services"
                >
                  What I build
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="hairline max-w-5xl mx-auto" />

        <section className="py-24 md:py-28 px-6" data-testid="section-positioning">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 md:gap-20">
              <div className="md:col-span-5">
                <p className="eyebrow mb-4">Philosophy</p>
                <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-5">
                  Research code is not the same as research software.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Most scientific work starts in notebooks, one-off scripts, and pipelines
                  that only a couple of people can run. That's the right approach for
                  exploration. But the moment a method needs to be shared with
                  collaborators, maintained over time, or used outside the lab, it needs
                  real software engineering. My job is to bridge that gap: understand the
                  science first, then build durable software around it.
                </p>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="md:col-span-7 space-y-6"
              >
                {[
                  {
                    title: "From notebook to deployed tool",
                    desc: "Turn Jupyter notebooks, R scripts, and research prototypes into stable web apps that collaborators and stakeholders can actually run.",
                    accent: true,
                  },
                  {
                    title: "Built for scientific data",
                    desc: "Geospatial layers, model outputs, lab datasets, and simulation results, packaged into interfaces that make complex science legible and reproducible.",
                    accent: false,
                  },
                  {
                    title: "Made to outlive the grant cycle",
                    desc: "Clean architecture, documented assumptions, and maintainable code, so the tool keeps running long after the original team has moved on.",
                    accent: false,
                  },
                ].map((item) => (
                  <motion.div
                    key={item.title}
                    variants={staggerItem}
                    className={`rounded-xl border p-6 transition-colors ${
                      item.accent
                        ? "border-secondary/30 bg-accent/50"
                        : "border-border/70 bg-card/50 hover:border-border"
                    }`}
                  >
                    <h3 className="text-base font-medium mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="py-24 md:py-28 px-6 bg-muted/30" data-testid="section-services">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="eyebrow mb-4">Services</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">What I build</h2>
              <p className="text-muted-foreground leading-relaxed">
                Science-focused software for research groups, labs, and technical programs,
                from internal prototypes to public-facing web tools.
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-2 gap-5"
            >
              {[
                {
                  title: "From research code to deployed web app",
                  desc: "Migrate Jupyter notebooks, R scripts, and Python codebases into production web applications with proper APIs, authentication, tests, and a codebase your team can maintain after I hand it off.",
                },
                {
                  title: "Geospatial research platforms",
                  desc: "Interactive web maps and spatial analysis tools for resource mapping, site selection, and exploring region-scale scientific datasets.",
                },
                {
                  title: "Scientific dashboards and decision tools",
                  desc: "Web interfaces that let stakeholders explore model outputs, technoeconomic results, and life-cycle assessments visually, without needing to read the underlying code.",
                },
                {
                  title: "Machine learning for science",
                  desc: "Surrogate models, predictive pipelines, and ML workflows wrapped in software that researchers and analysts can run reliably, not just the developer who built them.",
                },
                {
                  title: "Data pipeline engineering",
                  desc: "Modular, reproducible pipelines for cleaning, transforming, and aggregating the messy, multi-source data that comes with real research.",
                },
                {
                  title: "Legacy tool modernization",
                  desc: "Refactor fragile scripts and aging internal tools without losing the domain knowledge and scientific logic that made them valuable in the first place.",
                },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  variants={staggerItem}
                  className="group rounded-xl border border-border/70 bg-background p-6 hover:border-secondary/40 hover:shadow-sm transition-all"
                  data-testid={`card-service-${i}`}
                >
                  <div className="h-px w-8 bg-secondary/60 mb-5 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-serif text-xl mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="approach" className="py-24 md:py-28 px-6" data-testid="section-approach">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-16">
              <p className="eyebrow mb-4">Process</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                A process built for research software
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Research projects need structure that supports discovery rather than slowing
                it down. I work closely with scientists to translate methods into software
                that holds up in production.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  num: "01",
                  title: "Understand the science",
                  desc: "I learn the research question, the data sources, the model assumptions, and who actually needs to use the tool day-to-day.",
                },
                {
                  num: "02",
                  title: "Define the software path",
                  desc: "I map the notebook or prototype to a real web architecture (scope, APIs, data flow, and deployment) before any production code gets written.",
                },
                {
                  num: "03",
                  title: "Build and validate",
                  desc: "I develop the application with frequent check-ins, validating outputs against the original research at each step so the science stays intact.",
                },
                {
                  num: "04",
                  title: "Deploy and document",
                  desc: "I ship the tool, document methodology and assumptions, and support handoff so your team can maintain and extend it after I move on.",
                },
              ].map((step, i) => (
                <div key={step.num} className="relative" data-testid={`card-approach-${i}`}>
                  <span className="font-mono text-xs text-secondary/80 mb-4 block">{step.num}</span>
                  <h3 className="text-base font-medium mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28 px-6 bg-muted/30 border-y border-border/60" data-testid="section-why-me">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p className="eyebrow mb-4">Working together</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-5">Why work with me</h2>
              <p className="text-muted-foreground leading-relaxed">
                I've spent years building scientific software and co-authoring research across
                sustainable energy, bioeconomy analysis, and machine learning, shipping publicly
                deployed tools side-by-side with scientists and domain experts.
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Published research background",
                  desc: "Co-author on peer-reviewed articles, conference papers, and registered scientific software in technoeconomic analysis, geospatial modeling, and ML for bioproduction. I understand how research is evaluated, not just how it's coded.",
                },
                {
                  title: "Research-to-production fluency",
                  desc: "Years of turning notebooks, geospatial models, technoeconomic analyses, and ML pipelines into web-deployed applications that get used well beyond the original research team.",
                },
                {
                  title: "Comfortable working with scientists",
                  desc: "Clear communication across research and engineering. I respect domain expertise, ask the right questions, and make pragmatic software decisions in service of the science.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1.5 size-1.5 rounded-full bg-secondary shrink-0" />
                  <div>
                    <h3 className="text-base font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 md:py-28 px-6" data-testid="section-ideal-clients">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">Fit</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Built for research teams with software gaps
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                We're a good fit if your science is solid but the tooling hasn't caught up. That's a
                common situation for labs, research groups, and technical programs that need
                custom software without a full in-house dev team.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Your method works in a notebook, but you need it running as a web application your collaborators or the public can use",
                "You have geospatial, modeling, or simulation outputs that stakeholders can't explore on their own",
                "Your team relies on scripts, spreadsheets, or manual steps to run analyses that should be a single click",
                "You need technoeconomic, life-cycle, or ML workflows packaged so non-developers can run them",
                "You'd rather work with a contractor who actually understands research environments than a generic dev shop",
              ].map((item, i) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-border/70 bg-card/40 px-5 py-4"
                  data-testid={`item-client-${i}`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mt-0.5 shrink-0 text-secondary"
                    aria-hidden
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-sm md:text-base leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-24 md:py-28 px-6 bg-muted/30" data-testid="section-project-types">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="eyebrow mb-4">Work</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Selected scientific software
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A handful of web tools and platforms I've built for geospatial analysis,
                technoeconomic and life-cycle assessment, and research machine learning.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {[
                {
                  title: "BioSiting Tool",
                  desc: "Geospatial web platform for mapping bioeconomy resources and infrastructure across the United States: agricultural residues, waste streams, biorefineries, pipelines, and environmental data layers. Used to analyze resource availability by region and within custom buffer zones.",
                },
                {
                  title: "BioC2G Tool",
                  desc: "Web interface for technoeconomic analysis and life-cycle assessment of biofuel and bioproduct production pathways. Calculates minimum selling price, water consumption, and greenhouse gas emissions, with downloadable model outputs.",
                },
                {
                  title: "California BioSiting and Cal Bioscape",
                  desc: "State-scale extensions of my biositing work: interactive geospatial tools for mapping biomass resources and bioeconomy infrastructure, built around California research and policy questions.",
                },
                {
                  title: "Research ML and analysis pipelines",
                  desc: "Machine learning workflows for biogas prediction, biomass yield forecasting, surrogate process models, and molecular descriptor selection, moved from research code into reproducible, deployable software.",
                },
              ].map((proj, i) => (
                <div
                  key={proj.title}
                  className="rounded-xl border border-border/70 bg-background p-6 hover:border-secondary/40 transition-colors"
                  data-testid={`card-project-${i}`}
                >
                  <h3 className="font-serif text-lg mb-3">{proj.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="py-24 md:py-28 px-6" data-testid="section-publications">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-2xl mb-14">
              <p className="eyebrow mb-4">Publications</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">Published work</h2>
              <p className="text-muted-foreground leading-relaxed">
                Peer-reviewed articles, conference papers, and registered scientific software
                I've co-authored across bioenergy, geospatial analysis, machine learning, and
                sustainable systems research.
              </p>
            </div>

            <div className="space-y-4">
              {publications.map((pub, i) => {
                const publicationUrl = getPublicationUrl(pub);
                const content = (
                  <>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-secondary">{pub.year}</span>
                      <span className="text-xs text-muted-foreground">·</span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {publicationTypeLabel[pub.type]}
                      </span>
                      {publicationUrl && (
                        <>
                          <span className="text-xs text-muted-foreground">·</span>
                          <span className="text-xs text-secondary">
                            {pub.doi ? `DOI: ${pub.doi}` : "View source"}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-serif text-lg leading-snug mb-2 group-hover:text-secondary transition-colors">
                      {pub.title}
                      {publicationUrl && (
                        <ArrowUpRight className="inline-block ml-1.5 size-3.5 opacity-60 align-middle" />
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {splitAuthorsWithHighlight(pub.authors).map((part, j) =>
                        part.isSelf ? (
                          <strong key={j} className="font-semibold text-foreground">
                            {part.text}
                          </strong>
                        ) : (
                          <span key={j}>{part.text}</span>
                        ),
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground/80 mt-1 italic">{pub.venue}</p>
                  </>
                );

                return publicationUrl ? (
                  <a
                    key={`${pub.year}-${pub.title}`}
                    href={publicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-xl border border-border/70 bg-card/40 px-5 py-5 md:px-6 hover:border-secondary/40 hover:bg-card/60 transition-colors"
                    data-testid={`publication-${i}`}
                  >
                    {content}
                  </a>
                ) : (
                  <article
                    key={`${pub.year}-${pub.title}`}
                    className="rounded-xl border border-border/70 bg-card/40 px-5 py-5 md:px-6 hover:border-border transition-colors"
                    data-testid={`publication-${i}`}
                  >
                    {content}
                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Button variant="outline" asChild className="font-medium">
                <a
                  href={SCHOLAR_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-google-scholar"
                >
                  View full profile on Google Scholar
                  <ArrowUpRight className="ml-1.5 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="py-24 md:py-28 px-6 bg-muted/30" data-testid="section-about">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <img
                src={HEADSHOT_SRC}
                alt="Tyler T. Huntington"
                className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover object-[center_15%] border border-border/70 shadow-sm"
                data-testid="img-headshot"
              />
            </div>
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-6">
              Scientific software, from the lab outward.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I've spent a decade building scientific software: web tools that help researchers,
              analysts, and policymakers actually use the science, not just read about it.
            </p>
            <div className="hairline mb-8" />
            <p className="text-muted-foreground italic font-serif text-lg leading-relaxed">
              My work spans sustainable energy, biofuels, bioproduct supply chains, and synthetic
              biology, all backed by a record of co-authored publications and registered
              scientific software. The throughline is making rigorous science accessible
              through well-engineered applications.
            </p>
          </div>
        </section>

        <section id="contact" className="py-24 md:py-28 px-6 bg-muted/30 border-t border-border/60" data-testid="section-contact">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">Contact</p>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Have research that needs to become software?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Tell me about your project: the science, your current notebooks or scripts, and
                what a deployed tool would need to do. I'll help you figure out whether a custom
                build makes sense, and if so, what shape it should take.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-border/70 bg-background p-10 text-center"
                data-testid="message-success"
              >
                <h3 className="font-serif text-2xl mb-3">Thank you.</h3>
                <p className="text-muted-foreground text-sm">
                  Your message is in. I'll be in touch shortly to keep the conversation going.
                </p>
              </motion.div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-xl border border-border/70 bg-background p-6 md:p-8 space-y-5"
                  data-testid="form-contact"
                >
                  <div className="grid md:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              className="border-border/80 bg-background focus-visible:ring-secondary/30"
                              {...field}
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              className="border-border/80 bg-background focus-visible:ring-secondary/30"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="organization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Organization</FormLabel>
                        <FormControl>
                          <Input
                            className="border-border/80 bg-background focus-visible:ring-secondary/30"
                            {...field}
                            data-testid="input-organization"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="projectDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tell me about your research or project</FormLabel>
                        <FormControl>
                          <Textarea
                            className="border-border/80 min-h-[120px] bg-background focus-visible:ring-secondary/30"
                            {...field}
                            data-testid="input-project-details"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget / timeline (optional)</FormLabel>
                        <FormControl>
                          <Input
                            className="border-border/80 bg-background focus-visible:ring-secondary/30"
                            {...field}
                            data-testid="input-budget"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full md:w-auto h-12 px-8 text-base font-medium"
                      data-testid="button-submit"
                    >
                      Send message
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </section>
      </main>

      <footer className="py-10 px-6 border-t border-border/60" data-testid="footer-main">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium tracking-tight">Tyler T. Huntington</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Scientific Software Contractor
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tyler T. Huntington
          </p>
        </div>
      </footer>
    </div>
  );
}
