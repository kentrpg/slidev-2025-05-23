import config from '@slidev/client/uno.config.ts'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import { mergeConfigs, presetWebFonts } from 'unocss'

export default mergeConfigs([
  config,
  {
    safelist: [
      'grid-rows-[max-content_1fr]',
      'code-mt',
    ],
    shortcuts: {
      'text-primary': 'text-hex-10b981',
      'title-primary': 'text-hex-10b981 font-bold',
    },
    presets: [
      presetWebFonts({
        fonts: {
          mono: 'DM Mono',
          sans: 'Noto Sans SC',
          strong: 'Rubik Iso',
          fast: 'Ubuntu',
          hand: 'Caveat',
        },
        processors: createLocalFontProcessor(),
      }),
    ],
    rules: [
      ['duration-slow', { 'transition-duration': '400ms !important' }],
      // 支援 grid-rows-[max-content_1fr] 加上 !important
      [/^grid-rows-\[(.+)\]$/, ([, d]) => ({
        'grid-template-rows': `${d.replace(/_/g, ' ')} !important`,
      })],
    ],
  },
])