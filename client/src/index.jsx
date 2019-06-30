import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

    this.getRepos = this.getRepos.bind(this);

  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos () {
    $.ajax({
      url: '/repos',
      method: 'GET',
      success: repos => this.setState({ repos }),
      error: () => {
        console.log('i brokey the servey');
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: {term},
      success: () => {
        this.getRepos();
       },
      error: () => {
        console.log('oh no, i no sendy');
      }
    });
  }

  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));