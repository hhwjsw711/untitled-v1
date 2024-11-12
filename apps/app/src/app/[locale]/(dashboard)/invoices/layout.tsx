"use client";

import { I18nProviderClient } from "@/locales/client";

const LayoutContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full px-6 py-8">
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col gap-6">
        {children}
      </div>
    </div>
  );
};

export default function Layout({
  children,
  params,
}: { children: React.ReactNode; params: { locale: string } }) {
  return (
    <I18nProviderClient locale={params.locale}>
      <LayoutContainer>{children}</LayoutContainer>
    </I18nProviderClient>
  );
}
