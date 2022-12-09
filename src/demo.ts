import { LqButton } from './LqButton';
import "../index.css";

const heightGradient = document.querySelector('#white').getBoundingClientRect().bottom - document.querySelector('#lq-button-submit').getBoundingClientRect().top

let FontFaceObserver = require('fontfaceobserver');
let font = new FontFaceObserver('Inter-SemiBold');

font.load()

const button = new LqButton(
    document.querySelector('#lq-button-submit'),
    'Submit',
    false,
    0xff9300,
    0xFFFFFF,
    heightGradient,
    {size: 36, lineHeight: 44, fontFamily:  'Inter-SemiBold'},
    330,
    100,
);

