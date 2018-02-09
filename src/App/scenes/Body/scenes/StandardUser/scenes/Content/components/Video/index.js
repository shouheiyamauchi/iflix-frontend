import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Progress } from 'antd';
import logo from './images/logo.png';
import styles from './styles.module.scss';

const Video = props => {
  const {
    playPercent,
    playVideo
  } = props;

  return (
    <div className={styles.container}>
      {playPercent === 0 ? (
        <div onClick={playVideo} className={styles.videoPreview}>
          <Icon type="play-circle-o" />
        </div>
      ) : (
        <div>
          <div className={styles.videoPlaying}>
            <img alt="iflix logo" src={logo} />
          </div>
          <div className={styles.videoProgressBar}>
            <Progress percent={playPercent} showInfo={false} status="exception" />
          </div>
        </div>
      )}
    </div>
  );
}

Video.propTypes = {
  playPercent: PropTypes.number.isRequired,
  playVideo: PropTypes.func.isRequired
}

export default Video;
