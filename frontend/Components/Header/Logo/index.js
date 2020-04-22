import { Link } from 'react-router'
import React from 'react';
import styles from './styles';
import LogoImage from 'SharedStyles/20-1.png';

const Logo = (props) => {

  return (
    <div className={styles.logoContainer}>
      <Link to='/' className={styles.logo}>
        <img className={styles.logoImage} src={props.logoImage ? props.logoImage: LogoImage} />
      </Link>
      <h1 className={styles.logoTitle}>
        <Link to="/">{props.boardName}</Link>
      </h1>
    </div>
  );
};

Logo.defaultProps = {
  boardName: '20Percent',
  logoImage: LogoImage
};

Logo.PropTypes = {
  boardName: React.PropTypes.string,
  logoImage: React.PropTypes.string
};

export default Logo;
