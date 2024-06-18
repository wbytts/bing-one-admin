// 文档：https://unocss.dev
import {
  defineConfig,
  presetWind,
  presetMini,
  presetAttributify,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives,
  transformerCompileClass,
  transformerAttributifyJsx,
} from "unocss";

export default defineConfig({
  presets: [presetWind(), presetAttributify()],
  transformers: [
    transformerVariantGroup(),
    transformerDirectives(),
    transformerCompileClass(),
    transformerAttributifyJsx(),
  ],
});
