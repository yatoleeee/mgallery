import React, { useState, useEffect } from 'react';
import { Carousel, Image, Col, Placeholder, Stack, Row, OverlayTrigger, Tooltip, Table, Button } from 'react-bootstrap';
import LazyImage from "../utility/LazyImage";
import { useParams } from 'react-router-dom';

import axios from 'axios';

import './Movie.css'

export default function Movie() {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  // console.log(useParams())
  useEffect(() => {
    setLoading(true)
    axios.get(`https://denim-sudsy-carp.glitch.me/movies/${params.movieId}`)
    .then((response) => {
      setMovieData(response.data)
    })
    .catch((error) => console.log('Error occured', error))
    .finally(() => {
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Col xl={8} className="mx-auto mt-5 pt-5">
        <br/>
        <Stack direction="horizontal" gap={2} className="align-items-start">
          <div className="mr-4">
            <div className="movie-card">
              <LazyImage image={{
                alt: movieData.title,
                height: 450,
                src: movieData.thumbnail,
                width: 275,
                className: 'movie-card-image',
                wrapperClassName: '',
                containerWidth: 275,
              }}/>
            </div>
          </div>
          <div className="ml-4 p-4">
            <Table size="sm">
              <tbody>
                <tr>
                  <td className="movie-detail-table-left-cell">Genre</td>
                  <td>:</td>
                  <td className="movie-detail-table-right-cell">{movieData.genre}</td>
                </tr>
                <tr>
                  <td className="movie-detail-table-left-cell">Title</td>
                  <td>:</td>
                  <td className="movie-detail-table-right-cell">{movieData.title}</td>
                </tr>
                <tr>
                  <td className="movie-detail-table-left-cell">Director</td>
                  <td>:</td>
                  <td className="movie-detail-table-right-cell">{movieData.director}</td>
                </tr>
                <tr>
                  <td className="movie-detail-table-left-cell">Writer</td>
                  <td>:</td>
                  <td className="movie-detail-table-right-cell">{movieData.writer}</td>
                </tr>
                <tr>
                  <td className="movie-detail-table-left-cell">Production</td>
                  <td>:</td>
                  <td className="movie-detail-table-right-cell">{movieData.production}</td>
                </tr>
                <tr>
                  <td className="movie-detail-table-left-cell">Cast</td>
                  <td>:</td>
                  <td className="movie-detail-table-right-cell">{movieData.cast}</td>
                </tr>
              </tbody>
            </Table>
            <div style={{ textAlign: 'left' }}>
              <h4>Summary</h4>
              <span>Shang-Chi, the master of weaponry-based Kung Fu, is forced to confront his past after being drawn into the Ten Rings organization.</span>
            </div>
            <div className='mt-3'>
              <Button variant="danger" href={`${movieData.trailer}`} >TRAILER</Button>{' '}
              <Button variant="warning" href={`${movieData.imdb}`}>IMDB</Button>
            </div>
          </div>
        </Stack>
      </Col>
      {/* <nav>
        <Link to="/">Home</Link>
      </nav> */}
    </>
  );
}