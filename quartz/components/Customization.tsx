import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import { classNames } from "../util/lang";
// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline";
import darkmodeStyle from "./styles/darkmode.scss";
import Darkmode from "./Darkmode";
// @ts-ignore
import favoritesScript from "./scripts/favorites.inline";
import favoritesStyle from "./styles/favorites.scss";
import Favorites from "./Favorites";
// @ts-ignore
import script from "./scripts/customization.inline";
import style from "./styles/customization.scss";

export default (() => {
  const DarkmodeComponent = Darkmode();
  const FavoritesComponent = Favorites();

  const Customization: QuartzComponent = ({
    displayClass,
    ...props
  }: QuartzComponentProps) => {
    return (
      <div class={classNames(displayClass, "customization")}>
        <svg
          id="customization-icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          viewBox="0 0 482.568 482.568"
          xml:space="preserve"
        >
          <title>Personalización</title>
          <g>
            <g>
              <path d="M116.993,203.218c13.4-1.8,26.8,2.8,36.3,12.3l24,24l22.7-22.6l-32.8-32.7c-5.1-5.1-5.1-13.4,0-18.5s13.4-5.1,18.5,0    l32.8,32.8l22.7-22.6l-24.1-24.1c-9.5-9.5-14.1-23-12.3-36.3c4-30.4-5.7-62.2-29-85.6c-23.8-23.8-56.4-33.4-87.3-28.8    c-4.9,0.7-6.9,6.8-3.4,10.3l30.9,30.9c14.7,14.7,14.7,38.5,0,53.1l-19,19c-14.7,14.7-38.5,14.7-53.1,0l-31-30.9    c-3.5-3.5-9.5-1.5-10.3,3.4c-4.6,30.9,5,63.5,28.8,87.3C54.793,197.518,86.593,207.218,116.993,203.218z" />
              <path d="M309.193,243.918l-22.7,22.6l134.8,134.8c5.1,5.1,5.1,13.4,0,18.5s-13.4,5.1-18.5,0l-134.8-134.8l-22.7,22.6l138.9,138.9    c17.6,17.6,46.1,17.5,63.7-0.1s17.6-46.1,0.1-63.7L309.193,243.918z" />
              <path d="M361.293,153.918h59.9l59.9-119.7l-29.9-29.9l-119.8,59.8v59.9l-162.8,162.3l-29.3-29.2l-118,118    c-24.6,24.6-24.6,64.4,0,89s64.4,24.6,89,0l118-118l-29.9-29.9L361.293,153.918z" />
            </g>
          </g>
        </svg>

        <div id="customization-container">
          <div id="customization-menu">
            <h2>Personalización</h2>
            <div>
              <p>Modo</p>
              <DarkmodeComponent displayClass={displayClass} {...props} />
            </div>

            <div>
              <p>Materias favoritas</p>
              <FavoritesComponent displayClass={displayClass} {...props} />
            </div>
            <div>
              <p>Explorar solo materias favoritas</p>
              <div
                id="favorites-explorer-toggle"
                title="Explorar solo materias favoritas"
              >
                <svg
                  class="circle"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 47.94 47.94"
                  xml:space="preserve"
                >
                  <g stroke-width="0"></g>
                  <g stroke-linecap="round" stroke-linejoin="round"></g>
                  <g>
                    <path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></path>
                  </g>
                </svg>
                <input type="checkbox" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  Customization.afterDOMLoaded = script + darkmodeScript + favoritesScript;
  Customization.css = style + darkmodeStyle + favoritesStyle;

  return Customization;
}) satisfies QuartzComponentConstructor;
