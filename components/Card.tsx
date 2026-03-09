import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-xl border bg-white/80 shadow-sm p-5">
      {title && <h3 className="text-base font-semibold mb-2">{title}</h3>}
      <div className="text-sm text-gray-700">{children}</div>
    </section>
  );
}
