import type { Meta, StoryObj } from '@storybook/react';

import React, { useState } from 'react';
import InputText from './index';

const meta = {
  title: 'basic/InputText',
  component: InputText,
} satisfies Meta<typeof InputText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const index: Story = {
  args: {
    parentClasses:"field col-12 md:col-12",
    id:"InputText",
    label: 'InputText',
    value:"InputText"
  },
};

