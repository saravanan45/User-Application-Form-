import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

const version = 1;

function DisplayDetails({ history }) {
  const [records, setRecords] = useState({});
  const [count, setCount] = useState(5);
  const [searchWord, setSearchWord] = useState('');
  const [deleteRecord, setDeleteRecord] = useState('');
  const [minorVersion, setMinorVersion] = useState(0);
  const [bugfixVersion, setBugFixVersion] = useState(0);
  useEffect(() => {
    getFormDetails();
  }, []);
  const getFormDetails = () => {
    const formDetails = JSON.parse(localStorage.getItem('formDetails')) || {};
    setRecords(formDetails);
  };

  const expandRecords = () => {
    setCount(count === 5 ? 10 : 5);
  };
  const goSearch = (searchValue = '') => {
    setSearchWord(searchValue);
    const notallowed = ['fileName', 'password'];
    const formDetails = JSON.parse(localStorage.getItem('formDetails')) || {};
    if (searchValue.length) {
      // excluding filename and password row
      Object.keys(formDetails)
        .filter(key => notallowed.includes(key))
        .forEach(key => delete formDetails[key]);

      // showing password and fileName row
      const filteredRecords = Object.values(formDetails).filter(function(
        record
      ) {
        const getkey = Object.keys(formDetails)[
          Object.values(formDetails).indexOf(record)
        ];
        if (getkey === 'password' || getkey === 'fileName') {
          return record;
        }
        return Object.keys(record).some(function(key) {
          return record[key].toLowerCase().includes(searchValue.toLowerCase());
        });
      });

      return setRecords(filteredRecords);
    }
    return setRecords(formDetails);
  };

  const goToEdit = () => {
    return history.push('/edit');
  };
  const deleteField = record => {
    setDeleteRecord(record);
  };
  const confirmDelete = () => {
    const formDetails = JSON.parse(localStorage.getItem('formDetails')) || {};
    const newRecords = { ...formDetails };
    delete newRecords[deleteRecord];
    setRecords(newRecords);
    localStorage.setItem('formDetails', JSON.stringify(newRecords));
  };

  const changeNotes = (event, record) => {
    const tempRecord = {
      ...records,
      [record]: {
        ...records[record],
        notes: event.target.value
      }
    };
    setRecords(tempRecord);
  };

  const saveNotes = () => {
    localStorage.setItem('formDetails', JSON.stringify(records));
  };

  const createTags = record => {
    const formDetails = JSON.parse(localStorage.getItem('formDetails')) || {};
    const bugV = bugfixVersion + 1;
    const tag = `${version}.${minorVersion}.${bugV}`;
    const tempRecord = {
      ...formDetails,
      [record]: {
        ...records[record],
        tags: tag
      }
    };
    setBugFixVersion(bugV);
    setRecords(tempRecord);
    localStorage.setItem('formDetails', JSON.stringify(tempRecord));
  };

  const goToCustomize = () => {
    history.push(`/customize`);
  };
  return (
    <div>
      <span className="form-title">Records</span>
      <div>
        <button className="form-customize" onClick={() => goToCustomize()}>
          <span>Customize</span>
          <i class="fa fa-stack-exchange" aria-hidden="true"></i>
        </button>
        <button
          className="form-edit"
          onClick={() => {
            goToEdit();
          }}
        >
          <span> Edit</span>
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
        </button>
      </div>
      <div className="form-search">
        <input
          type="text"
          name="search"
          value={searchWord}
          autoComplete="off"
          onChange={event => {
            goSearch(event.target.value);
          }}
        />
        <span
          onClick={() => {
            goSearch();
          }}
        >
          <i class="fa fa-search" aria-hidden="true"></i>
        </span>
      </div>
      <div class="table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Key</th>
              <th>Values</th>
              <th>Delete</th>
              <th>Tags</th>
              <th>Notes</th>
            </tr>
          </thead>
          {/* {records.slice(0, count).map((record, index) => ( */}
          {Object.keys(records)
            .slice(0, count)
            .map(record => (
              <tr>
                <td>{record}</td>
                <td>{records[record].value}</td>
                <td>
                  <button
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => {
                      deleteField(record);
                    }}
                  >
                    {' '}
                    <i class="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  {/* <input
                    type="text"
                    value={records[record].tags}
                    onChange={event => {
                      changeTags(event, record);
                    }}
                  /> */}
                  <button
                    onClick={() => {
                      createTags(record);
                    }}
                  >
                    {records[record].tags ? records[record].tags : 'createTag'}
                  </button>
                </td>
                <td>
                  <div className="notes-section">
                    <input
                      className="form-notes"
                      type="text"
                      value={records[record].notes}
                      onChange={event => {
                        changeNotes(event, record);
                      }}
                    />
                    <button
                      className="notes-button"
                      onClick={() => {
                        saveNotes();
                      }}
                    >
                      Save
                      <span className="notes-tip">
                        {' '}
                        Write short Notes and click save{' '}
                      </span>
                      <i class="fa fa-sticky-note-o" aria-hidden="true"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          <tr>
            <td>
              <button
                className="expand-button"
                onClick={() => {
                  expandRecords();
                }}
              >
                {count === 5 ? 'Expand' : 'Compress'}
              </button>
            </td>
          </tr>
        </table>
      </div>
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Confirm Delete ?
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  confirmDelete();
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withRouter(DisplayDetails);
