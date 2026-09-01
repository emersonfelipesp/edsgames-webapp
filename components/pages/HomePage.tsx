import { getDictionary, type Locale } from "@/lib/i18n";
import { PageShell } from "@/components/site/PageShell";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { About } from "@/components/sections/About";
import { Requirements } from "@/components/sections/Requirements";
import { Features } from "@/components/sections/Features";
import { Store } from "@/components/sections/Store";
import { Testimonials } from "@/components/sections/Testimonials";
import { PixSection } from "@/components/sections/PixSection";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale} routeKey="home" dict={dict}>
      <Hero locale={locale} dict={dict} />
      <Intro dict={dict} />
      <About dict={dict} />
      <Requirements dict={dict} />
      <Features dict={dict} />
      <Store locale={locale} dict={dict} />
      <Testimonials dict={dict} />
      <PixSection dict={dict} />
      <Faq dict={dict} />
      <Contact dict={dict} />
    </PageShell>
  );
}
