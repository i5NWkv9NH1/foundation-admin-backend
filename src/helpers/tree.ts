// @ts-nocheck
export function buildTree(items) {
  const itemMap = new Map()

  // Initialize the map with each item
  items.forEach((item) => {
    item.children = []
    itemMap.set(item.id, item)
  })

  const tree = []

  // Iterate over the items and add them to their parent
  items.forEach((item) => {
    if (item.parentId === null) {
      // Root node
      tree.push(item)
    } else {
      // Child node, add it to its parent's children array
      const parent = itemMap.get(item.parentId)
      if (parent) {
        parent.children.push(item)
      }
    }
  })

  return tree
}
