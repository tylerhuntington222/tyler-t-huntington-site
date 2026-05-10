import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu, X } from "lucide-react";
import logoImg from "@assets/ChatGPT_Image_May_10,_2026,_11_24_58_AM_1778438025530.png";

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

  function onSubmit(data: ContactFormValues) {
    setIsSubmitted(true);
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans" data-testid="page-home">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border" data-testid="header-main">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} data-testid="link-home">
            <div style={{ height: '36px', width: '290px', overflow: 'hidden', position: 'relative', flexShrink: 0 }} data-testid="img-logo">
              <img
                src={logoImg}
                alt="Starling Custom Software"
                style={{
                  mixBlendMode: 'multiply',
                  position: 'absolute',
                  height: '200%',
                  width: 'auto',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" data-testid="nav-main">
            <button onClick={() => scrollToSection('projects')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-work">Work</button>
            <button onClick={() => scrollToSection('services')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-services">Services</button>
            <button onClick={() => scrollToSection('approach')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-approach">Approach</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-about">About</button>
            <button onClick={() => scrollToSection('contact')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-contact">Contact</button>
            <Button onClick={() => scrollToSection('contact')} variant="default" className="rounded-none font-medium ml-2" data-testid="button-nav-cta">Start a conversation</Button>
          </nav>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile slide-down menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
              data-testid="mobile-menu"
            >
              <nav className="flex flex-col px-6 py-6 gap-1">
                <button onClick={() => scrollToSection('projects')} className="text-left py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors" data-testid="mobile-link-work">Work</button>
                <button onClick={() => scrollToSection('services')} className="text-left py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors" data-testid="mobile-link-services">Services</button>
                <button onClick={() => scrollToSection('approach')} className="text-left py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors" data-testid="mobile-link-approach">Approach</button>
                <button onClick={() => scrollToSection('about')} className="text-left py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors" data-testid="mobile-link-about">About</button>
                <button onClick={() => scrollToSection('contact')} className="text-left py-3 text-base font-medium text-muted-foreground hover:text-foreground border-b border-border/50 transition-colors" data-testid="mobile-link-contact">Contact</button>
                <div className="pt-4">
                  <Button onClick={() => scrollToSection('contact')} variant="default" className="w-full rounded-none font-medium" data-testid="mobile-button-cta">Start a conversation</Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-24 md:pt-48 md:pb-32 px-6" data-testid="section-hero">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-serif text-foreground leading-tight tracking-tight mb-8">
                Software built for you.
                <br />
                Tailored to your needs.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mb-12 font-light">
                Starling delivers custom solutions when off-the-shelf tools fall short.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => scrollToSection('contact')} size="lg" className="rounded-none text-base h-14 px-8" data-testid="button-hero-contact">
                  Start a conversation
                </Button>
                <Button onClick={() => scrollToSection('services')} variant="outline" size="lg" className="rounded-none text-base h-14 px-8 border-primary text-primary hover:bg-primary/5" data-testid="button-hero-services">
                  See what we build
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Positioning Section */}
        <section className="py-24 bg-card border-y border-border px-6" data-testid="section-positioning">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-16">
              <div className="md:col-span-5">
                <h2 className="text-4xl font-serif mb-6 leading-tight">Not every problem needs another template.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Many software projects start with a prebuilt framework, a recycled dashboard, or a one-size-fits-all workflow. That can be fine for simple needs. But technical teams often have messy data, specialized processes, and domain-specific requirements. Starling starts there — with the real problem — and builds software around it.
                </p>
              </div>
              <div className="md:col-span-7">
                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-8"
                >
                  <motion.div variants={staggerItem} className="border-l-2 border-primary pl-6 py-1">
                    <h3 className="text-xl font-semibold mb-2">Built around your workflow</h3>
                    <p className="text-muted-foreground">Software should adapt to how your team actually works, not the other way around.</p>
                  </motion.div>
                  <motion.div variants={staggerItem} className="border-l-2 border-border pl-6 py-1">
                    <h3 className="text-xl font-semibold mb-2">Designed for your data</h3>
                    <p className="text-muted-foreground">From databases and APIs to analysis pipelines and dashboards, we build tools that make complex data usable.</p>
                  </motion.div>
                  <motion.div variants={staggerItem} className="border-l-2 border-border pl-6 py-1">
                    <h3 className="text-xl font-semibold mb-2">Made to last</h3>
                    <p className="text-muted-foreground">Clean architecture, readable code, and thoughtful handoff so your software can keep evolving.</p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-32 px-6" data-testid="section-services">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif mb-16 text-center">What we build</h2>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-x-12 gap-y-16"
            >
              {[
                {
                  title: "Custom web applications",
                  desc: "Purpose-built apps for internal teams, external users, research groups, and technical workflows."
                },
                {
                  title: "Data dashboards and decision tools",
                  desc: "Interfaces that turn complex datasets into clear, useful outputs."
                },
                {
                  title: "Workflow automation",
                  desc: "Software that reduces manual work, connects systems, and helps teams move faster."
                },
                {
                  title: "Research and scientific software",
                  desc: "Tools for modeling, analysis, visualization, experiment workflows, and technical collaboration."
                },
                {
                  title: "Prototype-to-production development",
                  desc: "Turn a script, notebook, prototype, or early idea into reliable software."
                },
                {
                  title: "Software modernization",
                  desc: "Improve fragile tools, legacy workflows, and scattered scripts without losing the domain knowledge behind them."
                }
              ].map((service, i) => (
                <motion.div key={i} variants={staggerItem} className="group" data-testid={`card-service-${i}`}>
                  <div className="h-px w-12 bg-primary mb-6 transition-all duration-500 group-hover:w-full"></div>
                  <h3 className="text-2xl font-serif mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="py-32 bg-secondary text-secondary-foreground px-6" data-testid="section-approach">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-serif mb-6">A careful process for custom work</h2>
              <p className="text-lg text-secondary-foreground/80">Custom does not mean chaotic. The goal is to bring structure to ambiguous technical problems.</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  num: "01",
                  title: "Understand the problem",
                  desc: "We learn your workflow, users, data, constraints, and goals."
                },
                {
                  num: "02",
                  title: "Shape the right solution",
                  desc: "We define the scope, architecture, and technical path before rushing into code."
                },
                {
                  num: "03",
                  title: "Build with clarity",
                  desc: "We develop clean, maintainable software with frequent check-ins and visible progress."
                },
                {
                  num: "04",
                  title: "Hand off and support",
                  desc: "We document the system, prepare your team to use it, and support the next stage when needed."
                }
              ].map((step, i) => (
                <div key={i} className="relative pt-8" data-testid={`card-approach-${i}`}>
                  <div className="absolute top-0 left-0 text-5xl font-serif text-secondary-foreground/10">{step.num}</div>
                  <h3 className="text-xl font-semibold mb-3 relative z-10">{step.title}</h3>
                  <p className="text-secondary-foreground/70 relative z-10 leading-relaxed text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Starling */}
        <section className="py-32 px-6 border-b border-border" data-testid="section-why-starling">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-6">Why Starling</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Starling sits between technical consulting and hands-on software development. We do not just advise from the sidelines, and we do not just execute tickets. We help define what should be built, then build it carefully.
              </p>
            </div>
            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold mb-2">Ground-up thinking</h3>
                <p className="text-muted-foreground leading-relaxed">We do not force your project into a template. We design around your actual needs.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Data-driven expertise</h3>
                <p className="text-muted-foreground leading-relaxed">We are especially strong where software meets data, analysis, research, and technical decision-making.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Human collaboration</h3>
                <p className="text-muted-foreground leading-relaxed">Clear communication, plain language, and a working style that respects your team's expertise.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Ideal Clients */}
        <section className="py-32 px-6 bg-card" data-testid="section-ideal-clients">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif mb-8 text-center">Built for teams with specialized software needs</h2>
            <p className="text-lg text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
              Starling is a good fit for teams that have outgrown spreadsheets, scripts, generic dashboards, or manual workflows — but do not need or want a large software vendor.
            </p>
            
            <div className="space-y-4 max-w-2xl mx-auto">
              {[
                "Your workflow is too specific for off-the-shelf software",
                "Your data is valuable but hard to use",
                "Your team relies on fragile scripts, spreadsheets, or manual steps",
                "You need a custom tool but do not have an internal software team",
                "You want a thoughtful technical partner, not a generic dev shop"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-border bg-background" data-testid={`item-client-${i}`}>
                  <div className="mt-1 min-w-[24px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary" />
                    </svg>
                  </div>
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Example Project Types */}
        <section className="py-32 px-6 border-t border-border" data-testid="section-project-types">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-serif mb-16 text-center">The kinds of problems we help solve</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Research data platform",
                  desc: "A custom interface for organizing, querying, and visualizing scientific datasets."
                },
                {
                  title: "Internal operations tool",
                  desc: "A lightweight application to replace spreadsheets, manual tracking, and repeated coordination work."
                },
                {
                  title: "Analytical dashboard",
                  desc: "A decision-support tool that connects live data sources with clear visual outputs."
                },
                {
                  title: "Prototype to product",
                  desc: "A rough technical proof of concept turned into a stable, usable application."
                }
              ].map((proj, i) => (
                <div key={i} className="p-8 border border-border bg-card hover:border-primary/50 transition-colors" data-testid={`card-project-${i}`}>
                  <h3 className="text-xl font-serif mb-4">{proj.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-32 px-6 bg-secondary/5" data-testid="section-about">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-serif mb-8">Small by design. Technical by nature.</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Starling Custom Software is an independent software studio focused on building thoughtful, data-driven tools for technical teams. We bring a research-minded approach to software development: understand the system, clarify the problem, and build only what is useful.
            </p>
            <div className="w-16 h-px bg-border mx-auto mb-8"></div>
            <p className="text-muted-foreground italic font-serif text-lg">
              "Founded by a software developer with experience building custom tools in research and technical environments, Starling is designed for clients who need both engineering judgment and hands-on implementation."
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6 border-t border-border" data-testid="section-contact">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif mb-6">Have a software problem that doesn't fit a template?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Let's talk through what you're trying to build, where your current tools are falling short, and whether a custom software approach makes sense.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border p-12 text-center"
                  data-testid="message-success"
                >
                  <h3 className="text-2xl font-serif mb-4">Thank you.</h3>
                  <p className="text-muted-foreground">We've received your message and will be in touch shortly to continue the conversation.</p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input className="rounded-none border-border focus-visible:ring-primary bg-background" {...field} data-testid="input-name" />
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
                              <Input type="email" className="rounded-none border-border focus-visible:ring-primary bg-background" {...field} data-testid="input-email" />
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
                            <Input className="rounded-none border-border focus-visible:ring-primary bg-background" {...field} data-testid="input-organization" />
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
                            <Textarea className="rounded-none border-border min-h-[120px] focus-visible:ring-primary bg-background" {...field} data-testid="input-project-details" />
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
                            <Input className="rounded-none border-border focus-visible:ring-primary bg-background" {...field} data-testid="input-budget" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="pt-4 text-center">
                      <Button type="submit" size="lg" className="rounded-none px-12 h-14 text-base w-full md:w-auto" data-testid="button-submit">
                        Start a conversation
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border bg-background text-center" data-testid="footer-main">
        <div className="max-w-6xl mx-auto flex flex-col items-center justify-center">
          <p className="font-serif text-xl font-semibold mb-2">STARLING <span className="font-sans font-normal text-sm ml-2 text-muted-foreground">CUSTOM SOFTWARE</span></p>
          <p className="text-sm text-muted-foreground">Custom software for technical teams</p>
        </div>
      </footer>
    </div>
  );
}