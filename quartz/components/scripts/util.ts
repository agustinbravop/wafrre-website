export function registerEscapeHandler(
  outsideContainer: HTMLElement | null,
  cb: () => void,
) {
  if (!outsideContainer) return;
  function click(this: HTMLElement, e: HTMLElementEventMap["click"]) {
    if (e.target !== this) return;
    e.preventDefault();
    cb();
  }

  function esc(e: HTMLElementEventMap["keydown"]) {
    if (!e.key.startsWith("Esc")) return;
    e.preventDefault();
    cb();
  }

  outsideContainer?.addEventListener("click", click);
  window.addCleanup(() =>
    outsideContainer?.removeEventListener("click", click),
  );
  document.addEventListener("keydown", esc);
  window.addCleanup(() => document.removeEventListener("keydown", esc));
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

// MOD: para reutilizar código de materias favoritas.
/** Devuelve los nombres de las materias favoritas del usuario en localStorage. */
export function getStoredFavorites(): string[] {
  const parsed = JSON.parse(localStorage.getItem("favorites") ?? "[]");
  if (!Array.isArray(parsed)) {
    return [];
  }
  return parsed;
}

/** Agrega una materia a las materias favoritas en localStorage. */
export function addFavorite(fav: string = "") {
  const favs = getStoredFavorites();
  favs.push(fav);
  localStorage.setItem("favorites", JSON.stringify(favs));
}

/** Elimina una materia del las materias favoritas en localStorage. */
export function removeFavorite(fav: string = "") {
  const favs = getStoredFavorites();
  const index = favs.indexOf(fav);
  if (index !== -1) {
    favs.splice(index, 1);
  }
  localStorage.setItem("favorites", JSON.stringify(favs));
}
