"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Install",
    code: "curl -fsSL https://raw.githubusercontent.com/aether-one/aether/main/scripts/install.sh | sh
",
    description: "Download the standalone binary for your platform (this command above is for Linux/MacOS)",
  },
  {
    number: "2",
    title: "Run",
    code: "aether",
    description: "Open a terminal in any project directory",
  },
  {
    number: "3",
    title: "Chat",
    code: "/genesis",
    description: "An interactive session starts — use /<COMMAND>",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-32 px-4 bg-background" id="how-it-works">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            One command.
            <br />
            <span className="text-muted">Full context.</span>
          </h2>
        </motion.div>

        <div className="space-y-1">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="group flex items-center gap-6 md:gap-10 py-6 border-b border-border first:border-t"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Number */}
              <span className="text-[11px] font-mono text-muted/40 w-6 flex-shrink-0 tracking-wider">
                0{step.number}
              </span>

              {/* Title */}
              <span className="text-foreground font-medium text-sm w-20 flex-shrink-0">
                {step.title}
              </span>

              {/* Code */}
              <div className="flex-1">
                <div className="font-mono text-sm text-muted group-hover:text-accent transition-colors duration-300">
                  <span className="text-accent/50 group-hover:text-accent transition-colors duration-300">
                    {step.code.startsWith("/") ? "›" : "$"}
                  </span>{" "}
                  {step.code}
                </div>
                {step.description && (
                  <p className="text-[12px] text-muted/50 mt-1">{step.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted/60 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Works with any language, any framework, any AI provider.
        </motion.p>
      </div>
    </section>
  );
}
