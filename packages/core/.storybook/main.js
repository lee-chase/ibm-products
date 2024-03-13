/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    '../../ibm-products/+(docs|src)/**/*+(-story|.stories).@(js|jsx|mjs|ts|tsx|mdx)',
    '../../ibm-products-community/+(docs|src)/**/*+(-story|.stories).@(js|jsx|mjs|ts|tsx|mdx)',
    '../+(docs|src)/**/*+(-story|.stories).@(js|jsx|mjs|ts|tsx|mdx)',
    '../+(docs|src)/**/*+(-story|.stories).@(js|jsx|mjs|ts|tsx|mdx)',
    // '../../../examples/**/*+(-story|.stories).@(js|jsx|mjs|ts|tsx|mdx)',
  ],

  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
};
export default config;
