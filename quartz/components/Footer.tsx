import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "./types";
import style from "./styles/footer.scss";
import { version } from "../../package.json";
import { i18n } from "../i18n";
import { ARGENTINA_FLAG_SVG } from "./svgs/argentinaFlag";

interface Options {
  links: Record<string, string>;
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const year = new Date().getFullYear();
    const links = opts?.links ?? [];

    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        {/* MOD: Personalizo el footer. */}
        <div>
          <div>
            <p>{ARGENTINA_FLAG_SVG} Universidad Pública</p>
            <ul>
              <li>
                <a href={`https://${cfg.baseUrl}/wafrre-website`}>Inicio</a>
              </li>
              <li>
                <a href={`https://${cfg.baseUrl}/wafrre-website/Colaborar`}>
                  Colaborar
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p>
              {i18n(cfg.locale).components.footer.createdWith}{" "}
              <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> ©{" "}
              {year}
            </p>
            <ul>
              {Object.entries(links).map(([text, link]) => (
                <li>
                  <a href={link}>{text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    );
  };

  Footer.css = style;
  return Footer;
}) satisfies QuartzComponentConstructor;
