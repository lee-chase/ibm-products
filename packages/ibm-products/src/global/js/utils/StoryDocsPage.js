/**
 * Copyright IBM Corp. 2023, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  Title,
  Description,
  Source,
  Controls,
  Canvas,
  Stories,
  AnchorMdx,
} from '@storybook/blocks';

import _ from 'lodash';

import { codeSandboxHref, stackblitzHref } from './story-helper';

export const CustomBlocks = ({ blocks }) => {
  return blocks.map((block) => {
    const source = { ...block?.source };
    if (source.code && !source.language) {
      source.language = 'jsx';
    }

    return (
      <div key={block.title}>
        {block.title && <h3 id={_.kebabCase(block.title)}>{block.title}</h3>}
        {block.subTitle && <h4>{block.subTitle}</h4>}
        {block.description && typeof block.description === 'string' ? (
          <Description>{block.description}</Description>
        ) : (
          block.description
        )}
        {block.story && (
          <Canvas className="docs-page__story" of={block.story} />
        )}
        {block.source && <Source {...source} />}
      </div>
    );
  });
};

export const StoryDocsPage = ({
  blocks,
  altTitle,
  altDescription,
  componentName,
  guidelinesHref,
  hasCodedExample,
}) => {
  const storyCount = blocks?.filter((block) => !!block.story).length ?? 0;

  return (
    <>
      <Title>{altTitle}</Title>

      {guidelinesHref && (
        <AnchorMdx href={guidelinesHref}>
          {componentName} usage guidelines
        </AnchorMdx>
      )}

      <h2 style={{ marginTop: guidelinesHref ? '16px' : '' }}>
        Table of contents
      </h2>
      <ul>
        {['Overview', 'Coded examples', 'Example usage', 'Component API'].map(
          (item) => (
            <li key={item}>
              <AnchorMdx href={`#${_.kebabCase(item)}`}>{item}</AnchorMdx>
              {blocks && item === 'Example usage' ? (
                <ul>
                  {blocks.map((block) => {
                    return block?.title ? (
                      <li key={block.title}>
                        <AnchorMdx href={`#${_.kebabCase(block.title)}`}>
                          {block.title}
                        </AnchorMdx>
                      </li>
                    ) : null;
                  })}
                </ul>
              ) : null}
            </li>
          )
        )}
      </ul>

      <h2 id="overview">Overview</h2>
      <Description>{altDescription}</Description>

      {hasCodedExample ? (
        <>
          <h2 id="coded-examples">Coded examples</h2>
          <p>
            Coded examples can be edited and are a great way to try out a
            component.
          </p>
          <ul>
            <li key="codesandbox">
              <AnchorMdx href={codeSandboxHref(componentName)}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: '16px',
                    width: '16px',
                    color: 'black',
                    boxShadow: '0 0 0 2px white',
                    marginRight: '8px',
                    verticalAlign: '-2px',
                  }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0h23.987v24H0V0Zm21.533 2.455v19.09H2.453V2.456h19.08Z"
                    fill="currentColor"
                  ></path>
                </svg>
                CodeSandbox
              </AnchorMdx>
            </li>
            <li key="stackblitz">
              <AnchorMdx href={stackblitzHref(componentName)}>
                <img
                  src="https://c.staticblitz.com/assets/favicon_sb-861fe1b85c0dc928750c62de15fed96fc75e57ee366bd937bad17a3938917b3f.svg"
                  alt="Stackblitz logo"
                  style={{ verticalAlign: '-2px', marginRight: '8px' }}
                />
                Stackblitz
              </AnchorMdx>
            </li>
          </ul>
        </>
      ) : null}

      <h2 id="example-usage">Example usage</h2>
      {blocks ? <CustomBlocks blocks={blocks} /> : <Stories />}

      <h2 id="component-api">Component API</h2>
      {storyCount > 1 && (
        <p>
          NOTE: Changing the controls below affects the first example shown on
          the docs page.
        </p>
      )}
      <Controls />
    </>
  );
};

StoryDocsPage.propTypes = {
  /**
   * Uses doc block from the component where identified.
   * If passed as string treated as markdown.
   */
  altDescription: PropTypes.node,
  /**
   * Uses component name by default
   */
  altTitle: PropTypes.string,
  /**
   * Array with content sections
   */
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Optional title (used as link in contents) a <h3>
       */
      title: PropTypes.string,
      /**
       * Optional subTitle a <h4>
       */
      subTitle: PropTypes.string,
      /**
       * Optional description, strings treated as markdown.
       */
      description: PropTypes.node,
      /**
       * Story imported from story file
       */
      story: PropTypes.func,
      /**
       * Some source code
       * default language `jsx`
       */
      source: PropTypes.shape({
        language: PropTypes.oneOf('javascript', 'css', 'jsx'),
        code: PropTypes.string,
      }),
    })
  ),
  componentName: PropTypes.string,
  /**
   * location if any of guidelines on the PAL site.
   */
  guidelinesHref: PropTypes.string,
  /**
   * Set to true if an example exists in the examples folder (ComponentName) matched
   */
  hasCodedExample: PropTypes.bool,
};
