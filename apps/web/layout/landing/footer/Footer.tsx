import { getTranslations } from "next-intl/server"

export const Footer = async (): Promise<React.JSX.Element> => {
  const tFooter = await getTranslations("landing.footer")

  return (
    <footer className="border-t border-base-4 bg-base-1">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-4 py-6 md:px-10 lg:px-14">
        <a
          href="https://peiko.space/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-f14 text-main-6 text-center transition-colors hover:text-main-4"
        >
          {tFooter("rights")}
        </a>
      </div>
    </footer>
  )
}
