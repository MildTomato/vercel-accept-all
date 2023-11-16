import { sendToContentScript } from "@plasmohq/messaging"

function IndexPopup() {
  async function handleClick(command) {
    await sendToContentScript({ name: command })
  }

  async function approveAllVercelTabs() {
    chrome.tabs.query({}, function (tabs) {
      const authorizeTabs = tabs.filter((tab) =>
        tab.url.includes("https://vercel.com/git/authorize")
      )

      authorizeTabs.forEach((tab) => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            const authorizeButton = document.querySelector(
              "div.geist-wrapper > div > div > button"
            ) as HTMLButtonElement
            authorizeButton.click()
            setTimeout(() => {
              window.close()
            }, 2000)
          }
        })
      })
    })
  }

  return (
    <div style={{ width: "720px", fontFamily: "monospace", padding: "12px" }}>
      <h1 style={{ margin: "0" }}>vercel-accept-all</h1>
      <p>Approve all vercel deployments in 2 clicks</p>
      <p>Only works when viewing a Pull Request on GitHub</p>
      <div style={{ display: "flex", gap: "8px" }}>
        <button onClick={() => handleClick("openTabs")}>
          Open all authorization tabs
        </button>
        <button onClick={() => approveAllVercelTabs()}>
          Approve all Vercel tabs
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
