// import logo from './logo.svg';
import './App.css';
import idCard from './images/id-card.png';
import deliveryTruck from './images/delivery-truck.png';
import orderTracking from './images/order-tracking.png';
import React, { useState, useEffect} from 'react';

const quality_types = ["CZGH", "SI2GH", "SI3GH", "VS2GH", "VS2-SI1HI", "SI-I1"];

const metal_types = ["10K White", "10K Yellow", "14K Rose", "14K White", "14K Yellow", "18K White", "18K Yellow", "22K White", "22K Yellow", "9K Rose", "9K White", "9K Yellow", "Platinum"];

const choice = ["Yes", "No"];

function App() {

  // 
  // 
  // 

  let global64Data;

  // let globalCurrentRow = 1;

  useEffect(() => {
    let currentDate = new Date();
    let timestamp = currentDate.getTime();
    let ustrr = "Unique ID : " + timestamp.toString();
    document.getElementById('epochTime').innerHTML = ustrr;
  }, []);

  function getMetalValue(row) {

    let place = row.toString();

    let idx = "Metal" + place;

    let selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
  }

  function getQualityValue(row) {

    let place = row.toString();

    let idx = "Quality" + place;

    let selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
  }

  function getCenterQualityValue(row) {

    let place = row.toString();

    let idx = "CenterQuality" + place;

    let selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
  }

  function getCustomerCenterValue(row) {

    let place = row.toString();

    let idx = "CustomerCenter" + place;

    let selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
  }

  function getCenterValue(row) {

    let place = row.toString();

    let idx = "Center" + place;

    let selectValue_temp = document.getElementById(idx).value;

    return selectValue_temp;
  }

  const [base64Data, setBase64Data] = useState({});

  const handleImage = (e, currRow) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageDataUrl = e.target.result;

        // Create an object with image data
        const imageData = {
          fileName: file.name,
          fileType: file.type,
          base64Data: imageDataUrl.split(',')[1] // Extract base64 data
        };

        // Set base64 data for the current row
        setBase64Data((prevData) => ({ ...prevData, [currRow]: imageData.base64Data }));

        console.log(base64Data);
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // This will log the updated base64Data after each render
    console.log(base64Data);
  }, [base64Data]);

  function DisplayGlobalBase64Data(row) {
    console.log('Displaying base64 data for row', row, ':', base64Data[row]);
    return base64Data[row] || "";
  }
  // document.getElementById('FileInput').addEventListener('change', function () {
  //     const differentVariable = handleImage(displayImageData);
  //     // console.log('base64Data in a different variable:', differentVariable);
  // });

  function useGlobalBase64Data() {
    // console.log(typeof global64Data);
    let str = global64Data;
    return str;
    // You can use globalBase64Data in other parts of your code
  }

  function addRow() {
    // let table = document.querySelector(".table tbody");

    let currRow = globalRow.toString();

    let table = document.getElementById("DataTable").getElementsByTagName('tbody')[0];
    let newRow = table.insertRow(table.rows.length);
    newRow.id = 'Row' + currRow.toString();

    for (let i = 0; i < 9; i++) {
      if (i === 4 || i === 6) {
        let cell = newRow.insertCell(i);
        // cell.textContent = "Data";

        // Create a select element
        let select = document.createElement("select");
        select.className = "form-control";
        if (i === 4) {
          let idx = "Quality" + currRow;
          select.id = idx;
        }

        else {
          let idx = "CenterQuality" + currRow;
          select.id = idx;
        }

        let j = 0;

        // // Add options to the select element
        // let option = document.createElement("option");

        if (j === 0) {
          let option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.text = "Select an Option";
          select.appendChild(option);
        }
        j = j + 1;
        for (j = 1; j <= 6; j++) {
          let option = document.createElement("option");
          option.text = quality_types[j - 1];
          select.appendChild(option);
        }

        // Append the select element to the cell
        cell.appendChild(select);
        continue;
      }
      else if (i === 2) {
        let cell = newRow.insertCell(i);
        // cell.textContent = "Data";

        // Create a select element
        let select = document.createElement("select");
        select.className = "form-control";

        let idx = "Metal" + currRow;
        select.id = idx;

        let j = 0;

        // // Add options to the select element
        // let option = document.createElement("option");

        if (j === 0) {
          let option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.text = "Select an Option";
          select.appendChild(option);
        }
        j = j + 1;
        for (j = 1; j <= 13; j++) {
          let option = document.createElement("option");
          option.text = metal_types[j - 1];
          select.appendChild(option);
        }

        // Append the select element to the cell
        cell.appendChild(select);
        continue;
      }
      else if (i === 7 || i === 8) {
        let cell = newRow.insertCell(i);
        // cell.textContent = "Data";

        // Create a select element
        let select = document.createElement("select");
        select.className = "form-control";

        if (i === 7) {
          let idx = "CustomerCenter" + currRow;
          select.id = idx;
        }
        else {
          let idx = "Center" + currRow;
          select.id = idx;
          // select.onChange = CellLogic(globalRow);
        }

        let j = 0;

        // // Add options to the select element
        // let option = document.createElement("option");

        if (j === 0) {
          let option = document.createElement("option");
          option.disabled = true;
          option.selected = true;
          option.text = "Select an Option";
          select.appendChild(option);
        }
        j = j + 1;
        for (j = 1; j <= 2; j++) {
          let option = document.createElement("option");
          option.text = choice[j - 1];
          select.appendChild(option);
        }

        select.onchange = (event) => {
          handleInputThis(event);
        };

        // Append the select element to the cell
        cell.appendChild(select);

        //Add an EventListner 
        // const element = document.getElementById('idx');
        // element.addEventListener('change', CellLogic());

        continue;
      }
      let cell = newRow.insertCell(i);
      let input = document.createElement("input");
      input.type = "text" + currRow;
      input.className = "form-control";
      cell.appendChild(input);

    }

    // let cell = newRow.insertCell(9);
    // let input = document.createElement("input");
    // input.type = "file";
    // input.id = "FileInput";
    // // input.name = "image";
    // cell.appendChild(input);

    let cell = newRow.insertCell(9);
    let input = document.createElement("input");
    input.type = "file";
    input.id = "FileInput";

    // Call handleImage with the current row ID
    input.addEventListener('change', (e) => handleImage(e, newRow.id));

    cell.appendChild(input);

    cell = newRow.insertCell(10);
    input = document.createElement("input");
    input.type = "text";
    input.className = "form-control";
    input.id = "Note" + currRow;
    cell.appendChild(input);

    // let actionCell = newRow.insertCell(11);
    // // actionCell.innerHTML = '<button class="btn btn-danger" style="background-color: #273B42; border-width:0px" onClick="deleteRow(' + (table.rows.length - 1) + ')">Delete <i class="bi bi-dash-circle-fill"></i></button> '
    // actionCell.innerHTML = '<button class="btn btn-danger button" type="button" style="background-color: #273B42; border-width:0px" onClick="deleteRow(this)">Delete <i class="bi bi-dash-circle-fill"></i></button> '

    let actionCell = newRow.insertCell(11);

    // Create a button element
    let deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger button';
    deleteButton.type = 'button';
    deleteButton.style.backgroundColor = '#273B42';
    deleteButton.style.borderWidth = '0px';
    deleteButton.innerHTML = 'Delete <i class="bi bi-dash-circle-fill"></i>';

    // Add a click event listener to the button
    deleteButton.addEventListener('click', function () {
      deleteRow(newRow.id); // Assuming deleteRow is your delete function, and 'this' refers to the button element
    });

    // Set the inner HTML of actionCell
    actionCell.innerHTML = '';
    actionCell.appendChild(deleteButton);

    addToValidRows(newRow.id);

    console.log(globalRow);

    increaseGlobalRow();
  }

  // function deleteRow(button) {
  //     let row = button.closest('tr');

  //     console.log(row.id);

  //     if (row) {
  //         //Remove the <tr> from validRow array
  //         removeFromValidRows(row.id);

  //         // Remove the <tr> element
  //         row.parentNode.removeChild(row);
  //     } else {
  //         console.log("Error: <tr> element not found");
  //     }

  //     globalRow = globalRow - 1;
  // }

  var [globalRow, setGlobalRow] = useState(1);
  var [validRows, setValidRows] = useState(['Row0']);

  console.log(validRows);

  const increaseGlobalRow = () => {
    setGlobalRow((prevGlobalRow) => prevGlobalRow + 1);
  };

  const updateGlobalRow = () => {
    setGlobalRow((prevRow) => prevRow + 1);
  };

  const addToValidRows = (value) => {
    setValidRows((prevValidRows) => [...prevValidRows, value]);
  };

  const removeFromValidRows = (rowId) => {
    setValidRows((prevRows) => prevRows.filter((id) => id !== rowId));
  };

  const deleteRow = (rowId) => {
    const row = document.getElementById(rowId);

    if (row) {
      const rowId = row.id;

      // Remove the row from validRows using its ID
      removeFromValidRows(rowId);

      // Remove the row element from DOM
      row.remove();

      // Update global row count
      // updateGlobalRow();
    } else {
      console.error('Error: <tr> element not found');
    }

    console.log(validRows);
  };

  function submitform() {

    let combined_data1 = {};

    let formData = {
      ShippingAccount: Fetch_ShipAcc(),
      Name: Fetch_Name(),
      CustomerPO: Fetch_CustomerPO(),
      // DeliveryDate: ,
      Email: Fetch_Email(),
      Phone: Fetch_Phone(),
      Address1: Fetch_Addr1(),
      Address2: Fetch_Addr2(),
      // City: Fetch_City,
      // State: document.getElementById("state1").value,
      // Zip_Code: document.getElementById("Zip").value
    };


    combined_data1 = { ...combined_data1, ...formData };

    console.log(combined_data1);

    // console.log(formData);

    // document.getElementById("jsonOutput").textContent = jsonData;

    let table = document.getElementById("DataTable");
    let tbody = table.getElementsByTagName("tbody")[0];
    let rows = tbody.getElementsByTagName("tr");

    for (let i = 0; i < globalRow; i++) {
      if (validRows.indexOf(rows[i].id) !== -1) {

        // console.log("YES");

        // console.log(rows[i]);

        // console.log(i);

        let place = rows[i].id.charAt(rows[i].id.length - 1);

        // console.log(place);

        let cells = rows[i].getElementsByTagName("td");

        let combined_data = {};

        for (let j = 0; j < cells.length; j++) {
          if (j === 2) {
            let selectValue = getMetalValue(place);
            // console.log(selectValue);

            let json_metal = {
              Row: i + 1,
              // Key: "Metal",
              Metal: selectValue,
            }

            // console.log(json_metal);

            combined_data = { ...combined_data, ...json_metal };
          }
          else if (j === 4) {
            let selectValue = getQualityValue(place);
            // console.log(selectValue);

            let json_quality = {
              Row: i + 1,
              // Key: "Quality",
              Quality: selectValue,
            }

            // console.log(json_metal);

            combined_data = { ...combined_data, ...json_quality };
          }
          else if (j === 6) {
            let selectValue = getCenterQualityValue(place);
            // console.log(selectValue);

            let json_CenterQuality = {
              Row: i + 1,
              // Key: "CenterQuality",
              CenterQuality: selectValue,
            }

            // console.log(json_metal);

            combined_data = { ...combined_data, ...json_CenterQuality };
          }
          else if (j === 7) {
            let selectValue = getCustomerCenterValue(place);
            // console.log(selectValue);

            let json_CustomerCenter = {
              Row: i + 1,
              // Key: "CustomerCenter",
              CustomerCenter: selectValue,
            }

            // console.log(json_metal);

            combined_data = { ...combined_data, ...json_CustomerCenter };
          }
          else if (j === 8) {
            let selectValue = getCenterValue(place);
            // console.log(selectValue);

            let json_Center = {
              Row: i + 1,
              // Key: "Center",
              Center: selectValue,
            }

            // console.log(json_metal);

            combined_data = { ...combined_data, ...json_Center };
          }

          else if (j === 9) {
            // let selectValue = handleImage();
            // console.log(selectValue);
            // console.log(global64Data);

            let str = DisplayGlobalBase64Data(place+1);

            let json_image = {
              Row: i + 1,
              // Key: "Image",
              Image: str,
            }

            // console.log(json_image);

            combined_data = { ...combined_data, ...json_image };
          }

          else {

            let inputElement = cells[j].querySelector("input");

            if (inputElement) {
              let inputValue = inputElement.value;
              // console.log("Row " + (i + 1) + ", Cell " + (j) + " input value: " + inputValue);
              // console.log(JSON.stringify(inputValue));
              // console.log(inputValue);

              if (j === 0) {
                let json_data = {
                  Row: i + 1,
                  // Key: "Style",
                  Style: inputValue,
                }

                // console.log(json_data);

                combined_data = { ...combined_data, ...json_data };
              }

              if (j === 1) {
                let json_data = {
                  Row: i + 1,
                  // Key: "Version",
                  Version: inputValue,
                }

                // console.log(json_data);
                combined_data = { ...combined_data, ...json_data };
              }

              if (j === 3) {
                let json_data = {
                  Row: i + 1,
                  // Key: "RingSize",
                  RingSize: inputValue,
                }

                // console.log(json_data);
                combined_data = { ...combined_data, ...json_data };
              }

              if (j === 5) {
                let json_data = {
                  Row: i + 1,
                  // Key: "CenterSize",
                  CenterSize: inputValue,
                }

                // console.log(json_data);
                combined_data = { ...combined_data, ...json_data };
              }

              if (j === 10) {
                let json_data = {
                  Row: i + 1,
                  // Key: "Note",
                  Note: inputValue,
                }

                // console.log(json_data);
                combined_data = { ...combined_data, ...json_data };
              }
            }
          }
          console.log(combined_data);
        }

        combined_data1 = { ...combined_data1, ...combined_data };
      }

      console.log(combined_data1);
    }
    // This helps in unwanted iterations of a certain task or button or function.
    // event.stopPropagation();
  }

  const CellLogic = (rowId) => {
    const table = document.getElementById('DataTable');
    const rows = table.querySelectorAll(`tr#${rowId}`);
  
    rows.forEach((row) => {
      const cols = row.querySelectorAll('td');
      let selectCC = 0, selectCT = 0;
  
      cols.forEach((col, j) => {
        const selects = col.querySelectorAll('select');

        console.log(`Column ${j}: ${selects.length} selects`);
  
        // Assuming there's only one select element inside each column
        const selectValue = selects.length > 0 ? selects[0].value : '';
  
        if (j === 7 && selectValue === 'Yes') {
          selectCC = 1;
        }
  
        if (j === 8 && selectValue === 'No') {
          selectCT = 1;
        }
      });
  
      console.log(selectCC, selectCT);
  
      cols.forEach((col, j) => {
        const selects = col.querySelectorAll('select, input');

        console.log(`Column ${j}: ${selects.length} selects or inputs`);
  
        if ((j === 5 || j === 6) && selectCC === 1 && selectCT === 1) {
          selects.forEach((select) => {
            select.disabled = true;
          });
        }
      });
    });
  };
  

  var handleInputThis = (event) => {
    const inputElement = event.target;
    const current = findClosestTR(inputElement);

    if (current) {
      const rowID = current.id;

      // Assuming CellLogic is another function you want to call
      CellLogic(rowID);

      // Additional logic, if needed
      console.log('Row ID: ' + rowID);
    }
  };

  const findClosestTR = (element) => {
    while (element && element.tagName !== 'TR' && element.tagName !== 'tr') {
      element = element.parentNode;
    }
    return element;
  };

  function Fetch_Name() {
    let item = document.getElementById('item1');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Name' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_1');

    // target.parentNode.(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_Phone() {
    let item = document.getElementById('item2');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Phone' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_1_A');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_ShipAcc() {
    let item = document.getElementById('item3');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Ship Account' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_1_B');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_DeliveryName() {
    let item = document.getElementById('item4');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Delivery Name' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_2');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_Addr1() {
    let item = document.getElementById('item5');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Address 1' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_2_A');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_Addr2() {
    let item = document.getElementById('item6');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Address 2' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_2_B');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_CustomerPO() {
    let item = document.getElementById('item7');

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    // para.textContent = 'Customer PO' + ' : ' + value;
    para.textContent = value;

    const target = document.getElementById('Insert_Here_3');

    // target.parentNode.insertBefore(para, target);
    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_ConfirmOrder() {
    let item = document.getElementById("flexCheckDefault");

    // console.log(item);

    let value;

    if (item.checked) {
      value = "Confirmed";
    }

    // else {
    //     value = "No";
    // }

    const para = document.createElement('p');

    para.textContent = value;

    const target = document.getElementById("Insert_Here_3_A");

    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_UrgentOrder() {
    let item = document.getElementById("flexCheckDefault_1");

    // console.log(item);

    let value;

    if (item.checked) {
      value = "Urgent";
    }

    // else {
    //     value = "No";
    // }

    const para = document.createElement('p');

    para.textContent = value;

    const target = document.getElementById("Insert_Here_3_B");

    target.textContent = para.textContent;

    return para.textContent;
  }

  function Fetch_Email() {
    let item = document.getElementById("item3_A");

    // console.log(item);

    let value = item.value;

    const para = document.createElement('p');

    para.textContent = value;

    const target = document.getElementById("Insert_Here_1_C");

    target.textContent = para.textContent;

    return para.textContent;
  }

  // console.log(globalRow);

  // console.log(validRows);

  // 
  // 
  // 

  return (
    <>
      <div className="container" style={{ minWidth: '1700px', height: 'auto', margin: 'auto' }}>
        {/*<h1 style="textAlign: center; display: inline-block; vertical-align: middle;">Send Ajaffe Order</h1> */}
        <h1 style={{ minWidth: '1000px', textAlign: 'right', display: 'inline-block' }}>Send Ajaffe Order</h1>
        <h1 id="epochTime" style={{ minWidth: '550px', textAlign: 'right', display: 'inline-block', fontWeight: '600', fontSize: '18px' }}>
          Hello
        </h1>

        <form>

          <div className="row">
            <div className="column" id="Target_Column_1">
              <div className="card" style={{ justifyContent: 'space-between', display: 'inline-block' }}>
                <div id="Image-Margin">
                  <img src={idCard} alt="Information" width="60" height="60" />
                </div>
                <div className="dropdown" style={{ width: 'fit-content', display: 'inline-block' }}>
                  <span className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown"
                    style={{ textAlign: 'center', width: '150px', backgroundColor: '#273B42', marginLeft: '90px', marginTop: '10px' }}
                    aria-expanded="false">
                    Customer Info
                  </span>
                  {/* <!-- <p>Hello : Hey!</p> --> */}
                  <p id="Insert_Here_1"></p>

                  <p id="Insert_Here_1_A"></p>

                  <p id="Insert_Here_1_B"></p>

                  <p id="Insert_Here_1_C"></p>

                  <ul className="dropdown-menu" id="Conatact_Info" style={{ opacity: '0.8' }}>
                    <li>
                      <span className="dropdown-item">
                        <label style={{ display: 'inline-block' }}>Name : </label>
                        <input className="form-control" id="item1"
                          style={{ width: '210px', display: 'inline-block' }} type="text"
                          onChange={Fetch_Name} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Phone : </label>
                        <input className="form-control" id="item2"
                          style={{ width: '210px', display: 'inline-block' }} type="text"
                          onChange={Fetch_Phone} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Ship Account : </label>
                        <input className="form-control" id="item3"
                          style={{ width: '150px', display: 'inline-block' }} type="text"
                          onChange={Fetch_ShipAcc} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Email : </label>
                        <input className="form-control" id="item3_A"
                          style={{ width: '215px', display: 'inline-block' }} type="text"
                          onChange={Fetch_Email} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="column" id="Target_Column_2">
              <div className="card" style={{ justifyContent: 'space-between', display: 'inline-block' }}>
                <div id="Image-Margin">
                  <img src={deliveryTruck} alt="Delivery Information" width="60" height="60" />
                </div>
                <div className="dropdown" style={{ width: 'fit-content', display: 'inline-block' }}>
                  <span className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown"
                    style={{ textAlign: 'center', width: '150px', backgroundColor: '#273B42', marginLeft: '90px', marginTop: '10px' }}
                    aria-expanded="false">
                    Delivery Info
                  </span>
                  {/* <!-- <p>Hello : Hey!</p> --> */}
                  <p id="Insert_Here_2"></p>

                  <p id="Insert_Here_2_A"></p>

                  <p id="Insert_Here_2_B"></p>

                  <ul className="dropdown-menu" id="Delivery_Info" style={{ opacity: '0.8' }}>
                    <li>
                      <span className="dropdown-item">
                        <label style={{ display: 'inline-block' }}>Delivery Name : </label>
                        <input className="form-control" id="item4"
                          style={{ width: '145px', display: 'inline-block' }} type="text"
                          onChange={Fetch_DeliveryName} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Address 1 : </label>
                        <input className="form-control" id="item5"
                          style={{ width: '185px', display: 'inline-block' }} type="text"
                          onChange={Fetch_Addr1} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item">
                        <label>Address 2 : </label>
                        <input className="form-control" id="item6"
                          style={{ width: '180px', display: 'inline-block' }} type="text"
                          onChange={Fetch_Addr2} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item" id="item6_A">
                        <label htmlFor="date">Delivery : </label>
                        <input type="date" className="form-control"
                          style={{ width: '200px', display: 'inline-block' }} id="date"
                          placeholder="Enter a date" />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="column" id="Target_Column_3">
              <div className="card" style={{ justifyContent: 'space-between', display: 'inline-block' }}>
                <div id="Image-Margin">
                  <img src={orderTracking} alt="Order Information" width="60" height="60" />
                </div>
                <div className="dropdown" style={{ width: 'fit-content', display: 'inline-block' }}>
                  <span className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown"
                    style={{ textAlign: 'center', width: '150px', backgroundColor: '#273B42', marginLeft: '90px', marginTop: '10px' }}
                    aria-expanded="false">
                    Order Info
                  </span>
                  {/* <!-- <p>Hello : Hey!</p> --> */}
                  <p id="Insert_Here_3"></p>

                  <p id="Insert_Here_3_A"></p>

                  <p id="Insert_Here_3_B"></p>

                  <ul className="dropdown-menu" id="Order_Info" style={{ opacity: '0.8' }}>
                    <li>
                      <span className="dropdown-item">
                        <label style={{ display: 'inline-block' }}>Customer PO : </label>
                        <input className="form-control" id="item7"
                          style={{ width: '150px', display: 'inline-block' }} type="text"
                          onChange={Fetch_CustomerPO} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item d-flex align-items-left" style={{ border: '0px' }}>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          Confirm Order :
                        </label>
                        <input className="form-check-input" type="checkbox"
                          style={{ marginLeft: '15px', height: '1.25em', width: '1.25em' }}
                          id="flexCheckDefault" onChange={Fetch_ConfirmOrder} />
                      </span>
                    </li>
                    <li>
                      <span className="dropdown-item d-flex align-items-left" style={{ border: '0px' }}>
                        <label className="form-check-label" htmlFor="flexCheckDefault1">
                          Urgent Order :
                        </label>
                        <input className="form-check-input" type="checkbox"
                          style={{ marginLeft: '25px', height: '1.25em', width: '1.25em' }}
                          id="flexCheckDefault_1" onChange={Fetch_UrgentOrder} />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          <h1 style={{ textAlign: 'center', marginBottom: '100px', marginTop: '100px' }}>Item Details</h1>

          {/* <!-- <div className="input-group mb-3" style="marginBottom: 60px;">
                <label className="input-group-text" htmlFor="inputGroupFile01">Upload Image</label>
                <input type="file" className="form-control" id="inputGroupFile01"/>
            </div>
            <div className="form-row" style="marginBottom: 60px;">
                <div className="input-data textarea">
                    <textarea rows="2" cols="80" required></textarea>
                    <div className="underline"></div>
                    <label htmlFor="" style="font-style: italic;">Note</label>
                </div>
            </div> --> */}
          <div className="row" style={{ margin: '50px' }}>
            <div className="col" style={{ maxWidth: 'auto' }}>
              <table className="table" id="DataTable" style={{ maxWidth: 'auto' }}>
                <thead>
                  <tr id="Row">
                    <th style={{ minWidth: '100px' }}>Style</th>
                    <th style={{ minWidth: '100px' }}>Version</th>
                    <th style={{ minWidth: '100px' }}>Metal</th>
                    <th style={{ minWidth: '100px' }}>Ring Size</th>
                    <th style={{ minWidth: '100px' }}>Quality</th>
                    <th style={{ minWidth: '100px' }}>Center Size</th>
                    <th style={{ minWidth: '100px' }}>Center Quality</th>
                    <th style={{ minWidth: '100px' }}>Customer Center</th>
                    <th style={{ minWidth: '100px' }}>Center</th>
                    <th style={{ minWidth: '225px' }}>Image Upload</th>
                    <th style={{ minWidth: '200px' }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="Row0">
                    <td>
                      <input className="form-control" type="text" id="Style" name="Style" />
                    </td>
                    <td>
                      <input className="form-control" type="text" id="Version" />
                    </td>
                    <td>
                      {/* <!-- <input className="form-control" type="text" id="grid" required> --> */}
                      <select className="form-control" id="Metal0" defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="10K White">10K White</option>
                        <option value="10K Yellow">10K Yellow</option>
                        <option value="14K Rose">14K Rose</option>
                        <option value="14K White">14K White</option>
                        <option value="14K Yellow">14K Yellow</option>
                        <option value="18K White">18K White</option>
                        <option value="18K Yellow">18K Yellow</option>
                        <option value="22K White">22K White</option>
                        <option value="22K Yellow">22K Yellow</option>
                        <option value="9K Rose">9K Rose</option>
                        <option value="9K White">9K White</option>
                        <option value="9K Yellow">9K Yellow</option>
                        <option value="Platinum">Platinum</option>
                        {/* <!-- Add more options as needed --> */}
                      </select>
                    </td>
                    <td>
                      <input className="form-control" type="text" id="RingSize" />
                    </td>
                    <td>
                      {/* <!-- <input className="form-control" type="text" id="grid" required> --> */}
                      <select className="form-control" id="Quality0" defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="CZGH">CZGH</option>
                        <option value="SI2GH">SI2GH</option>
                        <option value="SI3GH">SI3GH</option>
                        <option value="VS2GH">VS2GH</option>
                        <option value="VS2-SI1HI">VS2-SI1HI</option>
                        <option value="SI-I1">SI-I1</option>
                        {/* <!-- Add more options as needed --> */}
                      </select>
                    </td>
                    <td>
                      <input className="form-control" type="text" id="CenterSize" />
                    </td>
                    <td>
                      {/* <!-- <input className="form-control" type="text" id="grid" required> --> */}
                      <select className="form-control" id="CenterQuality0" defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="CZGH">CZGH</option>
                        <option value="SI2GH">SI2GH</option>
                        <option value="SI3GH">SI3GH</option>
                        <option value="VS2GH">VS2GH</option>
                        <option value="VS2-SI1HI">VS2-SI1HI</option>
                        <option value="SI-I1">SI-I1</option>
                        {/* <!-- Add more options as needed --> */}
                      </select>
                    </td>
                    <td>
                      {/* <!-- <input className="form-control" type="text" id="grid" required> --> */}
                      <select className="form-control" id="CustomerCenter0" onChange={handleInputThis} defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      {/* <!-- <input className="form-control" type="text" id="grid" required> --> */}
                      <select className="form-control" id="Center0" onChange={handleInputThis} defaultValue="">
                        <option value="" disabled>Select an Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </td>
                    <td>
                      <input type="file" className="form-control-file" name="image1" id="FileInput"
                        onChange={(e) => handleImage(e, 0)} />
                    </td>
                    <td>
                      <input className="form-control" type="text" id="Note" style={{ minWidth: '200px' }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col">
              {/* <!-- <button className="btn btn-success" type="button" onClick="addRow()"
                    style="backgroundColor: #687E86;">Add Row</button> --> */}
              {/* <button className="btn btn-danger" onClick={deleteRow(0)} style={{backgroundColor: 'mediumvioletred', position: 'absolute'}}>Delete Last Row</button> */}
            </div>
          </div>

          <div style={{ marginTop: '-40px', marginLeft: '60px' }}>
            <button className="btn btn-success" type="button" onClick={addRow} style={{ backgroundColor: '#273B42' }}>Add
              Row</button>

          </div>

          {/* <!-- #687E86 --> */}

          {/* <!-- <div className="input-data">
                    <div className="inner" onClick="submitform()"></div>
                    <input type="submit-button" onClick="submitform()" id="sub-btn" value="submit">
                </div> -->
            <!-- <button className="button-28" role="button">Button 28</button> -->
            <!-- <button type="button" onClick="submitform()">Convert to JSON</button> --> */}
        </form>

        <button className="button-28" type='button' onClick={submitform}>Submit</button>

        {/* <!-- <h2>JSON Output</h2>
        <pre id="jsonOutput"></pre>
        <pre id="jsonOutput2"></pre> --> */}
      </div>
    </>
  );
}

export default App;