import { render, screen } from '@testing-library/react';
import App from './App';

import { defaultSetting } from './App';

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/資格取得補助システム/i);
  // expect(linkElement).toBeInTheDocument();
  // expect(1).to.be.equal(1);
});

describe('Unit / App.js > defaultSetting', () => {
  console.log('defaultSetting: ' + defaultSetting);
  test('have tapMode', () => {
    expect(typeof defaultSetting.tapMode).toBe('boolean');
  });

  test('have toggle function', () => {
    expect(typeof defaultSetting.toggle).toBe('function');
  });

  test('can toggle boolean', () => {
    let beforeToggle = defaultSetting.tapMode;
    defaultSetting.toggle('tapMode');
    expect(defaultSetting.tapMode).toBe(!beforeToggle);
  });

  test('have change function', () => {
    expect(typeof defaultSetting.change).toBe('function');
  });

  test('can change boolean', () => {
    let beforeChange = defaultSetting.tapMode;
    defaultSetting.change('tapMode', !beforeChange);
    expect(defaultSetting.tapMode).toBe(!beforeChange);
  });
});
