import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import {fade, darken} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#B54925',
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: '#2E8B57',
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: '#C7C7C7',
    alternateTextColor: darken('#C7C7C7',0.3),
    canvasColor: darken('#172E44', 0.3),
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: cyan500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
};