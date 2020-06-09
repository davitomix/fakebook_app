const FormChecker = (() => {
  const email = document.getElementById('user_email');
  const password = document.getElementById('user_password');
  const passwordConfirmation = document.getElementById('user_password_confirmation');
  const errorExp = document.getElementById('error_explanation');


  const scanForm = () => {
    if(errorExp == null) {
      scanFocus(email, 'Email');
      scanKey(email, 'Email');
      scanFocus(password, 'Password');
      scanKey(password, 'Password');
      scanFocus(passwordConfirmation, 'PassConfirm');
      scanKey(passwordConfirmation, 'PassConfirm');
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
        } else if (value.length < 6) {
          setErrorFor(item, 'Password cannot be less than 6 characters');
        } else {
          setSuccessFor(item);
        }
        break;
      case 'PassConfirm':
        if(value.length <= 0) {
          setErrorFor(item, 'Password cannot be blank');
        } else if (value !== pass) {
          setErrorFor(item, 'Passwords does not match');
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
    scanForm
  };
})();

const checker = FormChecker;

const start = (() => {
  checker.scanForm();
})();