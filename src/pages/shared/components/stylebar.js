import React from 'react';
import Avatar from '@atlaskit/avatar';
import { colors } from '@atlaskit/theme';

const HEIGHT = window.innerHeight + 10;

export default () => (<div style={
        {
            alignItems: 'center',
            position: 'fixed',
            backgroundColor: colors.B500,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 8px',
            width: '56px',
            height: `${HEIGHT}px`
        }
    }>
        <Avatar href="/home/home" size="medium" presence="online"></Avatar>
    </div>
);