import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'

import ActionBar from '../js/components/action_bar'

storiesOf('ActionBar', module)
.add('normal', () => <ActionBar />)
