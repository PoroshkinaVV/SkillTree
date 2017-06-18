var Subject = React.createClass({

  addToList: function() {
    subjectList = localStorage.getItem('subjectList') != null ? localStorage.getItem('subjectList').split(',') : []
    if (subjectList.indexOf(this.props.subject.id.toString()) < 0) {
      subjectList.push(this.props.subject.id)
    }
    localStorage.setItem('subjectList', subjectList)
  },

  render: function() {
    var subject = this.props.subject

    return (
      <div className="mt-2">
        <div className="row py-2 px-1 hover-highlight" data-toggle="collapse">
          <div className="col-1">
              {stringUtils.smartString(subject.code)}
          </div>
          <div className="col-7">
            <div className="d-inline">
              {subject.name}
            </div>
          </div>
          <div className="col-3">
            {subject.sector_name}
          </div>
          {/*<div className="col">
                    {subject.module_name}
                  </div>*/}
          <div className="col-1 text-center pr-2">
            <div className="d-inline">
              {subject.credit_units}
            </div>
            {/* <div className="add-subject-btn
              ml-2 text-white text-center
              bg-success bg-success cursor-pointer"
              style={{ width: '25px', height: '25px' }}
              onClick={this.addToList}>
              +
            </div> */}
          </div>
        </div>
      </div>
    )
  }
})