var SubjectsApp = React.createClass({
  getInitialState: function () {
    return {
      subjects: [],
      searchResults: [],
      currentTab: "Общепрофессиональный",
      loading: true,
      query: ""
    };
  },

  componentDidMount: function () {
    this.getSubjectsFromApi(this.state.currentTab)
  },

  getSubjectsFromApi: function (module_name) {
    var self = this;
    this.setState({ loading: true })
    params = $.param({ academic_modules: { name: module_name } })
    $.ajax({
      url: '/api/subjects/?' + params,
      success: function (data) {
        self.setState({ subjects: data });
        self.setState({ loading: false })
      },
      error: function (xhr, status, error) {
        self.setState({ loading: false })
        console.log('Cannot get data from API: ', error);
      }
    });
  },

  handleSearch: function () {
    var query = ReactDOM.findDOMNode(this.refs.query).value
    this.setState({ loading: true })
    var self = this;
    $.ajax({
      url: '/api/subjects/search',
      data: {
        query: query,
      },
      success: function (data) {
        self.setState({ query: query, searchResults: data });
        self.setState({ loading: false })
      },
      error: function (xhr, status, error) {
        self.setState({ loading: false })
        console.log('Search error: ', status, xhr, error);
      }
    });
  },

  clearQuery: function () {
    this.setState({ query: "", searchResults: [] })
    this.refs.query.value = ""
  },

  changeTab: function (name) {
    this.setState({ currentTab: name })
    this.getSubjectsFromApi(name)
  },

  tabListComponent: function () {
    tabList = ["Общепрофессиональный", "Гуманитарный", "Естественнонаучный"]

    return (
      <TabList tabs={tabList}
        changeTab={this.changeTab}
        currentTab={this.state.currentTab} />
    )
  },

  searchInput: function() {
    return(
      <span>
        <div className="row">
          <div className="col-11 pr-1">
            <input onChange={$.debounce(500, this.handleSearch)}
              type="text"
              className="form-control search"
              placeholder={"Поиск по названию дисциплины"}
              ref="query" />
            {/*{this.checkboxList()}*/}
          </div>
          <div className={"pl-1 pt-1 " + (this.state.query.length == 0 ? "invisible" : "")}>
            <button type="button" className="close" aria-label="Close" onClick={this.clearQuery}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </span>
    )
  },
  renderContent: function() {
    if (this.state.searchResults.length == 0 && this.state.query.length == 0) {
      return(
        <span>
          {this.tabListComponent()}
          {this.state.loading ?
            <h3 className="text-center text-muted mt-3">Загрузка...</h3>
            :
            <SubjectList subjects={this.state.subjects} />
          }
        </span>
      )
    }
    else {
      return (
        <span>
          <SubjectList subjects={this.state.searchResults} />
        </span>
      )
    }
  },

  render: function () {
    return (
      <div className="section">
        <div className="container main">
          <div className="container mt-2">
            <div className="mr-auto mt-1">
              <a href="/">
                {"<- К списку специальностей"}
              </a>
            </div>
            <div className="card border-0 cursor-default">
              <div className="card-block">
                <h1 className="card-title">
                  Индивидуальная образовательная траектория
                </h1>
                {this.searchInput()}
              </div>
            </div>
            <div className="container">
              {this.renderContent()}
            </div>
          </div>
        </div>
      </div>
    )
  }
});