import { QuartzPluginData } from "../plugins/vfile";
// @ts-ignore
import favoritesScript from "./scripts/favorites.inline";
import styles from "./styles/favorites.scss";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";

/** Obtiene los nombres de todas las materias de la wiki. */
function getAllCourseNames(allFiles: QuartzPluginData[]) {
  const courses: string[] = [];

  allFiles.forEach((file) => {
    if (file.filePath?.includes("index.md")) {
      // Ejemplo: wafrre/isi/nivel-1/sistemas-y-organizaciones/index.md
      if (file.filePath?.match(".+/.+/.+/.+/index.md")) {
        // Debería tener título pero no está asegurado.
        if (file.frontmatter?.title) {
          courses.push(file.frontmatter.title);
        }
      }
    }
  });

  return courses;
}

const Favorites: QuartzComponent = ({ allFiles }: QuartzComponentProps) => {
  const courses = getAllCourseNames(allFiles).sort();
  return (
    <div id="favorites">
      <div id="favorites-control">
        <div id="favorites-select-wrapper">
          Agregar materias
          <select multiple id="favorites-select">
            {courses.map((course) => (
              <option value={course}>{course}</option>
            ))}
          </select>
        </div>
        <span class="arrow"></span>
      </div>
      <ul id="favorites-list">
        {courses.map((course) => (
          <li data-value={course}>{course}</li>
        ))}
      </ul>
      <div id="favorites-selected"></div>
    </div>
  );
};

Favorites.beforeDOMLoaded = favoritesScript;
Favorites.css = styles;

export default (() => Favorites) satisfies QuartzComponentConstructor;
