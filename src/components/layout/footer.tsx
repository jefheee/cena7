import React from "react";
import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { Cena7Logo } from "@/components/brand/cena7-logo";
import { InstagramIcon } from "@/components/brand/instagram-icon";
import { CENA7_CONTACTS } from "@/lib/catalog";

export function Footer() {
  return (
    <footer className="bg-[#141413] text-[#FAF8F5] border-t border-[#2A2A27]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Marca e Posicionamento */}
          <div className="space-y-5 lg:col-span-1">
            <Cena7Logo variant="dark" />
            <p className="text-sm text-[#A1A1AA] leading-relaxed">
              Marcenaria e fabricação própria de alto padrão em Palhoça / Grande Florianópolis. Mobiliário autoral, peças orgânicas e cenografia sob medida para casamentos e eventos memoráveis.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={CENA7_CONTACTS.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[#2E2E2B] bg-[#1E1E1C] px-4 text-xs font-medium text-[#FAF8F5] hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
              >
                <InstagramIcon className="size-4" />
                <span>{CENA7_CONTACTS.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Coluna 2: Navegação */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Plataforma
            </h3>
            <ul className="space-y-2.5 text-sm text-[#D4D4D8]">
              <li>
                <Link href="/#lancamentos" className="hover:text-[#C5A059] transition-colors">
                  Coleção Autoral & Lançamentos 2026
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-[#C5A059] transition-colors">
                  Catálogo Completo de Locação
                </Link>
              </li>
              <li>
                <Link href="/#eventos" className="hover:text-[#C5A059] transition-colors">
                  Galeria de Eventos & Hotspots
                </Link>
              </li>
              <li>
                <Link href="/#b2b" className="hover:text-[#C5A059] transition-colors">
                  Espaço do Decorador & Arquiteto (B2B)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Atendimento Comercial */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Atendimento Comercial
            </h3>
            <ul className="space-y-3 text-sm text-[#D4D4D8]">
              <li>
                <a
                  href={`https://wa.me/${CENA7_CONTACTS.whatsapp1Number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#C5A059] transition-colors"
                >
                  <MessageCircle className="size-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-[11px] text-[#A1A1AA]">WhatsApp Comercial 1</span>
                    <span className="tabular-nums font-medium">{CENA7_CONTACTS.whatsapp1Display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${CENA7_CONTACTS.whatsapp2Number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-[#C5A059] transition-colors"
                >
                  <MessageCircle className="size-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <span>
                    <span className="block text-[11px] text-[#A1A1AA]">WhatsApp Comercial 2</span>
                    <span className="tabular-nums font-medium">{CENA7_CONTACTS.whatsapp2Display}</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CENA7_CONTACTS.email}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#C5A059] transition-colors"
                >
                  <Mail className="size-4 text-[#C5A059] shrink-0" aria-hidden="true" />
                  <span>{CENA7_CONTACTS.email}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Fábrica & Dados Jurídicos */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Fábrica & Logística
            </h3>
            <div className="space-y-3 text-sm text-[#A1A1AA]">
              <p className="inline-flex items-start gap-2.5 text-[#D4D4D8]">
                <MapPin className="size-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{CENA7_CONTACTS.cityRegion}</span>
              </p>
              <p className="text-xs leading-relaxed">
                Atendimento logístico especializado para Florianópolis, Jurerê Internacional, Palhoça, São José, Santo Amaro da Imperatriz, Governador Celso Ramos e litoral catarinense.
              </p>
              <div className="rounded-xl border border-[#2A2A27] bg-[#1E1E1C] p-3 text-[11px] text-[#A1A1AA] space-y-1">
                <p className="font-semibold text-[#FAF8F5]">{CENA7_CONTACTS.companyName}</p>
                <p className="tabular-nums">CNPJ: {CENA7_CONTACTS.cnpj}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2A2A27] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>
            © 2026 Cena7 Móveis e Eventos. Fabricação própria & curadoria de eventos.
          </p>
          <p>
            Acervo oficial integrado ao atendimento consultivo via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
