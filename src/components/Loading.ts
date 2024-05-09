import { size } from 'lodash';
import { Loading, QSpinnerBars, QSpinnerDots, QSpinnerBall } from 'quasar';

export function show(message?: string) {
  const options = {
    spinner: QSpinnerBars as any,
    spinnerColor: 'primary',
    backgroundColor: 'grey-2',
    messageColor: 'primary',
    message: '',
    spinnerSize: 120,
  };
  if (!message) {
    Loading.show(options);
  } else {
    options.message = message;
    Loading.show(options);
  }
}
export function showpic(message?: string) {
  const options = {
    spinner: QSpinnerDots as any,
    spinnerColor: 'primary',
    backgroundColor: 'grey-2',
    messageColor: 'primary',
    message: '',
  };
  if (!message) {
    Loading.show(options);
  } else {
    options.message = message;
    Loading.show(options);
  }
}

export function hide() {
  Loading.hide();
}
