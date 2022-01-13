import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './picture.reducer';
import { IPicture } from 'app/shared/model/picture.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const Picture = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const pictureList = useAppSelector(state => state.picture.entities);
  const loading = useAppSelector(state => state.picture.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="picture-heading" data-cy="PictureHeading">
        Pictures
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Picture
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {pictureList && pictureList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Link</th>
                <th>Description</th>
                <th>Album</th>
                <th>User</th>
                <th>Tag</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pictureList.map((picture, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${picture.id}`} color="link" size="sm">
                      {picture.id}
                    </Button>
                  </td>
                  <td>{picture.name}</td>
                  <td>{picture.date}</td>
                  <td>{picture.link}</td>
                  <td>{picture.description}</td>
                  <td>{picture.album ? <Link to={`album/${picture.album.id}`}>{picture.album.id}</Link> : ''}</td>
                  <td>{picture.user ? picture.user.id : ''}</td>
                  <td>
                    {picture.tags
                      ? picture.tags.map((val, j) => (
                          <span key={j}>
                            <Link to={`tag/${val.id}`}>{val.name}</Link>
                            {j === picture.tags.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${picture.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${picture.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${picture.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Pictures found</div>
        )}
      </div>
    </div>
  );
};

export default Picture;
