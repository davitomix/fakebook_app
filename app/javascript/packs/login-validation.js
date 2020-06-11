const FormChecker = (() => {
  const email = document.getElementById('user_email');
  const password = document.getElementById('user_password');
  const alertText = document.getElementById('alert-content');
  const body = document.getElementById('body');

  const injectAlertStyle = () => {
    const alertBox = document.createElement('div');
    alertBox.classList.add('alert-box');
    alertBox.id = 'alert-box';
    alertBox.classList.add('d-none');
    alertBox.appendChild(alertText);
    body.prepend(alertBox);
    console.log(alertText.parentElement);
  };

  const scanForm = () => {
    if(alertText.innerText === '') {
      scanFocus(email, 'Email');
      scanKey(email, 'Email');
      scanFocus(password, 'Password');
      scanKey(password, 'Password');
    } else {
      const alertBox = document.getElementById('alert-box');
      alertBox.classList.remove('d-none');
      scanItem(email, 'Email');
      scanKey(email, 'Email');
      scanItem(password, 'Password');
      scanKey(password, 'Password');
    }
  };

  const scanFocus = (item, itemStr) => {
    if (item != null) {
      item.addEventListener('focus', (e) => {
        scanItem(item, itemStr);
      });
    }
  };

  const scanKey = (item, itemStr) => {
    if (item != null) {
      item.addEventListener('keyup', (e) => {
        scanItem(item, itemStr);
      });
    }
  };

  const scanItem = (item, itemStr) => {
    const value = item.value.trim();
    const pass = password.value.trim();

    switch(itemStr) {
      case 'Email':
        if(value.length <= 0) {
          setErrorFor(item, `${itemStr} cannot be blank`);
        } else if (!isEmail(value)) {
          setErrorFor(item, 'Not a valid email');
        } else {
          setSuccessFor(item);
        }
        break;
      case 'Password':
        if(value.length <= 0) {
          setErrorFor(item, `${itemStr} cannot be blank`);
        } else {
          setSuccessFor(item);
        }
        break;
    };
  };

  const setErrorFor = (input, message) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
  };
  
  const setSuccessFor = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  };
    
  const isEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  };

  return {
    scanForm,
    injectAlertStyle
  };
})();

const checker = FormChecker;

const start = (() => {
  checker.injectAlertStyle();
  checker.scanForm();
})();