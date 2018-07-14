export function displayName(Comp) {
  return Comp.displayName || Comp.name || "Component"
}