"use client";

import React, { useState } from "react";
import {
  Box,
  Check,
  Compass,
  Download,
  FileText,
  Hammer,
  MessageCircle,
  Ruler,
  Sparkles,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CENA7_CONTACTS, formatDimensionsSummary } from "@/lib/catalog";
import type { CatalogProduct } from "@/types/catalog";

interface B2BHubProps {
  products: CatalogProduct[];
}

export function B2BHub({ products }: B2BHubProps) {
  const [techSheetOpen, setTechSheetOpen] = useState(false);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [studioName, setStudioName] = useState("");
  const [professionalRole, setProfessionalRole] = useState("Decorador(a)");
  const [cityName, setCityName] = useState("Florianópolis");
  const [instagramRef, setInstagramRef] = useState("");
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const productsWithDimensions = products.filter(
    (p) =>
      p.dimensions &&
      (p.dimensions.altura ||
        p.dimensions.largura ||
        p.dimensions.comprimento ||
        p.dimensions.diametro)
  );

  const handleDownloadTechnicalGuide = () => {
    const rows = productsWithDimensions
      .map((p) => {
        const dims = formatDimensionsSummary(p);
        return `${p.id};"${p.title.replace(/"/g, '""')}";"${p.category}";"${dims}";"${p.styleTags.join(" / ")}"`;
      })
      .join("\n");

    const csvContent =
      "\uFEFF" +
      `Codigo;Peca;Categoria;Dimensoes;Linha_Estilo\n${rows}`;
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cena7-caderno-tecnico-medidas.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrintTechnicalCatalog = () => {
    window.print();
  };

  const handleRequest3DLibrary = () => {
    const msg = [
      "Olá, equipe *Cena7 B2B*!",
      "Sou profissional de eventos e gostaria de receber o link da *Biblioteca de Blocos 3D (SketchUp / AutoCAD)* e o *Caderno Técnico* para especificação nos meus projetos.",
    ].join("\n");
    window.open(
      `https://wa.me/${CENA7_CONTACTS.whatsapp1Number}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleSubmitPartner = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      "Olá, equipe *Cena7*! Gostaria de ativar meu *Cadastro Prioritário B2B* para parcerias.",
      "",
      `*Escritório / Profissional:* ${studioName.trim() || "Não informado"}`,
      `*Atuação:* ${professionalRole}`,
      `*Cidade base:* ${cityName}`,
      instagramRef.trim() ? `*Instagram / Portfólio:* ${instagramRef.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setSubmittedNotice(true);
    window.open(
      `https://wa.me/${CENA7_CONTACTS.whatsapp1Number}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section
      id="b2b"
      className="relative overflow-hidden bg-[#141413] py-20 sm:py-28 text-[#FAF8F5]"
    >
      {/* Aceternity Spotlight sutil em Champagne */}
      <Spotlight
        className="-top-40 left-0 md:left-40 md:-top-20"
        fill="#C5A059"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Cabeçalho B2B */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/40 bg-[#1E1E1C] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              <Compass className="size-3.5" aria-hidden="true" />
              <span>Hub Exclusivo B2B • Grande Florianópolis &amp; Litoral SC</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold leading-tight text-[#FAF8F5]">
              Espaço do Decorador,{" "}
              <span className="italic font-normal text-[#C5A059]">
                Arquiteto e Cerimonialista
              </span>
            </h2>
            <p className="max-w-2xl text-sm sm:text-base text-[#D4D4D8] leading-relaxed">
              Projetado para quem especifica mobiliário em plantas de casamentos e eventos corporativos. Tenha acesso às medidas reais do acervo, blocos 3D para SketchUp/AutoCAD e canal direto com a nossa marcenaria própria em Palhoça.
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Button
              type="button"
              onClick={() => setPartnerModalOpen(true)}
              className="h-12 rounded-full bg-[#C5A059] px-7 text-xs font-semibold uppercase tracking-widest text-[#141413] hover:bg-[#FAF8F5] transition-colors gap-2 cursor-pointer"
            >
              <Sparkles className="size-4" aria-hidden="true" />
              <span>Ativar Parceria B2B</span>
            </Button>
          </div>
        </div>

        {/* 3 Pilares B2B */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pilar 1: Biblioteca 3D & Caderno Técnico */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#2E2E2B] bg-[#1E1E1C]/90 p-7 space-y-6 hover:border-[#C5A059]/50 transition-colors">
            <div className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[#C5A059]/40 bg-[#141413] text-[#C5A059]">
                <Box className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
                  Especificação Técnica
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#FAF8F5]">
                  Biblioteca de Blocos 3D &amp; Caderno de Medidas
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Consulte o caderno técnico com medidas reais de{" "}
                  <strong className="text-[#FAF8F5] tabular-nums">
                    {productsWithDimensions.length} peças
                  </strong>{" "}
                  catalogadas ou solicite o pacote de blocos em SketchUp e AutoCAD (.SKP / .DWG).
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <Button
                type="button"
                onClick={() => setTechSheetOpen(true)}
                className="h-11 w-full rounded-xl bg-[#FAF8F5] text-xs font-semibold text-[#141413] hover:bg-[#C5A059] transition-colors gap-2 cursor-pointer"
              >
                <FileText className="size-4" aria-hidden="true" />
                <span>Abrir Caderno Técnico de Medidas</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleRequest3DLibrary}
                className="h-11 w-full rounded-xl border-[#3F3F3B] bg-transparent text-xs font-semibold text-[#FAF8F5] hover:border-[#C5A059] hover:bg-[#141413] hover:text-[#C5A059] gap-2 cursor-pointer"
              >
                <Download className="size-4" aria-hidden="true" />
                <span>Solicitar Pacote 3D (.SKP / .DWG)</span>
              </Button>
            </div>
          </div>

          {/* Pilar 2: Marcenaria Cenográfica Sob Medida */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#2E2E2B] bg-[#1E1E1C]/90 p-7 space-y-6 hover:border-[#C5A059]/50 transition-colors">
            <div className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl border border-[#C5A059]/40 bg-[#141413] text-[#C5A059]">
                <Hammer className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
                  DNA de Fábrica • Palhoça / SC
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#FAF8F5]">
                  Marcenaria Cenográfica Sob Medida
                </h3>
                <p className="text-sm text-[#A1A1AA] leading-relaxed">
                  Por contar com marcenaria e estofaria próprias em Palhoça, a Cena7 executa projetos especiais, bares com medidas customizadas, pórticos, painéis e novas coleções para grandes casamentos e ativações de marca.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#2E2E2B] bg-[#141413] p-4 space-y-2">
              <p className="text-xs font-semibold text-[#FAF8F5]">
                Ideal para projetos exclusivos:
              </p>
              <ul className="space-y-1.5 text-xs text-[#A1A1AA]">
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-[#C5A059]" />
                  <span>Bares em U, Ilhas orgânicas e Balcões espelhados</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-[#C5A059]" />
                  <span>Palhetas de pintura e tecidos sob encomenda</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="size-3.5 text-[#C5A059]" />
                  <span>Entrega e montagem técnica na Grande Florianópolis</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Pilar 3: Atendimento Prioritário B2B */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#C5A059]/40 bg-gradient-to-b from-[#1E1E1C] to-[#141413] p-7 space-y-6">
            <div className="space-y-4">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#C5A059] text-[#141413]">
                <MessageCircle className="size-6" aria-hidden="true" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
                  Canal Direto para Produtores
                </span>
                <h3 className="font-display text-2xl font-semibold text-[#FAF8F5]">
                  Atendimento Prioritário B2B
                </h3>
                <p className="text-sm text-[#D4D4D8] leading-relaxed">
                  Reserva ágil de estoque para múltiplas datas, condições especiais para recorrentes e pré-reserva técnica durante a aprovação do moodboard com os noivos ou cliente corporativo.
                </p>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <Button
                type="button"
                onClick={() => setPartnerModalOpen(true)}
                className="h-11 w-full rounded-xl bg-[#C5A059] text-xs font-semibold text-[#141413] hover:bg-[#FAF8F5] transition-colors gap-2 cursor-pointer"
              >
                <Compass className="size-4" aria-hidden="true" />
                <span>Abrir Parceria Comercial B2B</span>
              </Button>
              <a
                href={`https://wa.me/${CENA7_CONTACTS.whatsapp2Number}?text=${encodeURIComponent(
                  "Olá! Sou decorador(a)/cerimonialista e gostaria de atendimento prioritário B2B Cena7."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#3F3F3B] text-xs font-medium text-[#D4D4D8] hover:border-[#C5A059] hover:text-[#FAF8F5] transition-colors"
              >
                <span>Falar direto com Comercial 2 • {CENA7_CONTACTS.whatsapp2Display}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal do Caderno Técnico de Medidas */}
      <Dialog open={techSheetOpen} onOpenChange={setTechSheetOpen}>
        <DialogContent className="sm:max-w-4xl bg-[#FAF8F5] border-[#E5DEC9] text-[#18181B] rounded-2xl max-h-[85vh] flex flex-col">
          <DialogHeader>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              <Ruler className="size-3.5" aria-hidden="true" />
              <span>Especificação Técnica Cena7</span>
            </div>
            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B]">
              Caderno Técnico de Medidas ({productsWithDimensions.length} peças)
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#52525B]">
              Tabela consolidada com dimensões reais extraídas do acervo Cena7 para projetos em planta baixa e 3D.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap items-center justify-between gap-2 py-2 border-b border-[#E5DEC9]">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={handleDownloadTechnicalGuide}
                className="h-10 rounded-full bg-[#141413] px-5 text-xs font-semibold text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413] gap-1.5 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Baixar Planilha Técnica (.CSV / Excel)</span>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handlePrintTechnicalCatalog}
                className="h-10 rounded-full border-[#C5A059] px-5 text-xs font-semibold text-[#18181B] cursor-pointer"
              >
                <span>Imprimir / Salvar em PDF</span>
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto rounded-xl border border-[#E5DEC9] bg-white">
            <table className="w-full text-left text-xs">
              <thead className="sticky top-0 bg-[#F3EFE6] text-[11px] uppercase tracking-wider text-[#52525B] border-b border-[#E5DEC9]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Cód.</th>
                  <th className="px-4 py-3 font-semibold">Peça</th>
                  <th className="px-4 py-3 font-semibold">Categoria</th>
                  <th className="px-4 py-3 font-semibold text-right">Dimensões Reais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3EFE6]">
                {productsWithDimensions.map((item) => (
                  <tr key={item.id} className="hover:bg-[#FAF8F5]">
                    <td className="px-4 py-2.5 font-medium tabular-nums text-[#71717A]">
                      {item.id}
                    </td>
                    <td className="px-4 py-2.5 font-semibold text-[#18181B]">
                      {item.title}
                    </td>
                    <td className="px-4 py-2.5 text-[#52525B]">{item.category}</td>
                    <td className="px-4 py-2.5 text-right font-medium tabular-nums text-[#18181B]">
                      {formatDimensionsSummary(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Credenciamento Parceria B2B */}
      <Dialog open={partnerModalOpen} onOpenChange={setPartnerModalOpen}>
        <DialogContent className="sm:max-w-lg bg-[#FAF8F5] border-[#E5DEC9] text-[#18181B] rounded-2xl">
          <DialogHeader>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              Credenciamento Profissional
            </span>
            <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B]">
              Parceria B2B Cena7
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-[#52525B]">
              Informe seu escritório ou empresa de decoração para receber atendimento prioritário e acesso à biblioteca técnica.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPartner} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label
                htmlFor="b2b-studio-name"
                className="text-xs font-semibold text-[#18181B]"
              >
                Nome do Escritório / Profissional *
              </label>
              <Input
                id="b2b-studio-name"
                required
                value={studioName}
                onChange={(e) => setStudioName(e.target.value)}
                placeholder="Ex: Atelier Floripa Decorações"
                className="h-11 bg-white border-[#DFD7C5]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="b2b-role"
                  className="text-xs font-semibold text-[#18181B]"
                >
                  Atuação
                </label>
                <select
                  id="b2b-role"
                  value={professionalRole}
                  onChange={(e) => setProfessionalRole(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[#DFD7C5] bg-white px-3 text-sm text-[#18181B]"
                >
                  <option value="Decorador(a)">Decorador(a)</option>
                  <option value="Arquiteto(a)">Arquiteto(a)</option>
                  <option value="Cerimonialista">Cerimonialista</option>
                  <option value="Produtor(a) Corporativo">
                    Produtor(a) Corporativo
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="b2b-city"
                  className="text-xs font-semibold text-[#18181B]"
                >
                  Cidade Base
                </label>
                <Input
                  id="b2b-city"
                  value={cityName}
                  onChange={(e) => setCityName(e.target.value)}
                  placeholder="Florianópolis / SC"
                  className="h-11 bg-white border-[#DFD7C5]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="b2b-insta"
                className="text-xs font-semibold text-[#18181B]"
              >
                Instagram ou Site do Escritório
              </label>
              <Input
                id="b2b-insta"
                value={instagramRef}
                onChange={(e) => setInstagramRef(e.target.value)}
                placeholder="@seuescritorio"
                className="h-11 bg-white border-[#DFD7C5]"
              />
            </div>

            {submittedNotice && (
              <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-xs text-emerald-800">
                Solicitação estruturada! Caso o WhatsApp não tenha aberto automaticamente, verifique o bloqueador de pop-ups.
              </p>
            )}

            <Button
              type="submit"
              className="h-12 w-full rounded-full bg-[#141413] text-xs font-semibold uppercase tracking-widest text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413] gap-2 cursor-pointer"
            >
              <MessageCircle className="size-4" />
              <span>Enviar Credenciamento via WhatsApp B2B</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
