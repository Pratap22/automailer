const sendMail = require('./nodeMailertest');
const data = require('./data');
const tempelateReader = require('./tempelateReader');

const createRow = item => `
  <tr>
    <td>${item.invoiceId}</td>
    <td>${item.invoiceName}</td>
    <td>${item.price}</td>
    <td>${item.createdDate}</td>
    <td>${item.dueDate}</td>
    <td>${item.address}</td>
    <td>${item.companyName}</td>
  </tr>
`;

const createTable = rows => `
  <table>
    <tr>
        <th>Invoice Id</td>
        <th>Invoice Name</td>
        <th>Price</td>
        <th>Invoice Created</td>
        <th>Due Date</td>
        <th>Vendor Address</td>
        <th>Vendor Name</td>
    </tr>
    ${rows}
  </table>
`;

/* generate rows */
const rows = data.map(createRow).join('');
/* generate table */
const table = createTable(rows);

const callBackFunc = (data, err) => {
  if (err) {
    console.log('Error ', data);
  } else {
    console.log('Success ', data);
  }
};

const interval = setInterval(() => {
  console.log('Sending Email');
  tempelateReader('h1.html', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data
      .replace(/~personName~/g, 'Pratap Sharma')
      .replace(/~invoiceAmt~/g, '2500.00')
      .replace(/~custName~/g, 'Abhinash')
      .replace(/~clientName~/g, 'Travelkosh')
      .replace(/~accountNo~/g, '12345678900')
      .replace(/~SIGN~/g, 'Branch Manager')
      .replace(/~table~/g, table);

    sendMail(
      {
        mailTo:
          'sharma.pratap22@gmail.com, abhinash7643@gmail.com, shreskar@gmail.com, sudipmayami@gmail.com',
        mailSubject: 'Thank You For Registering With us',
        mailHtml: result
      },
      callBackFunc
    );
  });

  console.log('Email Sent Successfully');
}, 30000);

interval;
