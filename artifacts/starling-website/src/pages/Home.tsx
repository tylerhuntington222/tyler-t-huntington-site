import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().min(1, "Organization is required"),
  projectDetails: z.string().min(10, "Please provide some details about what you're trying to build"),
  budget: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const navLinks = [
  { id: "projects", label: "Work" },
  { id: "services", label: "Services" },
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

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="page-home">
      <header
        className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl"
        data-testid="header-main"
      >
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            className="group text-left"
            data-testid="link-home"
          >
            <span className="block text-[15px] font-medium tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
              Tyler Huntington
            </span>
            <span className="block text-[11px] text-muted-foreground tracking-wide">
              Independent contractor
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
              <p className="eyebrow mb-6">Independent software contractor</p>
              <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] tracking-tight text-foreground mb-7">
                Software built around your problem.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
                I design and build custom, data-driven software for teams whose workflows,
                research, and ideas do not fit neatly into off-the-shelf tools.
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
                <h2 className="font-display text-3xl md:text-4xl leading-tight mb-5">
                  Not every problem needs another template.
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Many projects start with a prebuilt framework, a recycled dashboard, or a
                  one-size-fits-all workflow. That can work for simple needs. But technical teams
                  often have messy data, specialized processes, and domain-specific requirements. I
                  start there — with the real problem — and build software around it.
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
                    title: "Built around your workflow",
                    desc: "Software should adapt to how your team actually works, not the other way around.",
                    accent: true,
                  },
                  {
                    title: "Designed for your data",
                    desc: "From databases and APIs to analysis pipelines and dashboards, I build tools that make complex data usable.",
                    accent: false,
                  },
                  {
                    title: "Made to last",
                    desc: "Clean architecture, readable code, and thoughtful handoff so your software can keep evolving.",
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
              <h2 className="font-display text-3xl md:text-4xl mb-4">What I build</h2>
              <p className="text-muted-foreground leading-relaxed">
                Custom software for research, technical, and data-heavy teams — from early prototypes
                to production-ready tools.
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
                  title: "Custom web applications",
                  desc: "Purpose-built apps for internal teams, external users, research groups, and technical workflows.",
                },
                {
                  title: "Data dashboards and decision tools",
                  desc: "Interfaces that turn complex datasets into clear, useful outputs.",
                },
                {
                  title: "Workflow automation",
                  desc: "Software that reduces manual work, connects systems, and helps teams move faster.",
                },
                {
                  title: "Research and scientific software",
                  desc: "Tools for modeling, analysis, visualization, experiment workflows, and technical collaboration.",
                },
                {
                  title: "Prototype-to-production development",
                  desc: "Turn a script, notebook, prototype, or early idea into reliable software.",
                },
                {
                  title: "Software modernization",
                  desc: "Improve fragile tools, legacy workflows, and scattered scripts without losing the domain knowledge behind them.",
                },
              ].map((service, i) => (
                <motion.div
                  key={service.title}
                  variants={staggerItem}
                  className="group rounded-xl border border-border/70 bg-background p-6 hover:border-secondary/40 hover:shadow-sm transition-all"
                  data-testid={`card-service-${i}`}
                >
                  <div className="h-px w-8 bg-secondary/60 mb-5 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-display text-xl mb-2">{service.title}</h3>
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
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                A careful process for custom work
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Custom does not mean chaotic. The goal is to bring structure to ambiguous technical
                problems.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  num: "01",
                  title: "Understand the problem",
                  desc: "I learn your workflow, users, data, constraints, and goals.",
                },
                {
                  num: "02",
                  title: "Shape the right solution",
                  desc: "I define the scope, architecture, and technical path before rushing into code.",
                },
                {
                  num: "03",
                  title: "Build with clarity",
                  desc: "I develop clean, maintainable software with frequent check-ins and visible progress.",
                },
                {
                  num: "04",
                  title: "Hand off and support",
                  desc: "I document the system, prepare your team to use it, and support the next stage when needed.",
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
              <h2 className="font-display text-3xl md:text-4xl mb-5">Why work with me</h2>
              <p className="text-muted-foreground leading-relaxed">
                I sit between technical consulting and hands-on software development. I do not just
                advise from the sidelines, and I do not just execute tickets. I help define what
                should be built, then build it carefully.
              </p>
            </div>
            <div className="space-y-8">
              {[
                {
                  title: "Ground-up thinking",
                  desc: "I do not force your project into a template. I design around your actual needs.",
                },
                {
                  title: "Data-driven expertise",
                  desc: "Especially strong where software meets data, analysis, research, and technical decision-making.",
                },
                {
                  title: "Human collaboration",
                  desc: "Clear communication, plain language, and a working style that respects your team's expertise.",
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
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Built for teams with specialized software needs
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                A good fit if your team has outgrown spreadsheets, scripts, generic dashboards, or
                manual workflows — but does not need or want a large software vendor.
              </p>
            </div>

            <div className="space-y-3">
              {[
                "Your workflow is too specific for off-the-shelf software",
                "Your data is valuable but hard to use",
                "Your team relies on fragile scripts, spreadsheets, or manual steps",
                "You need a custom tool but do not have an internal software team",
                "You want a thoughtful technical partner, not a generic dev shop",
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
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                The kinds of problems I help solve
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  title: "Research data platform",
                  desc: "A custom interface for organizing, querying, and visualizing scientific datasets.",
                },
                {
                  title: "Internal operations tool",
                  desc: "A lightweight application to replace spreadsheets, manual tracking, and repeated coordination work.",
                },
                {
                  title: "Analytical dashboard",
                  desc: "A decision-support tool that connects live data sources with clear visual outputs.",
                },
                {
                  title: "Prototype to product",
                  desc: "A rough technical proof of concept turned into a stable, usable application.",
                },
              ].map((proj, i) => (
                <div
                  key={proj.title}
                  className="rounded-xl border border-border/70 bg-background p-6 hover:border-secondary/40 transition-colors"
                  data-testid={`card-project-${i}`}
                >
                  <h3 className="font-display text-lg mb-3">{proj.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-24 md:py-28 px-6" data-testid="section-about">
          <div className="max-w-2xl mx-auto text-center">
            <p className="eyebrow mb-4">About</p>
            <h2 className="font-display text-3xl md:text-4xl mb-6">
              Independent by design. Technical by nature.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I am Tyler Huntington, an independent software contractor focused on building
              thoughtful, data-driven tools for technical teams. I bring a research-minded approach
              to software development: understand the system, clarify the problem, and build only
              what is useful.
            </p>
            <div className="hairline mb-8" />
            <p className="text-muted-foreground italic font-display text-lg leading-relaxed">
              With experience building custom tools in research and technical environments, I work
              with clients who need both engineering judgment and hands-on implementation.
            </p>
          </div>
        </section>

        <section id="contact" className="py-24 md:py-28 px-6 bg-muted/30 border-t border-border/60" data-testid="section-contact">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="eyebrow mb-4">Contact</p>
              <h2 className="font-display text-3xl md:text-4xl mb-4">
                Have a software problem that does not fit a template?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-xl mx-auto">
                Tell me what you are trying to build, where your current tools are falling short, and
                whether a custom software approach makes sense.
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-xl border border-border/70 bg-background p-10 text-center"
                data-testid="message-success"
              >
                <h3 className="font-display text-2xl mb-3">Thank you.</h3>
                <p className="text-muted-foreground text-sm">
                  I have received your message and will be in touch shortly to continue the
                  conversation.
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
                        <FormLabel>What are you trying to build?</FormLabel>
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
            <p className="text-sm font-medium tracking-tight">Tyler Huntington</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Independent software contractor
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Tyler Huntington
          </p>
        </div>
      </footer>
    </div>
  );
}
