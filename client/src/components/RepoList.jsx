import React from 'react';

const RepoList = ( { repos } ) => (
  <div>
    <div>
      <h4> Repo List Component </h4>
      There are { repos.length } repos.
    </div>
    <ul>
      { repos.map ( repo  => ( <li><span>{ repo.repoName }</span> || <span><a href={ repo.url }>{ repo.url }</a></span></li> )) }
    </ul>
  </div>
)

export default RepoList;