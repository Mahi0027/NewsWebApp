import React, { Component } from 'react'

export class NewsItems extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="card">
                <img src={ imageUrl } className="card-img-top" alt="No Image"/>
                <div className="card-body">
                    <h5 className="card-title">{ title }...</h5>
                    <p className="card-text">{ description }...</p>
                    <p className="card-text"><small className="text-muted">By { author } on { date }</small></p>
                    <a href={ newsUrl } target="_blank" className="btn btn-sm btn-dark">Go somewhere</a>
                </div>
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-primary" style={{left:"85%",zIndex:"1"}}>
                    { source }
                </span>
            </div>
        )
    }
}

export default NewsItems