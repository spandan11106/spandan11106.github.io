import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Set up Explorer with custom sort function BEFORE loadQuartzConfig()
ExternalPlugin.Explorer({
  sortFn: (a: any, b: any) => {
    // 1. Look for the 'order' property in frontmatter. Default to 999 if missing.
    const orderA = (a.data?.order as number) ?? 999
    const orderB = (b.data?.order as number) ?? 999

    // 2. Sort by the order number if they differ
    if (orderA !== orderB) {
      return orderA - orderB
    }

    // 3. Fallback to alphabetical sorting if order is the same
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
    
    // 4. Always put folders above files
    return a.isFolder && !b.isFolder ? -1 : 1
  },
})

const config = await loadQuartzConfig()
export default config

export const layout = await loadQuartzLayout()
