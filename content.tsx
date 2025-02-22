import { useMessage } from "@plasmohq/messaging/hook"

const openVercelLinks = () => {
  const vercelNames = [
    "Vercel – docs",
    "Vercel – studio",
    "Vercel – studio-self-hosted",
    "Vercel – studio-staging",
    "Vercel – zone-www-dot-com",
    "Vercel – database-new",
    "Vercel - design-system"
  ]
  const ariaLabelQueries = vercelNames.map((name) => `[aria-label^='${name}']`)
  const vercelItems = ariaLabelQueries
    .map((query) => document.body.querySelector(query))
    .filter(Boolean)
  const hrefs = vercelItems.map((item) =>
    item
      .querySelector("a[href^='https://vercel.com/git/authorize']")
      ?.getAttribute("href")
  )

  hrefs.forEach((href) => {
    if (href) {
      window.open(href, "_blank")
    }
  })

  return hrefs
}

const ContentScript = () => {
  useMessage<string, {}>(async (req, res) => {
    const { name } = req
    if (name === "openTabs") {
      openVercelLinks()
    }
  })
}

export default ContentScript
