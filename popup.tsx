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
    <div style={{ width: "720px" }}>
      <h1>Vercel Deployment SupaAuthorizer</h1>
      <button onClick={() => handleClick("openTabs")}>Get links</button>
      <button onClick={() => approveAllVercelTabs()}>
        Approve all Vercel tabs
      </button>
    </div>
  )
}

export default IndexPopup
