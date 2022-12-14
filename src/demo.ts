import { LqButton } from './LqButton';
import "../index.css";

const heightGradient = document.querySelector('#white').getBoundingClientRect().bottom - document.querySelector('#lq-button-submit').getBoundingClientRect().top

const button = new LqButton(
    document.querySelector('#lq-button-submit'),
    'Submit',
    true,
    0xff9300,
    0xFFFFFF,
    heightGradient,
    {size: 36, lineHeight: 44, fontFamily:  'Inter-SemiBold'},
    420,
    120,
);

