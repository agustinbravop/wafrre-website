import { addFavorite, getStoredFavorites, removeFavorite } from "./util";

document.addEventListener("nav", async () => {
  const favorites = document.getElementById("favorites")!;
  const select = document.getElementById("favorites-select")!;
  const list = document.getElementById("favorites-list")!;
  const selected = document.getElementById("favorites-selected")!;

  /** Elimina un nodo del DOM reduciendo su opacidad. */
  function removeWithFadeOut(element: HTMLElement) {
    const speed = 100;
    element.style.transition = `opacity ${speed}ms linear`;
    element.style.opacity = "0";
    setTimeout(() => element.remove(), speed);
  }

  /** Obtiene un elemento `<option>` de la lista del `<select>`. */
  function getOptionElement(datasetValue: string = "") {
    return select.querySelector(
      `option[value="${datasetValue}"]`,
    ) as HTMLOptionElement;
  }

  /**
   * Crea un `<span>` y lo concatena a la lista de opciones seleccionadas.
   * Elimina el `<li>` asociado de la lista de opciones sin seleccionar.
   */
  function selectOption(innerText: string, datasetValue: string = "") {
    const span = document.createElement("span");
    span.innerHTML = `${innerText}<i></i>`;
    span.dataset.value = datasetValue;
    selected.appendChild(span);

    // Se elimina su opción asociada.
    const li = list.querySelector(`li[data-value="${datasetValue}"]`);
    removeWithFadeOut(li as HTMLElement);

    // Se marca el `<option>` en el `<select>`.
    const opt = getOptionElement(span.dataset.value);
    opt.selected = true;

    // Listener en la cruz que deselecciona la opción y elimina el span.
    span.querySelector("i")!.addEventListener("click", () => {
      // Se deselecciona la `<option>` en el `<select>`.
      const opt = getOptionElement(span.dataset.value);
      opt.selected = false;
      removeFavorite(span.dataset.value);

      // Crea un `<li>` y lo concatena a la lista de opciones no seleccionadas.
      const li = document.createElement("li");
      li.dataset.value = span.dataset.value;
      li.innerText = span.innerText;
      list.appendChild(li);

      removeWithFadeOut(span);
    });

    return span;
  }

  // Maneja el seleccionar una opción de la lista.
  list.addEventListener("click", (e) => {
    // `<li>` de la opción seleccionada.
    const li = (e.target as HTMLElement)?.closest("li");
    if (!li) {
      return;
    }

    if (!list.classList.contains("clicked")) {
      // Evita que un doble click provoque una doble selección.
      list.classList.add("clicked");

      // Se crea el `<span>` y se lo agrega a la lista de seleccionados.
      const span = selectOption(li.innerText, li.dataset.value);
      addFavorite(li.dataset.value);

      setTimeout(() => {
        // Se elimina la opción seleccionable del listado del select.
        span.classList.add("shown");
        list.classList.remove("clicked");
      }, 100);
    }
  });

  // Desplegar u ocultar lista de opciones.
  document
    .querySelectorAll("#favorites .arrow, #favorites-select-wrapper")
    .forEach((el) => {
      el.addEventListener("click", () => {
        favorites.classList.toggle("open");
      });
    });

  // Crea un tag para todas las materias ya guardadas.
  // Por defecto todos los `<option>` están sin seleccionar.
  getStoredFavorites().forEach((fav) => {
    const option = getOptionElement(fav);
    if (option) {
      const span = selectOption(option.innerText, option.value);
      span.classList.add("shown");
    }
  });
});
