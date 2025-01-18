import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import MultiSelect from './index';
const cities = [
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
];
const meta = {
  title: 'basic/MultiSelect',
  component: MultiSelect,
  argTypes: { options: cities ,
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const index: Story = {
  args: {
    options: cities ,
    parentClasses:"field col-12 md:col-12",
    id:"MultiSelect",
    label: 'MultiSelect',
    value:""
  },
};

