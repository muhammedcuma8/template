import type { Meta, StoryObj } from '@storybook/react';

import Loading from './index';

const meta = {
  title: 'basic/Loading',
  component: Loading,
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const index: Story = {
  args: {
  },
};
