var SubjectList = React.createClass({

  /// render helpers
  subjectList: function () {
    self = this
    if (localStorage.getItem('subjectList') != null) {
      subjectListIds = []
      localStorage.getItem('subjectList').split(",").forEach(
        function (id) {
          subject = self.props.subjects.find(function (subj) { return subj.id == parseInt(id)})
          if (subject != undefined) {
            subjectListIds.push(subject.name)
          }
        }
      )
    } else {
      subjectListIds = []
    }

    subjects = subjectListIds.length == 0 ? this.props.subjects : this.props.subjects.filter(function (subject) { return subjectListIds.indexOf(subject.name) == -1 })

    return subjects.map(function (subject, i) {
      return (
        <Subject subject={subject} key={"subject" + subject.id} />
      )
    }.bind(this));
  },

  render: function () {
    return (
      <div className="container main cursor-default">
        <div className="row mt-3 mb-1 px-1 font-weight-bold">
          <div className="col-1">
            Код
          </div>
          <div className="col-7">
            Дисциплина
          </div>
          <div className="col-3">
            Сектор
          </div>
          {/*<div className="col">
            Модуль
          </div>*/}
          <div className="col-1">
            Кредиты
          </div>
        </div>
        {this.subjectList()}
      </div>
    )
  }
});