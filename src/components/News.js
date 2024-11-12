import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const capatilizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const UpdateNews = async () => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setProgress(50);
        console.log(parsedData);
        setArticles(parsedData.articles); // Fixed to `articles`
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    };

    useEffect(() => {
        document.title = `${capatilizeFirstLetter(props.category)} - NewsApp`;
        UpdateNews();
        // eslint-disable-next-line
    }, []);

    // const handlePreviousClick = async () => {
    //     setPage(page - 1);
    //     UpdateNews();
    // };

    // const handleNextClick = async () => {
    //     setPage(page + 1);
    //     UpdateNews();
    // };

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles)); // Corrected to `articles`
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <div className="container">
                <h1 className="text-center" style={{ margin: '30px',marginTop:'90px' }}>
                    NewsApp - Top {capatilizeFirstLetter(props.category)} Headlines
                </h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length} // Corrected to `articles`
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults} // Corrected to `articles`
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {articles.map((element, index) => {
                                return (
                                    <div className="col-md-4" key={`${element.url}-${index}`}>
                                        <NewsItem
                                            title={element.title || ""}
                                            description={element.description || ""}
                                            imageUrl={element.urlToImage}
                                            newsUrl={element.url}
                                            author={element.author}
                                            date={element.publishedAt}
                                            source={element.source.name}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
};

// News.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general',
// };

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    // apikey: PropTypes.string.isRequired,
    // setProgress: PropTypes.func.isRequired
};

export default News;
