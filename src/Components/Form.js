import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from 'react-router-dom';
import { object } from 'prop-types';

function Form({ history }) {
  const RoleOptions = [
    'FrontEnd Developer',
    'BackEnd Developer',
    'FullStack Developer'
  ];
  const ExperienceOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [records, setRecords] = useState({
    userName: {
      value: '',
      tags: '',
      notes: ''
    },
    password: {
      value: '',
      tags: '',
      notes: ''
    },
    sex: {
      value: 'male',
      tags: '',
      notes: ''
    },
    designation: {
      value: '',
      tags: '',
      notes: ''
    },
    experience: {
      value: 0,
      tags: '',
      notes: ''
    },
    expectedCTC: {
      value: 0,
      tags: '',
      notes: ''
    },
    currentCompany: {
      value: '',
      tags: '',
      notes: ''
    },
    choosenDate: {
      value: '',
      tags: '',
      notes: ''
    },
    fileName: {
      value: 'No file Choosen',
      tags: '',
      notes: ''
    },
    description: {
      value: '',
      tags: '',
      notes: ''
    }
  });
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [type, setType] = useState('password');

  useEffect(() => {
    setDetails();
  }, []);

  const setDetails = () => {
    const records = JSON.parse(localStorage.getItem('formDetails')) || {};
    if (Object.keys(records).length !== 0 && records.constructor === Object) {
      const dummyRecord = {
        userName: records.userName,
        password: records.password,
        sex: records.sex,
        designation: records.designation,
        experience: records.experience,
        currentCompany: records.currentCompany,
        expectedCTC: records.expectedCTC,
        choosenDate: {
          ...records.choosenDate,
          value: new Date(records.choosenDate.value)
        },
        fileName: records.fileName,
        description: records.description
      };
      setRecords(dummyRecord);
    }
  };

  const changeRecordValue = event => {
    if (event.target.files && event.target.files.length) {
      return setRecords({
        ...records,
        fileName: { ...records.fileName, value: event.target.files[0].name }
      });
    }
    setRecords({
      ...records,
      [event.target.name]: {
        ...records[event.target.name],
        value: event.target.value
      }
    });
  };
  const onDateChange = dateModified => {
    const changedDate = new Date(dateModified);
    setRecords({
      ...records,
      choosenDate: {
        ...records.choosenDate,
        value: changedDate
      }
    });
  };

  const passwordToggle = () => {
    const displayType = type;
    const visible = displayType === 'password' ? 'text' : 'password';
    setType(visible);
  };

  const onSubmit = () => {
    if (
      !records.userName.value ||
      !records.password.value ||
      !records.designation.value ||
      !records.currentCompany.value ||
      !records.choosenDate.value ||
      !records.description.value
    ) {
      setError(true);
      setErrorMsg('All fields are mandatory');
      return;
    }
    if (records.fileName.value === 'No file Choosen') {
      setError(true);
      setErrorMsg('Uploading a file is necessary');
      return;
    }
    if (records.designation.value === 'dummy') {
      setErrorMsg('Please select a suitable designation');
      setError(true);
      return;
    }

    const body = {
      userName: records.userName,
      password: records.password,
      sex: records.sex,
      designation: records.designation,
      experience: records.experience,
      expectedCTC: records.expectedCTC,
      currentCompany: records.currentCompany,
      choosenDate: records.choosenDate,
      fileName: records.fileName,
      description: records.description
    };
    console.log('records', body);
    localStorage.setItem('formDetails', JSON.stringify(body));
    history.push('/formDetails');
  };

  const title = () => {
    const formDetails = JSON.parse(localStorage.getItem('formDetails')) || {};
    if (
      Object.keys(formDetails).length !== 0 &&
      formDetails.constructor === Object
    ) {
      return true;
    }
    return false;
  };
  return (
    <div className="container form">
      <span className="form-title">
        {title() ? 'Edit Form' : 'Create Form'}
      </span>
      {error ? <p className="error-msg">{errorMsg}</p> : ''}
      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">UserName</span>
        <input
          className="offset-sm-1 col-sm-3"
          name="userName"
          type="text"
          autoComplete="off"
          value={records.userName.value}
          onChange={event => {
            changeRecordValue(event);
          }}
        />
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Password</span>

        <input
          className="offset-sm-1 col-sm-3 col-11"
          name="password"
          type={type}
          autoComplete="off"
          value={records.password.value}
          onChange={event => changeRecordValue(event)}
        />
        <span
          className="password-toggle"
          onClick={() => {
            passwordToggle();
          }}
        >
          {type === 'password' ? (
            <i class="fa fa-eye-slash" aria-hidden="true"></i>
          ) : (
            <i class="fa fa-eye"></i>
          )}
        </span>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Sex</span>
        <div className="offset-sm-1 col-sm-3">
          <div className="form-radio-field">
            <input
              type="radio"
              name="sex"
              id="male"
              value="male"
              checked={records.sex.value === 'male'}
              onChange={event => {
                changeRecordValue(event);
              }}
            />
            <label htmlFor="male">Male</label>
          </div>
          <div className="form-radio-field">
            <input
              type="radio"
              name="sex"
              id="female"
              value="female"
              checked={records.sex.value === 'female'}
              onChange={event => {
                changeRecordValue(event);
              }}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Designation</span>
        <select
          className="offset-sm-1 col-sm-3 form-designation"
          name="designation"
          value={records.designation.value}
          onChange={event => {
            changeRecordValue(event);
          }}
        >
          <option value="dummy">Choose your option</option>
          {RoleOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Experience</span>
        <select
          className="offset-sm-1 col-sm-3"
          name="experience"
          value={records.experience.value}
          onChange={event => {
            changeRecordValue(event);
          }}
        >
          {ExperienceOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Currently Working In</span>
        <input
          className="offset-sm-1 col-sm-3 form-company"
          name="currentCompany"
          type="text"
          autoComplete="off"
          value={records.currentCompany.value}
          onChange={event => {
            changeRecordValue(event);
          }}
        />
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Expected CTC</span>
        <div className="offset-sm-1 col-sm-4 form-ctc">
          <input
            name="expectedCTC"
            type="number"
            value={records.expectedCTC.value}
            onChange={event => {
              changeRecordValue(event);
            }}
          />
          <label htmlFor="expectedCTC">lakhs per annum</label>
        </div>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Upload your File</span>
        <div
          className="offset-sm-1 col-sm-5 file-upload"
          onChange={event => {
            changeRecordValue(event);
          }}
        >
          <input type="file" id="file" />
          <label htmlFor="file">
            {records.fileName.value}
            <i class="fa fa-cloud-upload"></i>
          </label>
        </div>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Date</span>
        <div className="offset-sm-1 col-sm-3 customDatePickerWidth">
          <DatePicker
            value={records.choosenDate.value}
            selected={records.choosenDate.value}
            onChange={onDateChange}
            todayButton="Today"
            placeholderText="Click to select a date"
          />
        </div>
      </div>

      <div className="row form-section">
        <span className="col-sm-3 offset-sm-3">Description</span>
        <textarea
          className="offset-sm-1 col-sm-3"
          name="description"
          value={records.description.value}
          onChange={event => {
            changeRecordValue(event);
          }}
        />
      </div>

      <div className="text-center submit-button">
        <button
          className="btn btn-success"
          type="submit"
          onClick={() => {
            onSubmit();
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default withRouter(Form);
