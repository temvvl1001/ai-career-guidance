import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <section className="rounded-xl border border-dark-700 bg-dark-900 shadow-sm p-5">
      {title && <h3 className="text-base font-semibold mb-2 text-dark-100">{title}</h3>}
      <div className="text-sm text-dark-300">{children}</div>
    </section>
  );
}
