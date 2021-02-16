const requestParams = '?results=12&inc=picture,name,email,location,cell,dob';
const myRequest = new Request(`https://randomuser.me/api/${requestParams}`, {
  method: 'GET',
  dataType: 'json',
});



const createEmployeeCell = (data) => {
  // console.log({ createEmployeeCell: data })
  const employeeCell = document.createElement('DIV');
  const employeeImageWrap = document.createElement('DIV');
  const employeeImageElement = document.createElement('IMG');
  const employeeInfoWrap = document.createElement('DIV');
  const employeeNameElement = document.createElement('P');
  const employeeEmailElement = document.createElement('P');
  const employeeLocationElement = document.createElement('P');

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

  return employeeCell;
};

const createEmployeeDirectory = (employeeData) => {
  console.log({ createEmployeeDirectory: employeeData });
  const employeeDirWrap = document.createElement('DIV');
  employeeData.forEach(data => {
    employeeDirWrap.appendChild(createEmployeeCell(data));
  });

  return employeeDirWrap;
}

const processEmployeeData = (data) => {
  console.log(data);
  const employeeData = data.results;
  const employeeDirWrap = document.getElementById('employeeDirectory');

  employeeDirWrap.appendChild(createEmployeeDirectory(employeeData));
}

fetch(myRequest)
  .then(response => response.json())
  .then(processEmployeeData)
  .catch((error) => {
    console.error('Error: ', error);
  });
