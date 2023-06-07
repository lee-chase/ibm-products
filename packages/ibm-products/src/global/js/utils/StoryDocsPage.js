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
  return blocks.map((block) => (
    <div key={block.title}>
      <h3>{block.title}</h3>
      {block.description}
      {block.story && <Canvas of={block.story} />}
      {block.source && <Source {...block.source} />}
    </div>
  ));
};

export const StoryDocsPage = ({
  blocks,
  altTitle, // uses the component name by default
  altDescription, // uses doc bloc comment prior to component by default
  componentName,
  guidelinesHref,
  hasCodedExample,
}) => {
  return (
    <>
      <Title>{altTitle}</Title>

      {guidelinesHref && (
        <AnchorMdx href={guidelinesHref}>
          About modal usage guidelines
        </AnchorMdx>
      )}

      <h2 style={{ marginTop: guidelinesHref ? '16px' : '' }}>
        Table of contents
      </h2>
      <ul>
        {['Overview', 'Coded Examples', 'Stories', 'Component API'].map(
          (item) => (
            <li key={item}>
              <AnchorMdx href={`#${_.kebabCase(item)}`}>{item}</AnchorMdx>
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

      <h2 id="stories">Example usage</h2>
      {blocks ? <CustomBlocks blocks={blocks} /> : <Stories />}

      <h2 id="component-api">Component API</h2>
      <Controls />
    </>
  );
};

StoryDocsPage.propTypes = {
  altDescription: PropTypes.node,
  altTitle: PropTypes.string,
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.node,
      story: PropTypes.func,
      source: PropTypes.shape({
        language: PropTypes.string,
        code: PropTypes.string,
      }),
    })
  ),
  componentName: PropTypes.string,
  guidelinesHref: PropTypes.string,
  hasCodedExample: PropTypes.bool,
};
