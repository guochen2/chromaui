import { Notify } from 'quasar';
import swal from 'sweetalert2';

export function successtip(message: string) {
  Notify.create({
    message: message,
    position: 'top',
    color: 'green',
    icon: 'done',
    timeout: 4000,
  });
}
export function failtip(message: string) {
  Notify.create({
    message: message,
    position: 'top',
    color: 'red',
    icon: 'error',
    timeout: 3000,
  });
}
export function warningtip(message: string) {
  Notify.create({
    message: message,
    position: 'top',
    color: 'warning',
    icon: 'error',
    timeout: 3000,
  });
}
export function success(message: string) {
  void swal.fire(message, '', 'success');
}

export function fail(message: string) {
  void swal.fire(message, '', 'error');
}

export function warning(message: string) {
  void swal.fire(message, '', 'warning');
}
