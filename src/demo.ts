import { LqButton } from './LqButton';

const button = new LqButton(
    document.querySelector('#lq-button-submit'),
    'hi',
    false,
    0xAAFFBB,
    0x000000
);

button.setText('hello');
