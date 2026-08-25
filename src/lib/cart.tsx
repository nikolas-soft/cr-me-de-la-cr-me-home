import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductBySlug, type Product } from "../data/products";

export type CartLine = { slug: string; qty: number };

export const SHIPPING_FLAT = 18;
export const FREE_SHIPPING_MIN = 150;

export type Coupon = {
  code: string;
  label: string;
  description: string;
  type: "percent" | "shipping";
  value: number;
};

export const coupons: Coupon[] = [
  {
    code: "LACREME10",
    label: "10% de desconto",
    description: "10% de desconto em todo o pedido, sem valor mínimo.",
    type: "percent",
    value: 10,
  },
  {
    code: "FRETEGRATIS",
    label: "Frete grátis",
    description: `Frete grátis em pedidos acima de ${FREE_SHIPPING_MIN.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}.`,
    type: "shipping",
    value: FREE_SHIPPING_MIN,
  },
];

type CartContextValue = {
  lines: CartLine[];
  items: { product: Product; qty: number }[];
  count: number;
  add: (slug: string, qty?: number) => void;
  remove: (slug: string) => void;
  increment: (slug: string) => void;
  decrement: (slug: string) => void;
  clear: () => void;
  coupon: Coupon | null;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "lacreme-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lines?: CartLine[]; coupon?: string };
        if (Array.isArray(parsed.lines)) setLines(parsed.lines);
        if (parsed.coupon) {
          const found = coupons.find((c) => c.code === parsed.coupon);
          if (found) setCoupon(found);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, coupon: coupon?.code ?? null }));
    } catch {
      /* ignore */
    }
  }, [lines, coupon]);

  const value = useMemo<CartContextValue>(() => {
    const items = lines
      .map((l) => {
        const product = getProductBySlug(l.slug);
        return product ? { product, qty: l.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);

    const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
    const discount = coupon?.type === "percent" ? (subtotal * coupon.value) / 100 : 0;
    const afterDiscount = subtotal - discount;

    let shipping = 0;
    if (items.length > 0) {
      shipping = afterDiscount >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT;
      if (coupon?.type === "shipping" && afterDiscount >= coupon.value) shipping = 0;
    }

    return {
      lines,
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      add: (slug, qty = 1) =>
        setLines((prev) => {
          const found = prev.find((l) => l.slug === slug);
          if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { slug, qty }];
        }),
      remove: (slug) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
      increment: (slug) =>
        setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + 1 } : l))),
      decrement: (slug) =>
        setLines((prev) =>
          prev.flatMap((l) =>
            l.slug === slug ? (l.qty <= 1 ? [] : [{ ...l, qty: l.qty - 1 }]) : [l],
          ),
        ),
      clear: () => {
        setLines([]);
        setCoupon(null);
      },
      coupon,
      applyCoupon: (code) => {
        const normalized = code.trim().toUpperCase();
        if (!normalized) return { ok: false, message: "Digite um cupom." };
        const found = coupons.find((c) => c.code === normalized);
        if (!found) return { ok: false, message: `Cupom "${normalized}" inválido.` };
        if (coupon?.code === found.code) return { ok: false, message: "Este cupom já está aplicado." };
        if (found.type === "shipping" && subtotal < found.value) {
          return {
            ok: false,
            message: `O cupom ${found.code} vale para pedidos acima de ${found.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}.`,
          };
        }
        setCoupon(found);
        return { ok: true, message: `Cupom ${found.code} aplicado: ${found.label}.` };
      },
      removeCoupon: () => setCoupon(null),
      subtotal,
      discount,
      shipping,
      total: Math.max(0, afterDiscount + shipping),
    };
  }, [lines, coupon]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
