import React from "react";

export default function ShadowCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl shadow-2xl shadow-purple-500 p-3">
      {children}
    </div>
  );
}
