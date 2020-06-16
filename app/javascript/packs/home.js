const NoticeScan =  (() => {
  const noticeText = document.getElementById('notice');

  const injectNoticeCont = () => {
    const noticeBox = document.createElement('div');
    noticeBox.classList.add('notice-box');
    noticeBox.id = 'notice-box';
    noticeBox.classList.add('d-none');
    noticeBox.appendChild(noticeText);
    body.prepend(noticeBox);
  };

  const scan = () => {
    if(noticeText.innerText != '') {
      const noticeBox = document.getElementById('notice-box');
      noticeBox.classList.remove('d-none');
    }
  };

  return {
      injectNoticeCont,
      scan
  }
})();

const scanner = NoticeScan;

const start = (() => {
  scanner.injectNoticeCont();
  scanner.scan();
})();