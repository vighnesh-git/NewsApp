import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
        <>
        <div className="my-3">
          <div className="card" >
            <img src={!imageUrl?"https://image.cnbcfm.com/api/v1/image/108059676-1730992658569-gettyimages-2183500916-ms1_9974_7xrkjydz.jpeg?v=1730992745&w=1920&h=1080":imageUrl}     className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary"><strong>By {author} on {date}</strong></small></p>
                <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more..</a>
              </div>
          </div>
        </div>
        </>
    )
  }
}

export default NewsItem
