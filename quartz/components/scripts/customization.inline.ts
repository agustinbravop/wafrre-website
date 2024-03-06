import { getStoredFavorites, registerEscapeHandler } from "./util";

document.addEventListener("nav", async () => {
  const customizationIcon = document.getElementById("customization-icon");
  const container = document.getElementById("customization-container");
  const sidebar = container?.closest(".sidebar") as HTMLElement;

  /** Muestra el menú de personalización. */
  function showCustomizationMenu() {
    if (container) {
      container.classList.add("open");
    }
    if (sidebar) {
      sidebar.style.zIndex = "1";
    }
  }

  /** Oculta el menú de personalización. */
  function hideCustomizationMenu() {
    if (container) {
      container.classList.remove("open");
    }
    if (sidebar) {
      sidebar.style.zIndex = "unset";
    }
  }

  customizationIcon?.addEventListener("click", showCustomizationMenu);
  window.addCleanup(() =>
    customizationIcon?.removeEventListener("click", showCustomizationMenu),
  );

  registerEscapeHandler(container, hideCustomizationMenu);
});

// JS para animar y controlar el toggle de materias favoritas.
document.addEventListener("nav", () => {
  const toggle = document.getElementById("favorites-explorer-toggle")!;
  const input = toggle.querySelector("input")!;
  const explorerUl = document.getElementById("explorer-ul")!;
  const isFiltering =
    localStorage.getItem("filterFavoritesExplorer") ?? "false";

  /** Solo muestra en el `Explorer` las materias favoritas del usuario. */
  function filterFavoritesExplorer() {
    toggle.classList.add("selected");
    input.setAttribute("selected", "selected");
    explorerUl.classList.add("filtered");

    const favorites = getStoredFavorites();
    const courses = explorerUl?.querySelectorAll("span.folder-title");

    courses.forEach((course) => {
      if (favorites.includes(course.textContent ?? "")) {
        course.classList.add("shown");
      }
    });
  }

  /** Vuelve a mostrar en el `Explorer` todas las materias. */
  function unfilterFavoritesExplorer() {
    toggle.classList.remove("selected");
    input.removeAttribute("selected");
    explorerUl.classList.remove("filtered");

    const favCourses = explorerUl?.querySelectorAll(".shown");

    favCourses.forEach((element) => {
      element.classList.remove("shown");
    });
  }

  // Consultar el estado guardado previamente.
  if (isFiltering === "true") {
    filterFavoritesExplorer();
  }

  // Listener para activar o desactivar filtro.
  toggle.addEventListener("click", () => {
    const isActive = toggle.classList.contains("selected");

    if (isActive) {
      localStorage.setItem("filterFavoritesExplorer", "false");
      unfilterFavoritesExplorer();
    } else {
      localStorage.setItem("filterFavoritesExplorer", "true");
      filterFavoritesExplorer();
    }
  });
});
