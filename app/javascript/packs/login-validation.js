const FormChecker = (() => {
  const email = document.getElementById('user_email');
  const password = document.getElementById('user_password');
  const alertBox = document.getElementById('alert-content');


  const scanForm = () => {
    if(alertBox.innerText === '') {
      scanFocus(email, 'Email');
      scanKey(email, 'Email');
      scanFocus(password, 'Password');
      scanKey(password, 'Password');
    } else {
      scanItem(email, 'Email');
      scanKey(email, 'Email');
      scanItem(password, 'Password');
      scanKey(password, 'Password');
    }
  };

  const scanFocus = (item, itemStr) => {
    item.addEventListener('focus', (e) => {
      scanItem(item, itemStr);
    });
  };

  const scanKey = (item, itemStr) => {
    item.addEventListener('keydown', (e) => {
      scanItem(item, itemStr);
    });
  };

  const scanItem = (item, itemStr) => {
    const value = item.value.trim();
    switch(itemStr) {
      case 'Email':
        if(value === '') {
          setErrorFor(item, `${itemStr} cannot be blank`);
        }
        else if (!isEmail(value)) {
          setErrorFor(item, `Not a valid ${itemStr}`);
        } else {
          setSuccessFor(item);
        }
        break;
      case 'Password':
        if(value === '') {
          setErrorFor(item, `${itemStr} cannot be blank`);
        }
         else {
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
  }
})();
export default FormChecker;