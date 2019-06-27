import React from 'react';

const RepoList = (props) => (
  <div>
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
  </div>
  <ul>
    {props.repos.map ( repo => (
      <li>{repo}</li>
    ))}
  </ul>
  </div>
)

export default RepoList;