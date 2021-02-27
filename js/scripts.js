MicroModal.init();

const requestParams = '?results=12&inc=picture,name,email,location,cell,dob&nat=us';
const myRequest = new Request(`https://randomuser.me/api/${requestParams}`, {
  method: 'GET',
  dataType: 'json',
});



const createEmployeeCell = (data, i) => {
  // console.log({ createEmployeeCell: data });
  const employeeCell = document.createElement('DIV');
  const employeeImageWrap = document.createElement('DIV');
  const employeeImageElement = document.createElement('IMG');
  const employeeInfoWrap = document.createElement('DIV');
  const employeeNameElement = document.createElement('P');
  const employeeEmailElement = document.createElement('P');
  const employeeLocationElement = document.createElement('P');

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
    MicroModal.show('modal-1');
    if ($('.slick-initialized').length) {
      $('.your-class').slick('slickGoTo', i, true);
    } else {
      $('.your-class').slick({
        dots: false,
        initialSlide: i
      });
    }
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

  employeeImageElement.src = data.picture.large;

  employeeNameElement.textContent = `${data.name.first} ${data.name.last}`;
  employeeEmailElement.textContent = data.email;
  employeeLocationElement.textContent = data.location.city;

  employeeNumber.textContent = data.cell;
  employeeAddress.textContent = `${data.location.street.number} ${data.location.street.name}, ${data.location.state} ${data.location.postcode}`;
  employeeBirthday.textContent = data.dob.date;

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
  console.log({ createEmployeeDirectory: employeeData });
  const employeeDirWrap = document.createElement('DIV');
  employeeData.forEach((data, i) => {
    employeeDirWrap.appendChild(createEmployeeCell(data, i));
  });

  return employeeDirWrap;
}

const createEmployeeCarousel = (employeeData) => {
  console.log({ createEmployeeCarousel: employeeData });
  const employeeCarousel = document.createElement('DIV');
  employeeCarousel.classList.add('your-class');
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

$('.test-slick').on('click', function() {
  console.log($('.your-class').slick('getSlick'));
});
