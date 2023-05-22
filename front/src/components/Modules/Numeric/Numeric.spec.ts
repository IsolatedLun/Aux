import { act, render } from '@testing-library/svelte';
import 'jest';
import Numeric from './Numeric.svelte';

test('Render a numeric that is 158890 => 158.89k', () => {
	const { getByText } = render(Numeric, { props: { value: 158890 } });

	expect(getByText('158.89k')).toBeTruthy();
});
