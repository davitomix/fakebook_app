import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const NoticeScan =  (() => {
  const noticeText = document.getElementById('notice');
  const alertText = document.getElementById('alert-content');

  const injectNoticeCont = () => {
    const noticeBox = document.createElement('div');
    noticeBox.classList.add('notice-box');
    noticeBox.id = 'notice-box';
    noticeBox.classList.add('d-none');
    noticeBox.appendChild(noticeText);
    body.prepend(noticeBox);
  };

  const injectAlertCont = () => {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-home');
    alertBox.id = 'alert-home';
    alertBox.classList.add('d-none');
    alertBox.appendChild(alertText);
    body.prepend(alertBox);
  };

  const scan = () => {
    const noticeBox = document.getElementById('notice-box');
    const alertBox = document.createElement('div');
    if(noticeText.innerText != '') {
      noticeBox.classList.remove('d-none');
    } else if(alertBox.innerText != '') {
      alertBox.classList.remove('d-none');
    }
  };

  return {
      injectNoticeCont,
      injectAlertCont,
      scan
  };
})();

const scanner = NoticeScan;

const start = (() => {
  scanner.injectNoticeCont();
  scanner.injectAlertCont();
  scanner.scan();
})();