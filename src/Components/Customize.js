import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { set } from 'date-fns';

const Customize = ({ history }) => {
  const [records, setRecords] = useState({
    userName: false,
    password: false,
    sex: false,
    experience: false,
    designation: false,
    fileName: false,
    date: false,
    description: false,
    currentCompany: false,
    expectedCTC: false
  });
  const [formDetails, setFormDetails] = useState({});
  const [checkedCount, setCheckedCount] = useState(0);
  useEffect(() => {
    getRecords();
  }, []);
  const getRecords = () => {
    const details = JSON.parse(localStorage.getItem('formDetails')) || {};
    if (Object.keys(details).length !== 0) {
      setFormDetails(details);
    }
  };
  const checkboxChange = event => {
    const dummyRecords = { ...records };
    dummyRecords[event.target.name] = !dummyRecords[event.target.name];
    const count = Object.values(dummyRecords).filter(Boolean).length;
    if (count > 5) {
      return;
    }
    setCheckedCount(count);
    setRecords(dummyRecords);
  };

  const saveChanges = () => {
    let temp1 = {};
    let temp2 = {};
    const arr = Object.keys(formDetails);
    for (let i = 0; i < arr.length; i++) {
      if (records[arr[i]]) {
        temp1[arr[i]] = formDetails[arr[i]];
      } else {
        temp2[arr[i]] = formDetails[arr[i]];
      }
    }
    // Object.entries(temp2).forEach(([key, value]) => temp1[key]);
    // const newObj = { ...temp1, ...temp2 };
    const newObj = Object.assign(temp1, temp2);
    localStorage.setItem('formDetails', JSON.stringify(newObj));
    history.push('/formDetails');
    console.log(newObj);
  };
  return (
    <Fragment>
      <div className="form-title">Customize your section</div>
      <span className="form-customize-subsection">
        Please select 5 items which you want to display by default
      </span>
      <div className="form-customize-section">
        {Object.keys(formDetails).map(record => (
          <div
            className="form-customize-checkbox"
            onChange={event => {
              checkboxChange(event);
            }}
          >
            <input
              type="checkbox"
              name={record}
              id={record}
              checked={records[record] === true}
            />
            <label htmlFor={record}>{record}</label>
          </div>
        ))}
      </div>
      <button
        className="btn btn-success button-customize"
        onClick={() => {
          saveChanges();
        }}
      >
        Save your Opinion
      </button>
    </Fragment>
  );
};

export default withRouter(Customize);
