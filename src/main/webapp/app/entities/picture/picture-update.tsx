import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAlbum } from 'app/shared/model/album.model';
import { getEntities as getAlbums } from 'app/entities/album/album.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { ITag } from 'app/shared/model/tag.model';
import { getEntities as getTags } from 'app/entities/tag/tag.reducer';
import { getEntity, updateEntity, createEntity, reset } from './picture.reducer';
import { IPicture } from 'app/shared/model/picture.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PictureUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const albums = useAppSelector(state => state.album.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const tags = useAppSelector(state => state.tag.entities);
  const pictureEntity = useAppSelector(state => state.picture.entity);
  const loading = useAppSelector(state => state.picture.loading);
  const updating = useAppSelector(state => state.picture.updating);
  const updateSuccess = useAppSelector(state => state.picture.updateSuccess);
  const handleClose = () => {
    props.history.push('/picture');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAlbums({}));
    dispatch(getUsers({}));
    dispatch(getTags({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...pictureEntity,
      ...values,
      tags: mapIdList(values.tags),
      album: albums.find(it => it.id.toString() === values.album.toString()),
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...pictureEntity,
          album: pictureEntity?.album?.id,
          user: pictureEntity?.user?.id,
          tags: pictureEntity?.tags?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="familyPhotoAlbumApp.picture.home.createOrEditLabel" data-cy="PictureCreateUpdateHeading">
            Create or edit a Picture
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="picture-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Name" id="picture-name" name="name" data-cy="name" type="text" />
              <ValidatedField label="Date" id="picture-date" name="date" data-cy="date" type="text" />
              <ValidatedField label="Link" id="picture-link" name="link" data-cy="link" type="text" />
              <ValidatedField label="Description" id="picture-description" name="description" data-cy="description" type="text" />
              <ValidatedField id="picture-album" name="album" data-cy="album" label="Album" type="select">
                <option value="" key="0" />
                {albums
                  ? albums.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="picture-user" name="user" data-cy="user" label="User" type="select">
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Tag" id="picture-tag" data-cy="tag" type="select" multiple name="tags">
                <option value="" key="0" />
                {tags
                  ? tags.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/picture" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PictureUpdate;
