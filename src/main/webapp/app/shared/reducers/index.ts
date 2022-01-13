import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from 'app/modules/administration/administration.reducer';
import userManagement from 'app/modules/administration/user-management/user-management.reducer';
import register from 'app/modules/account/register/register.reducer';
import activate from 'app/modules/account/activate/activate.reducer';
import password from 'app/modules/account/password/password.reducer';
import settings from 'app/modules/account/settings/settings.reducer';
import passwordReset from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import picture from 'app/entities/picture/picture.reducer';
// prettier-ignore
import album from 'app/entities/album/album.reducer';
// prettier-ignore
import tag from 'app/entities/tag/tag.reducer';
// prettier-ignore
import widget from 'app/entities/widget/widget.reducer';
// prettier-ignore
import userWidgets from 'app/entities/user-widgets/user-widgets.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const rootReducer = {
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  picture,
  album,
  tag,
  widget,
  userWidgets,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
};

export default rootReducer;
