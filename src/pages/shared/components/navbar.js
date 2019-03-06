import React, { Component } from 'react';
import { colors } from '@atlaskit/theme';

import { SortableItem, SortableGroup, SortableContext } from '@atlaskit/navigation-next';

const CONTENT_NAV_WIDTH = window.innerWidth / 10;
const CONTENT_NAV_HEIGHT = window.innerHeight;

const SectionWrapper = (props: *) => (
  <div
    style={{
      backgroundColor: colors.N20,
      height: `${CONTENT_NAV_HEIGHT}px`,
      overflow: 'hidden',
      marginLeft: '57px',
      padding: '8px 16px',
      position: 'fixed',
      width: `${CONTENT_NAV_WIDTH}px`,
    }}
    {...props}
  />
);

const DEFAULT_ITEMS = [
  {
    id: 'dashboards',
    text: 'Feed',
    onClick: () => window.location.replace('/home/home'),
  },
  {
    id: 'projects',
    text: 'Create Post',
    onClick: () => window.location.replace('/home/create-post'),
  },
  {
    id: 'Follow People/Groups',
    text: 'Follow People',
    onClick: () => window.location.replace('/home/follow-people'),
  },
  {
    id: 'Follow Groups',
    text: 'Follow Groups',
    onClick: () => window.location.replace('/home/follow-groups'),
  },
  {
    id: 'logout',
    text: 'Logout',
    onClick: () => { window.localStorage.clear(); window.location.replace('/') }
  },
  {
    component: ({ children, className, draggableProps, innerRef }: *) => (
      <div className={className} to="/" {...draggableProps} ref={innerRef}>
        {children}
      </div>
    ),
    subText: "Pretend I'm a react-router <Link>",
    text: 'Custom component',
    id: 'custom-component',
  },
];

export default class NavBar extends Component<{}, State> {
  state = {
    groups: {
      first: (DEFAULT_ITEMS.slice(0, 5): typeof DEFAULT_ITEMS),
      second: (DEFAULT_ITEMS.slice(4, 10): typeof DEFAULT_ITEMS),
    },
    showContainer: true,
  };
  render() {
    const { groups } = this.state;
    return (
      <SectionWrapper>
        <SortableContext onDragEnd={this.onDragEnd}>
          <SortableGroup id="first" heading="Main">
            {groups.first.map((itemProps, i) => (
              <SortableItem key={itemProps.id} index={i} {...itemProps} />
            ))}
          </SortableGroup>
        </SortableContext>
      </SectionWrapper>
    );
  }
}