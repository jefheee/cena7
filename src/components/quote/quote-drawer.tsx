"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Check,
  Copy,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useQuoteCart } from "@/context/quote-cart-context";
import {
  CENA7_CONTACTS,
  GRANDE_FLORIANOPOLIS_CITIES,
  formatDimensionsSummary,
} from "@/lib/catalog";
import type { EventType } from "@/types/catalog";

const EVENT_TYPES: readonly EventType[] = [
  "Casamento",
  "Corporativo",
  "Formatura",
  "Aniversário",
  "Outros",
] as const;

export function QuoteDrawer() {
  const {
    items,
    totalDistinctItems,
    totalUnits,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useQuoteCart();

  const [customerName, setCustomerName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventCity, setEventCity] = useState<string>("Florianópolis");
  const [eventVenue, setEventVenue] = useState("");
  const [eventType, setEventType] = useState<EventType>("Casamento");
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const formattedDate = useMemo(() => {
    if (!eventDate) return "A definir";
    const [y, m, d] = eventDate.split("-");
    if (!y || !m || !d) return eventDate;
    return `${d}/${m}/${y}`;
  }, [eventDate]);

  const whatsappMessage = useMemo(() => {
    const lines: string[] = [
      "Olá, equipe *Cena7 Móveis e Eventos*! Gostaria de solicitar disponibilidade e orçamento para a seleção abaixo:",
      "",
      `*Solicitante / Decorador:* ${customerName.trim() || "Não informado"}`,
      `*Tipo de Evento:* ${eventType}`,
      `*Data do Evento:* ${formattedDate}`,
      `*Cidade / Local:* ${eventCity}${eventVenue.trim() ? ` (${eventVenue.trim()})` : ""}`,
      "",
      `*Peças Selecionadas (${totalDistinctItems} itens • ${totalUnits} unidades):*`,
    ];

    items.forEach((entry, index) => {
      const dims = formatDimensionsSummary(entry.product);
      lines.push(
        `${index + 1}. *${entry.quantity}x* ${entry.product.title} _(Cód. ${entry.product.id})_${dims ? ` — ${dims}` : ""}`
      );
    });

    lines.push("");
    lines.push("Aguardo o retorno com a confirmação de disponibilidade e valores. Obrigado!");
    return lines.join("\n");
  }, [
    customerName,
    eventType,
    formattedDate,
    eventCity,
    eventVenue,
    items,
    totalDistinctItems,
    totalUnits,
  ]);

  const handleSendWhatsApp = (phone: string) => {
    if (items.length === 0) {
      setFormError("Adicione ao menos uma peça do acervo antes de enviar a cotação.");
      return;
    }
    if (!customerName.trim()) {
      setFormError("Informe seu nome, empresa ou nome do decorador responsável.");
      return;
    }
    setFormError(null);
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCopyList = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback ignored
    }
  };

  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg bg-[#FAF8F5] border-l border-[#E5DEC9] p-0 flex flex-col"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-[#E5DEC9] bg-[#F3EFE6]/70">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
            <Sparkles className="size-3.5" aria-hidden="true" />
            <span>Atendimento Consultivo Cena7</span>
          </div>
          <SheetTitle className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B] tracking-tight">
            Minha Lista de Cotação
          </SheetTitle>
          <SheetDescription className="text-xs text-[#52525B] flex items-center justify-between">
            <span>
              <strong className="text-[#18181B] tabular-nums">{totalDistinctItems}</strong>{" "}
              {totalDistinctItems === 1 ? "peça selecionada" : "peças selecionadas"} (
              <span className="tabular-nums">{totalUnits}</span> unidades)
            </span>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] text-[#71717A] hover:text-[#E63946] underline underline-offset-4 transition-colors cursor-pointer"
              >
                Limpar lista
              </button>
            )}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#D6CCB8] bg-[#F3EFE6]/50 p-8 text-center space-y-3">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-[#141413] text-[#C5A059]">
                <ShoppingBag className="size-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-semibold text-[#18181B]">
                Sua lista de cotação está vazia
              </h3>
              <p className="text-sm text-[#52525B] leading-relaxed">
                Explore os lançamentos autorais e as 9 categorias do nosso acervo em Palhoça para montar sua proposta personalizada.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setIsDrawerOpen(false);
                  document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="mt-2 h-11 rounded-full bg-[#141413] px-6 text-xs uppercase tracking-widest text-[#FAF8F5] hover:bg-[#27272A]"
              >
                Explorar Acervo
              </Button>
            </div>
          ) : (
            <ul className="space-y-3" aria-label="Peças na lista de cotação">
              {items.map(({ product, quantity }) => {
                const dims = formatDimensionsSummary(product);
                return (
                  <li
                    key={product.id}
                    className="flex gap-3.5 rounded-xl border border-[#E5DEC9] bg-white p-3 shadow-xs transition-colors"
                  >
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-[#F3EFE6]">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                            {product.category} • Cód. {product.id}
                          </span>
                          <h4 className="text-sm font-semibold text-[#18181B] truncate">
                            {product.title}
                          </h4>
                          {dims && (
                            <p className="text-[11px] text-[#71717A] tabular-nums truncate">
                              {dims}
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`Remover ${product.title}`}
                          className="flex size-8 shrink-0 items-center justify-center rounded-md text-[#71717A] hover:bg-[#E63946]/10 hover:text-[#E63946] transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="inline-flex items-center rounded-lg border border-[#E5DEC9] bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label={`Diminuir quantidade de ${product.title}`}
                            className="flex size-8 items-center justify-center text-[#18181B] hover:bg-[#F3EFE6] rounded-l-lg cursor-pointer"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-xs font-semibold tabular-nums text-[#18181B]">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label={`Aumentar quantidade de ${product.title}`}
                            className="flex size-8 items-center justify-center text-[#18181B] hover:bg-[#F3EFE6] rounded-r-lg cursor-pointer"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-1">
                          {[2, 4, 10].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => updateQuantity(product.id, preset)}
                              className={`px-2 py-1 rounded text-[10px] font-medium tabular-nums transition-colors cursor-pointer ${
                                quantity === preset
                                  ? "bg-[#141413] text-[#FAF8F5]"
                                  : "bg-[#F3EFE6] text-[#52525B] hover:bg-[#E5DEC9]"
                              }`}
                            >
                              {preset}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <Separator className="bg-[#E5DEC9]" />

          {/* 4 Campos Rápidos Obrigatórios para Cotação */}
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-xl font-semibold text-[#18181B]">
                Dados do Evento para Disponibilidade
              </h3>
              <p className="text-xs text-[#52525B]">
                Preencha os dados abaixo para gerar a solicitação formatada no WhatsApp comercial.
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="quote-customer-name"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#18181B]"
                >
                  <User className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                  Nome / Empresa ou Decorador *
                </label>
                <Input
                  id="quote-customer-name"
                  value={customerName}
                  onChange={(e) => {
                    setCustomerName(e.target.value);
                    if (formError) setFormError(null);
                  }}
                  placeholder="Ex: Studio Flora Decorações / Maria Clara"
                  className="h-11 bg-white border-[#DFD7C5] text-[#18181B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-event-date"
                    className="flex items-center gap-1.5 text-xs font-medium text-[#18181B]"
                  >
                    <Calendar className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                    Data do Evento
                  </label>
                  <Input
                    id="quote-event-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="h-11 bg-white border-[#DFD7C5] text-[#18181B]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="quote-event-type"
                    className="text-xs font-medium text-[#18181B] block"
                  >
                    Tipo de Evento
                  </label>
                  <select
                    id="quote-event-type"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as EventType)}
                    className="h-11 w-full rounded-lg border border-[#DFD7C5] bg-white px-3 text-sm text-[#18181B] outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30"
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="quote-event-city"
                  className="flex items-center gap-1.5 text-xs font-medium text-[#18181B]"
                >
                  <MapPin className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                  Local / Cidade do Evento
                </label>
                <select
                  id="quote-event-city"
                  value={eventCity}
                  onChange={(e) => setEventCity(e.target.value)}
                  className="h-11 w-full rounded-lg border border-[#DFD7C5] bg-white px-3 text-sm text-[#18181B] outline-none focus:border-[#C5A059] focus:ring-2 focus:ring-[#C5A059]/30"
                >
                  {GRANDE_FLORIANOPOLIS_CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <Input
                  value={eventVenue}
                  onChange={(e) => setEventVenue(e.target.value)}
                  placeholder="Opcional: nome do espaço, casa de festas ou bairro"
                  aria-label="Nome do espaço ou bairro do evento"
                  className="h-10 bg-white border-[#DFD7C5] text-xs text-[#18181B]"
                />
              </div>
            </div>

            {formError && (
              <p
                role="alert"
                className="rounded-lg border border-[#E63946]/30 bg-[#E63946]/10 px-3 py-2 text-xs font-medium text-[#B91C1C]"
              >
                {formError}
              </p>
            )}
          </div>
        </div>

        {/* Rodapé fixo de envio para Comercial 1 ou Comercial 2 */}
        <div className="border-t border-[#E5DEC9] bg-white px-6 py-4 space-y-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#52525B]">
            Solicitar Disponibilidade pelo WhatsApp
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <Button
              type="button"
              onClick={() => handleSendWhatsApp(CENA7_CONTACTS.whatsapp1Number)}
              className="h-12 rounded-xl bg-[#141413] text-[#FAF8F5] hover:bg-[#27272A] gap-2 text-xs font-semibold cursor-pointer"
            >
              <MessageCircle className="size-4 text-[#C5A059]" aria-hidden="true" />
              <span className="flex flex-col items-start leading-tight">
                <span>Comercial 1</span>
                <span className="text-[10px] font-normal text-[#D4D4D8] tabular-nums">
                  {CENA7_CONTACTS.whatsapp1Display}
                </span>
              </span>
            </Button>

            <Button
              type="button"
              onClick={() => handleSendWhatsApp(CENA7_CONTACTS.whatsapp2Number)}
              variant="outline"
              className="h-12 rounded-xl border-[#C5A059] bg-[#FAF8F5] text-[#141413] hover:bg-[#F3EFE6] gap-2 text-xs font-semibold cursor-pointer"
            >
              <MessageCircle className="size-4 text-[#C5A059]" aria-hidden="true" />
              <span className="flex flex-col items-start leading-tight">
                <span>Comercial 2</span>
                <span className="text-[10px] font-normal text-[#52525B] tabular-nums">
                  {CENA7_CONTACTS.whatsapp2Display}
                </span>
              </span>
            </Button>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={handleCopyList}
              className="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-[#52525B] hover:text-[#18181B] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-600" />
                  Lista formatada copiada!
                </>
              ) : (
                <>
                  <Copy className="size-3.5" />
                  Copiar lista formatada em texto
                </>
              )}
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
