import React, { Component } from 'react';
import BooksContainer from './BooksContainer';

export default class searchBar extends Component {
  state = {
    searchTitle: '',
    searchAuthor: '',
    searchResults: [],
    itemSearched: false,
  };

  handleChange = e => {
    this.setState({
      searchTitle: e.target.value,
    });
  };

  searchTitle = async e => {
    e.preventDefault();
    let bookData = await fetch(`/api/search/${this.state.searchTitle}`);
    bookData = await bookData.json();
    await this.setState({ searchResults: bookData.items });
    this.setState({ itemSearched: true });
  };

  render() {
    return (
      <div className="search-area">
        <div className="search-bar">
          <form action="">
            <label htmlFor="">Search Title:</label>
            <input onChange={this.handleChange} type="text" value={this.state.searchTitle} />
            <button type="submit" onClick={this.searchTitle}>
              Search
            </button>
          </form>
        </div>
        {this.state.itemSearched && <BooksContainer books={this.state.searchResults} />}
      </div>
    );
  }
}
