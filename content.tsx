import { useMessage } from "@plasmohq/messaging/hook"

const openVercelLinks = () => {
  const vercelNames = [
    "Vercel – docs",
    "Vercel – studio",
    "Vercel – studio-self-hosted",
    "Vercel – studio-staging",
    "Vercel – zone-www-dot-com",
    "Vercel – database-new"
  ]
  const vercelItems = Array.from(
    document.body.querySelectorAll(".merge-status-list .merge-status-item")
  ).filter((item) =>
    vercelNames.some((name) => item.textContent.includes(name))
  )
  const hrefs = vercelItems.map(
    (item) => item.querySelector("a.status-actions")?.getAttribute("href")
  )

  console.log("hrefs: ", hrefs)
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
      // res.send({})
    }
  })
}

export default ContentScript
