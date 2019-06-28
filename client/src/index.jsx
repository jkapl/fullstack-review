import React from 'react';
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
      success: (data) => {
        // var reposByUser = data.map( (repo, index) => {
        //   return repo.repos
        // });
        // var allRepos = [];
        // for (var i = 0; i < reposByUser.length; i++) {
        //   for (var j = 0; j < reposByUser[i].length; j++) {
        //     allRepos.push(reposByUser[i][j]);
        //   }
        // }
        console.log(data)
        var allRepos = data.map( (repo) => {
          return repo
        })
        this.setState({repos: allRepos});
      },
      error: () => {
        console.log('i brokey the servey')
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: {term: term},
      success: () => {  },
      error: () => { console.log('oh no, i no sendy')}
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));