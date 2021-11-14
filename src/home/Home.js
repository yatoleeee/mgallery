import React, { useState, useEffect } from 'react';
import { Link, Outlet } from "react-router-dom";
import { Carousel, Image, Col, Placeholder, Stack, Row, OverlayTrigger, Tooltip, Table, Button } from 'react-bootstrap';
import axios from "axios";
import LazyImage from "../utility/LazyImage";
import AutoComplete from 'react-autocomplete';
import useDebounce from '../utility/useDebounce';

import DatePicker from "react-datepicker";
import moment from 'moment';

import './Home.css';
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const [movieList, setMovieList] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get('https://denim-sudsy-carp.glitch.me/setup')
    .then((response) => {
      setMovieList(response.data.movieList)
      setHighlights(response.data.highlights)
    })
    .catch((error) => console.log('Error occured', error))
    .finally(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const start = moment(startDate, 'DD/MM/YYYY')
    const end = moment(endDate, 'DD/MM/YYYY')
    if ( start.isAfter(end) ) setEndDate(startDate)
  }, [startDate]);
  
  useEffect(() => {
    const start = moment(startDate, 'DD/MM/YYYY')
    const end = moment(endDate, 'DD/MM/YYYY')
    if ( end.isBefore(start) ) setStartDate(endDate)
  }, [endDate]);

  const throttleCb = useDebounce(() => {
    let tempResult;
    if (searchValue !== '') {
      tempResult = movieList.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()) 
      || item.genre.toLowerCase().includes(searchValue.toLowerCase()) 
      || item.director.toLowerCase().includes(searchValue.toLowerCase()) 
      || item.writer.toLowerCase().includes(searchValue.toLowerCase()) 
      || item.production.toLowerCase().includes(searchValue.toLowerCase()) 
      || item.cast.toLowerCase().includes(searchValue.toLowerCase()) 
      || item.summary.toLowerCase().includes(searchValue.toLowerCase()))

      if (isFilter) {
        const start = moment(startDate, 'DD/MM/YYYY')
        const end = moment(endDate, 'DD/MM/YYYY')

        tempResult = tempResult.filter((item) => {
          const itemDate = moment(item.release_date, 'DD-MM-YYYY');
          return (itemDate.isSameOrAfter(start) && itemDate.isSameOrBefore(end))
        })
      }

      setSearchResult(tempResult)
    } else {
      setSearchResult([])
    }
  }, 1000)
  useEffect( throttleCb, [searchValue, isFilter, startDate, endDate])
  useEffect(() => {
    if (searchValue !== '') setSearching(true)
    else setSearching(false)
  }, [searchResult])

  const movieTitles = movieList.map((item) => ({label: item.title}))
  const nowPlayingMovies = movieList.filter((item) => item.type === 'playing')
  const comingSoonMovies = movieList.filter((item) => item.type === 'coming')

  function getTitles(keyword) {
    return keyword !== '' ? movieTitles.filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase())).slice(0, 3) : movieTitles.slice(0,3)
  }

  const renderTooltip = (item, props) => (
    <Tooltip id="button-tooltip" {...props}>
      <div class="movie-tooltip">
        <Table size="sm">
          <tbody>
            <tr>
              <td className="movie-tooltip-table-left-cell">Genre</td>
              <td className="movie-tooltip-table-right-cell">{item.genre}</td>
            </tr>
            <tr>
              <td className="movie-tooltip-table-left-cell">Title</td>
              <td className="movie-tooltip-table-right-cell">{item.title}</td>
            </tr>
            <tr>
              <td className="movie-tooltip-table-left-cell">Director</td>
              <td className="movie-tooltip-table-right-cell">{item.director}</td>
            </tr>
            <tr>
              <td className="movie-tooltip-table-left-cell">Writer</td>
              <td className="movie-tooltip-table-right-cell">{item.writer}</td>
            </tr>
            <tr>
              <td className="movie-tooltip-table-left-cell">Production</td>
              <td className="movie-tooltip-table-right-cell">{item.production}</td>
            </tr>
            <tr>
              <td className="movie-tooltip-table-left-cell">Cast</td>
              <td className="movie-tooltip-table-right-cell">{item.cast}</td>
            </tr>
          </tbody>
        </Table>
        <p className="move-tooltip-synopsis">{item.summary}</p>
      </div>
    </Tooltip>
  );

  return (
    <>
      <Col xl={8} className="mx-auto mt-5 pt-3">
        <h2 className="my-4">Highlights</h2>
        <Carousel controls={false} interval={4000} fade>
          {highlights.map((item) => <Carousel.Item className="">
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`${item.url}`}>
              <LazyImage image={{
                alt:'First Slide',
                height:480,
                src: item.thumbnail,
                width:720,
                className:'carousel-image',
                wrapperClassName:'carousel-wrapper',
              }}/>
            </Link>
          </Carousel.Item>
          )}
        </Carousel>
      </Col>

      <Col xl={8} className="mx-auto mt-5 pt-5">
        <AutoComplete
          wrapperStyle={{ position: 'relative' }}
          renderInput={
            function(props) {
              return <input className="search-input" placeholder="Search movies.." {...props} />
          }}
          menuStyle={{ position: 'absolute', top: '100%', left: '50%', transform: 'translate(-50%, 0%)'}}
          getItemValue={(item) => item.label}
          items={getTitles(searchValue)}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white', borderBottomWidth: '0.5px', borderColor:'grey', borderStyle: 'solid', textAlign: 'left' }}>
              {item.label}
            </div>
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSelect={(val) => setSearchValue(val)}
        />
        <br/>
        <br/>
        <p>Date Filter</p>
        <div className="d-flex flex-row" style={{ width: 'fit-content', margin: 'auto' }}>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> {'\u00a0' + '-' + '\u00a0'} <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>
        <br/>
        <Button variant={isFilter ? "danger" : "primary"} onClick={() => setIsFilter(!isFilter)}>{ isFilter ? 'Stop Filter' : 'Filter'}</Button>
        <br/>
        <br/>
        <br/>
        {/* {searchResult.length > 0 && searchResult.map((item) => <span>{item.title}</span>)} */}
        {searching && <h2 className="text-start mb-4">Search Result</h2>}
        {searching && searchResult.length === 0 && <h3>No entries found</h3>}
        <Stack direction="horizontal" gap={2} className="align-items-start justify-content-start flex-wrap">
          {searchResult.length > 0 && searchResult.map((item) => <Link style={{ textDecoration: 'none', color: 'black' }} to={`/movies/${item.id}`}>
            <OverlayTrigger
              className="cursor-pointer"
              placement="auto"
              delay={{ show: 50, hide: 0 }}
              overlay={renderTooltip(item)}>
              <div className="movie-card cursor-pointer mb-4">
                <LazyImage image={{
                  alt: item.title,
                  height: 450,
                  src: item.thumbnail,
                  width: 275,
                  className: 'movie-card-image',
                  wrapperClassName: '',
                  caption: item.title,
                  containerWidth: 275,
                }}/>
              </div>
            </OverlayTrigger>
          </Link>
          )}
          {searching && searchResult.length === 0 && <div>
              <div className="movie-card mb-4 movie-card-not-found">
                <LazyImage image={{
                  alt: '',
                  height: 450,
                  src: '',
                  width: 275,
                  className: 'movie-card-image',
                  wrapperClassName: '',
                  caption: '',
                  containerWidth: 275,
                }}/>
              </div>
            </div>}
        </Stack>
      </Col>

      <Col hidden={searching} xl={8} className="mx-auto mt-5 pt-5">
        <h2 className="text-start mb-4">Now Playing</h2>
        <Stack direction="horizontal" gap={2} className="align-items-start justify-content-start flex-wrap">
          {nowPlayingMovies.map((item) => <Link style={{ textDecoration: 'none', color: 'black' }} to={`/movies/${item.id}`}>
            <OverlayTrigger
              className=""
              placement="auto"
              delay={{ show: 50, hide: 0 }}
              overlay={renderTooltip(item)}>
                <div className="movie-card mb-4">
                  <LazyImage image={{
                    alt: item.title,
                    height: 450,
                    src: item.thumbnail,
                    width: 275,
                    className: 'movie-card-image',
                    wrapperClassName: '',
                    caption: item.title,
                    containerWidth: 275,
                  }}/>
                </div>
            </OverlayTrigger>
          </Link>
          )}
        </Stack>
      </Col>

      <Col hidden={searching} xl={8} className="mx-auto mt-5">
        <h2 className="text-start mb-4">Coming Soon</h2>
        <Stack direction="horizontal" gap={2} className="align-items-start justify-content-start flex-wrap">
          {comingSoonMovies.map((item) => <Link style={{ textDecoration: 'none', color: 'black' }} to={`/movies/${item.id}`}>
              <OverlayTrigger
                className=""
                placement="auto"
                delay={{ show: 50, hide: 0 }}
                overlay={renderTooltip(item)}>
                  <div className="movie-card mb-4">
                    <LazyImage image={{
                      alt: item.title,
                      height: 450,
                      src: item.thumbnail,
                      width: 275,
                      className: 'movie-card-image',
                      wrapperClassName: '',
                      caption: item.title,
                      containerWidth: 275,
                    }}/>
                  </div>
              </OverlayTrigger>
            </Link>
          )}
        </Stack>
      </Col>
    </>
  );
}

export default Home;