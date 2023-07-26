import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
// material-ui
import { ButtonBase, Typography } from '@mui/material';

// project imports
import config from 'config';

import { MENU_OPEN } from 'store/actions';


// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state) => state.customization.defaultId);
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <ButtonBase disableRipple onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })} component={Link} to={config.defaultPath}>
    <Typography color={theme.palette.secondary.main}  variant={ 'h3' }>EDM
                          </Typography>
    </ButtonBase>
  );
};

export default LogoSection;
