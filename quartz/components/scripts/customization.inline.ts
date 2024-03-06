import { registerEscapeHandler } from "./util";

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
