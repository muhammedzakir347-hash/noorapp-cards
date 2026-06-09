import type { Metadata } from "next";
import Link from "next/link";
import { TEMPLATES, STYLE_META, type TemplateStyle } from "@/lib/templates";
import { getAdminUser } from "@/lib/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Browse Templates — نور Cards",
  description: "Choose from Islamic, Hindu, Christian, and Modern wedding invitation templates.",
};

const STYLE_COLORS: Record<TemplateStyle, string> = {
  islamic:   "#C9A84C",
  hindu:     "#FF8C00",
  christian: "#D4AF37",
  modern:    "#C9A84C",
};

export default async function TemplatesPage() {
  const adminUser = await getAdminUser();
  const isAdmin = !!adminUser;
  const styles = Object.keys(STYLE_META) as TemplateStyle[];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6" style={{ background: "#0f1f17" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-amiri text-5xl mb-3" style={{ color: "#FAF6EF" }}>
            Wedding Invitation Templates
          </h1>
          <p className="font-lora text-base" style={{ color: "#b8b4aa" }}>
            Choose the perfect template for your special day
          </p>
        </div>

        {styles.map((style) => {
          const meta = STYLE_META[style];
          const accent = STYLE_COLORS[style];
          const templates = TEMPLATES.filter((t) => t.style === style);

          return (
            <div key={style} className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{meta.icon}</span>
                <div>
                  <h2 className="font-lora text-xl font-semibold" style={{ color: "#FAF6EF" }}>
                    {meta.label}
                  </h2>
                  <p className="text-sm" style={{ color: "#b8b4aa" }}>{meta.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="rounded-2xl overflow-hidden group transition-transform hover:-translate-y-1"
                    style={{ background: template.colors.bg, border: `1px solid ${template.colors.accent}30` }}
                  >
                    {/* Color bar */}
                    <div className="h-1" style={{ background: template.colors.accent }} />

                    {/* Preview area */}
                    <div className="p-6 text-center space-y-3 min-h-[200px] flex flex-col justify-center">
                      <p
                        className="font-amiri text-3xl"
                        style={{ color: template.colors.accent }}
                        dir={style === "islamic" ? "rtl" : undefined}
                      >
                        {style === "islamic" ? "بِسْمِ اللَّهِ" : template.emoji}
                      </p>
                      <div>
                        <p className="font-lora text-lg font-semibold" style={{ color: template.colors.text ?? "#FAF6EF" }}>
                          {template.name}
                        </p>
                        {template.nameAr && (
                          <p className="font-amiri text-base" style={{ color: `${template.colors.accent}80` }}>
                            {template.nameAr}
                          </p>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: `${template.colors.text ?? "#FAF6EF"}70` }}>
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {template.features.slice(0, 4).map((f) => (
                          <span
                            key={f}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ background: `${template.colors.accent}15`, color: template.colors.accent }}
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="px-6 pb-6 space-y-2">
                      <Link
                        href={
                          isAdmin
                            ? `/create/${template.id}`
                            : `/checkout?plan=pro&template=${template.id}`
                        }
                        className="block text-center rounded-xl py-2.5 text-sm font-semibold transition-colors"
                        style={{ background: template.colors.accent, color: "#0f1f17" }}
                      >
                        {isAdmin ? "Create Now →" : "Use This Template"}
                      </Link>
                      {isAdmin && (
                        <p className="text-center text-xs" style={{ color: "#C9A84C80" }}>
                          ✓ Admin — payment bypassed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
