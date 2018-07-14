import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ValidatonForm from "./components/validation-form"

storiesOf('Validation Hoc', module)
  .add('Validation Form', () => (
    <ValidatonForm/>
  ))