/*
** Note about the code
** While I am loading the jQuery library, I am only using it for a couple necessary
** pieces. This is because I have a fair amount of experience using jQuery and
** not very much with raw JavaScript. So I wanted to practice building this out
** with JS.
 */

MicroModal.init();

const requestParams = '?results=12&inc=picture,name,email,location,cell,dob&nat=us';
const myRequest = new Request(`https://randomuser.me/api/${requestParams}`, {
  method: 'GET',
  dataType: 'json',
});

const formatBirthday = (info) => {
  // console.log({ formatBirthday: info });
  const birthday = new Date(info);
  const dd = birthday.getDate();
  const mm = birthday.getMonth();
  const yy = birthday.getFullYear().toString().substr(-2);

  return mm+'/'+dd+'/'+yy;
}

const createEmployeeCell = (data, i) => {
  // console.log({ createEmployeeCell: data });
  const employeeCell = document.createElement('DIV');
  const employeeImageWrap = document.createElement('DIV');
  const employeeImageElement = document.createElement('IMG');
  const employeeInfoWrap = document.createElement('DIV');
  const employeeNameElement = document.createElement('P');
  const employeeEmailElement = document.createElement('P');
  const employeeLocationElement = document.createElement('P');

  employeeCell.classList.add('employee-cell');
  employeeImageWrap.classList.add('employee-cell__image-wrap');
  employeeImageElement.classList.add('employee-cell__img');
  employeeInfoWrap.classList.add('employee-cell__info');
  employeeNameElement.classList.add('employee-cell__info__name');
  employeeEmailElement.classList.add('employee-cell__info__email');
  employeeLocationElement.classList.add('employee-cell__info__location');

  employeeCell.dataset.indexNumber = i

  employeeImageElement.src = data.picture.large;

  employeeNameElement.textContent = `${data.name.first} ${data.name.last}`;
  employeeEmailElement.textContent = data.email;
  employeeLocationElement.textContent = data.location.city;

  employeeImageWrap.appendChild(employeeImageElement);
  employeeInfoWrap.appendChild(employeeNameElement);
  employeeInfoWrap.appendChild(employeeEmailElement);
  employeeInfoWrap.appendChild(employeeLocationElement);

  employeeCell.appendChild(employeeImageWrap);
  employeeCell.appendChild(employeeInfoWrap);

  employeeCell.addEventListener('click', (e) => {
    /* Remove slick when closed to prevent issues caused by restyling during window scaling */
    MicroModal.show('modal-1', {
      onClose: modal => {
        $('.employee-carousel').slick('unslick');
      }
    });

    $('.employee-carousel').slick({
      dots: false,
      initialSlide: i
    });
  });

  return employeeCell;
};

const createEmployeeSlide = (data) => {
  // console.log({ createEmployeeSlide: data });
  const employeeSlide = document.createElement('DIV');
  const employeeImageWrap = document.createElement('DIV');
  const employeeImageElement = document.createElement('IMG');
  const employeeInfoWrap = document.createElement('DIV');
  const employeeNameElement = document.createElement('P');
  const employeeEmailElement = document.createElement('P');
  const employeeLocationElement = document.createElement('P');
  const employeeContactWrap = document.createElement('DIV');
  const employeeNumber = document.createElement('P');
  const employeeAddress = document.createElement('P');
  const employeeBirthday = document.createElement('P');

  employeeSlide.classList.add('employee-slide');
  employeeImageWrap.classList.add('employee-slide__image-wrap');
  employeeImageElement.classList.add('employee-slide__img');
  employeeInfoWrap.classList.add('employee-slide__info');
  employeeNameElement.classList.add('employee-slide__info__name');
  employeeEmailElement.classList.add('employee-slide__info__email');
  employeeLocationElement.classList.add('employee-slide__info__location');
  employeeContactWrap.classList.add('employee-slide__contact');
  employeeNumber.classList.add('employee-slide__contact__number');
  employeeAddress.classList.add('employee-slide__contact__address');
  employeeBirthday.classList.add('employee-slide__contact__bday');

  employeeImageElement.src = data.picture.large;

  employeeNameElement.textContent = `${data.name.first} ${data.name.last}`;
  employeeEmailElement.textContent = data.email;
  employeeLocationElement.textContent = data.location.city;

  employeeNumber.textContent = data.cell;
  employeeAddress.textContent = `${data.location.street.number} ${data.location.street.name}, ${data.location.state} ${data.location.postcode}`;
  employeeBirthday.textContent = `Birthday: ${formatBirthday(data.dob.date)}`;

  employeeImageWrap.appendChild(employeeImageElement);
  employeeInfoWrap.appendChild(employeeNameElement);
  employeeInfoWrap.appendChild(employeeEmailElement);
  employeeInfoWrap.appendChild(employeeLocationElement);

  employeeContactWrap.appendChild(employeeNumber);
  employeeContactWrap.appendChild(employeeAddress);
  employeeContactWrap.appendChild(employeeBirthday);

  employeeSlide.appendChild(employeeImageWrap);
  employeeSlide.appendChild(employeeInfoWrap);
  employeeSlide.appendChild(employeeContactWrap);

  return employeeSlide;
}

const createEmployeeDirectory = (employeeData) => {
  // console.log({ createEmployeeDirectory: employeeData });
  const employeeDirWrap = document.createElement('DIV');
  employeeDirWrap.classList.add('directory-wrap');
  employeeData.forEach((data, i) => {
    const directoryCell = document.createElement('DIV');
    directoryCell.classList.add('directory-wrap__cell');
    directoryCell.appendChild(createEmployeeCell(data, i))
    employeeDirWrap.appendChild(directoryCell);
  });

  return employeeDirWrap;
}

const createEmployeeCarousel = (employeeData) => {
  // console.log({ createEmployeeCarousel: employeeData });
  const employeeCarousel = document.createElement('DIV');
  employeeCarousel.classList.add('employee-carousel');
  employeeData.forEach((data, i) => {
    employeeCarousel.appendChild(createEmployeeSlide(data));
  });

  return employeeCarousel;
}

const processEmployeeData = (data) => {
  // console.log({ processEmployeeData: data });
  const employeeData = data.results;
  const employeeDirWrap = document.getElementById('employeeDirectory');
  const employeeModal = document.getElementById('modal-1-content');
  const employeeFilter = document.getElementById('employee_filter');

  employeeDirWrap.appendChild(createEmployeeDirectory(employeeData));
  employeeModal.appendChild(createEmployeeCarousel(employeeData));

  employeeFilter.addEventListener('keyup', function(e) {
    const inputValue = this.value;
    const filteredData = employeeData.filter(employee => {
      const employeeName = `${employee.name.first} ${employee.name.last}`;
      if (employeeName.toLowerCase().startsWith(inputValue.toLowerCase())) {
        return true;
      }
    });

    employeeDirWrap.innerHTML = '';
    employeeModal.innerHTML = '';
    if (this.value !== '') {
      employeeDirWrap.appendChild(createEmployeeDirectory(filteredData));
      employeeModal.appendChild(createEmployeeCarousel(filteredData));
    } else {
      employeeDirWrap.appendChild(createEmployeeDirectory(employeeData));
      employeeModal.appendChild(createEmployeeCarousel(employeeData));
    }
  });
}

fetch(myRequest)
  .then(response => response.json())
  .then(processEmployeeData)
  .catch((error) => {
    console.error('Error: ', error);
  });
