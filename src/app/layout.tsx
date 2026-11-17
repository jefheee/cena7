import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { QuoteCartProvider } from "@/context/quote-cart-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { QuoteDrawer } from "@/components/quote/quote-drawer";
import { CENA7_CONTACTS, getAllProducts, getCatalogData } from "@/lib/catalog";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.cena7.com.br"),
  title: {
    default: "Cena7 Móveis e Eventos | Mobiliário Autoral e Cenografia em Florianópolis",
    template: "%s | Cena7 Móveis e Eventos",
  },
  description:
    "Locação de mobiliário autoral, peças orgânicas, bares cenográficos e marcenaria própria para casamentos e eventos de luxo em Palhoça e Grande Florianópolis.",
  keywords: [
    "locação de móveis para eventos florianópolis",
    "mobiliário para casamentos grande florianópolis",
    "cena7 móveis e eventos",
    "aluguel de móveis palhoça",
    "bar boiserie eventos",
    "mesa duna eventos",
    "cenografia para casamentos sc",
  ],
  alternates: {
    canonical: "https://www.cena7.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.cena7.com.br",
    siteName: "Cena7 Móveis e Eventos",
    title: "Cena7 Móveis e Eventos | Mobiliário Autoral e Cenografia de Luxo",
    description:
      "Acervo com mais de 245 peças de fabricação própria em Palhoça/SC. Monte sua lista de cotação e envie diretamente para o nosso time comercial.",
    images: [
      {
        url: "https://img-estoquenow.s3.amazonaws.com/items/4960/bar-boiserie-formato-u_64200e3bc81c6877597adc51e8210397.jpeg",
        width: 1200,
        height: 800,
        alt: "Cena7 Móveis e Eventos - Mobiliário Autoral e Cenografia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cena7 Móveis e Eventos | Grande Florianópolis",
    description:
      "Marcenaria própria e acervo com +245 peças para casamentos, eventos corporativos e decoradores.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const catalogData = getCatalogData();
  const products = getAllProducts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: CENA7_CONTACTS.companyName,
    alternateName: "Cena7 Móveis e Eventos",
    url: CENA7_CONTACTS.siteUrl,
    email: CENA7_CONTACTS.email,
    telephone: "+55-48-99154-0416",
    taxID: CENA7_CONTACTS.cnpj,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Palhoça",
      addressRegion: "SC",
      addressCountry: "BR",
    },
    areaServed: [
      "Florianópolis",
      "Palhoça",
      "São José",
      "Santo Amaro da Imperatriz",
      "Governador Celso Ramos",
    ],
    sameAs: [CENA7_CONTACTS.instagramUrl],
  };

  return (
    <html
      lang="pt-BR"
      className={`${cormorant.variable} ${jakarta.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#FAF8F5] text-[#18181B]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <QuoteCartProvider>
          <Header
            products={products}
            totalCatalogCount={catalogData.meta.totalProducts}
          />
          <main className="flex-1">{children}</main>
          <Footer />
          <QuoteDrawer />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
