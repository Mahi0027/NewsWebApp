import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles : [],
            loading: true,
            page: 1,
            totalArticles: 0
        }
        document.title = `${ this.capitalize(this.props.category) } - NewsGeek`;
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${ this.props.country }&category=${ this.props.category }&apiKey=db01d11460ed4f4f9beb169fc210ba2e&page=${ this.state.page }&pageSize=${ this.props.pageSize }`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles:parseData.articles, 
            totalArticles: parseData.totalResults,
            loading: false });
    }

    fetchData = async(type) => {
        var url = ``;
        if(type === 'next') {
            url = `https://newsapi.org/v2/top-headlines?country=${ this.props.country }&category=${ this.props.category }&apiKey=db01d11460ed4f4f9beb169fc210ba2e&page=${ this.state.page + 1 }&pageSize=${ this.props.pageSize }`;
        }
        else{
            url = `https://newsapi.org/v2/top-headlines?country=${ this.props.country }&category=${ this.props.category }&apiKey=db01d11460ed4f4f9beb169fc210ba2e&page=${ this.state.page - 1 }&pageSize=${ this.props.pageSize }`;
        }
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            page: (type === 'next')? this.state.page + 1 : this.state.page - 1,
            loading: false
        });
    }

    handlePrevClick = () => {
        this.setState({
            loading: true
        })
        this.fetchData('prev');
    }

    handleNextClick = () => {
        this.setState({
            loading: true
        })
        this.fetchData('next');
    }
  render() {
    return (
        <>
            <div className='container'>
                <h1 className='text-center my-2'>NewsGeek - Top { this.capitalize(this.props.category) } Headlines</h1>
                { this.state.loading && <Spinner />}
                <div className='row my-4'>
                    { !this.state.loading && this.state.articles.map((element)=>{
                        return <div className='col-md-3' key={ element.url }>
                            <NewsItems 
                                title={ element.title ? element.title.slice(0, 45):"" } 
                                description={ element.description ? element.description.slice(0, 88):"" } 
                                imageUrl={ element.urlToImage ? element.urlToImage : "https://techcrunch.com/wp-content/uploads/2022/05/TC-Pod-feature.jpg?w=614" } 
                                newsUrl={ element.url  }
                                author={ element.author?element.author:"Unknown"  }
                                date={ new Date(element.publishedAt).toGMTString() }
                                source={ element.source.name }
                            />
                        </div> 
                    })}
                </div>
            </div>
            <div className='container d-flex justify-content-between'>
                <button disabled={ this.state.page<=1 } type="button" className="btn btn-dark" onClick={ this.handlePrevClick }>&larr; Previous</button>
                <button disabled={ (this.state.page * this.props.pageSize)>=100 } type="button" className="btn btn-dark" onClick={ this.handleNextClick }>Next &rarr;</button>
            </div>
        </>
    )
  }
}

export default News