// 文档：https://unocss.dev
import {
  defineConfig,
  presetWind,
  presetMini,
  presetUno,
  presetTypography,
  presetAttributify,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives,
  transformerCompileClass,
  transformerAttributifyJsx,
} from "unocss";
import presetTagify from "@unocss/preset-tagify";
import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [
    presetUno(),
    presetTypography({
      selectorName: "prose", // 默认值 prose
    }),
    presetWind({
      important: false, // 默认值 false
    }),
    presetRemToPx({
      baseFontSize: 16, // 默认值 16px, 1rem = 多少px
    }),
    presetAttributify({
      prefix: "un-", // 默认值 un-
      prefixedOnly: false, // 默认值 false
    }),
    presetTagify({
      prefix: "un-", // 前缀, 默认值 un-
      // 排除的标签
      excludedTags: ["b"],
      // 为匹配的规则注入额外的属性
      extraProperties: (matched) => {
        if (matched.startsWith("i-")) {
          return { display: "inline-block" };
        }
        return {};
      },
      defaultExtractor: true, // 默认值 true
    }),
  ],
  transformers: [
    transformerAttributifyJsx({
      // 拦截列表
      blocklist: [],
      // 包含列表, 默认值 [/\.[jt]sx$/, /\.mdx$/]
      include: [/\.[jt]sx$/, /\.mdx$/],
      // 排除列表
      exclude: []
    }),
    transformerVariantGroup(),
    transformerDirectives(),
    transformerCompileClass(),
  ],
});
