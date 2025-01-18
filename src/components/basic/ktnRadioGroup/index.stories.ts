import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import RadioButton from './index';
const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
];
const meta = {
  title: 'basic/RadioButton',
  component: RadioButton,
  argTypes: {
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const index: Story = {
  args: {
    options: cities ,
    parentClasses:"field col-12 md:col-12",
    id:"RadioButton",
    label: 'RadioButton',
    value:'NY'
  },
};

