import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './picture.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PictureDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const pictureEntity = useAppSelector(state => state.picture.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pictureDetailsHeading">Picture</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{pictureEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{pictureEntity.name}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>{pictureEntity.date}</dd>
          <dt>
            <span id="link">Link</span>
          </dt>
          <dd>{pictureEntity.link}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{pictureEntity.description}</dd>
          <dt>Album</dt>
          <dd>{pictureEntity.album ? pictureEntity.album.id : ''}</dd>
          <dt>User</dt>
          <dd>{pictureEntity.user ? pictureEntity.user.id : ''}</dd>
          <dt>Tag</dt>
          <dd>
            {pictureEntity.tags
              ? pictureEntity.tags.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {pictureEntity.tags && i === pictureEntity.tags.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/picture" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/picture/${pictureEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PictureDetail;
