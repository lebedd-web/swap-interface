import { ROUTES } from "@/constants/routes"
import { getTranslations } from "next-intl/server"

import { ButtonFilledLink } from "@/components/Button/ButtonFilledLink"

export default async function NotFound(): Promise<React.JSX.Element> {
  const t = await getTranslations("notFound")

  return (
    <main className="relative min-h-screen overflow-hidden bg-base-1 px-4 py-6 md:py-10">
      <div
        className="pointer-events-none absolute -top-24 -left-16 h-72 w-72 rounded-full bg-main-1/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-main-2/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1400px] flex-col">
        <div className="flex flex-1 items-center justify-center py-10">
          <section className="relative w-full max-w-[880px] overflow-hidden rounded-[24px] border border-base-3 bg-base-2/80 p-6 md:p-12">
            <div
              className="pointer-events-none absolute top-0 right-0 h-28 w-28 rounded-bl-[40px] border-l border-b border-main-1/20"
              aria-hidden="true"
            />

            <p className="font-f12 uppercase tracking-[0.14em] text-main-5">
              {t("label")}
            </p>

            <div className="mt-4 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-f1 text-[68px] leading-none text-main-1 md:text-[96px]">
                  404
                </p>
                <h1 className="mt-3 font-f2 text-main-3">{t("title")}</h1>
                <p className="mt-3 max-w-[560px] font-f9 text-main-7">
                  {t("description")}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonFilledLink
                href={ROUTES.HOME}
                size="big"
                className="w-full sm:w-auto"
              >
                {t("primaryCta")}
              </ButtonFilledLink>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
