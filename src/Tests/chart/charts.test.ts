import { screen } from '@testing-library/react';
import { IChartProps } from '../../Components/Chart/IChartProps';

const months = [2,6,3,5];
const total = [2,8,11,16];
let chartProps: IChartProps = {
monthlyTotals: months,
rollingTotal:total
}

test('renders something', () => {
    const div = document.createElement("div");
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
