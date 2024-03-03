import { pathToRoot } from "../util/path";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import { classNames } from "../util/lang";
import { i18n } from "../i18n";
import { WAFRRE_ICON_SVG } from "./svgs/wafrreIcon";

const PageTitle: QuartzComponent = ({
  fileData,
  cfg,
  displayClass,
}: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title;
  const baseDir = pathToRoot(fileData.slug!);
  return (
    // MOD: Agrego icono SVG al título.
    <h1 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>
        {WAFRRE_ICON_SVG} {title}
      </a>
    </h1>
  );
};

PageTitle.css = `
.page-title {
  margin: 0;
}
`;

export default (() => PageTitle) satisfies QuartzComponentConstructor;
