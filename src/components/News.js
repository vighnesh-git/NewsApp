import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
  };
  
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }

  async fetchData(page = 1) {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=034d14dc737146578734f8786b13ef8e&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    const data = await fetch(url);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      page: page,
    });
  }

  async componentDidMount() {
    this.fetchData();  // Fetch the first page
  }

  handlePreviousClick = async () => {
    if (this.state.page > 1) {
      this.fetchData(this.state.page - 1);
    }
  };

  handleNextClick = async () => {
    const maxPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (this.state.page < maxPages) {
      this.fetchData(this.state.page + 1);
    }
  };

  render() {
    return (
      <>
        <div className="container">
          <h1 className="text-center" style={{ margin: '30px' }}> NewsApp - Top {this.props.category} Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading && this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || "No title available"}
                    description={element.description || "No description available"}
                    imageUrl={element.urlToImage || "default-image-url"}
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button type="button" disabled={this.state.page <= 1} className="btn btn-outline-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-outline-dark" onClick={this.handleNextClick}>Next &rarr; </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
