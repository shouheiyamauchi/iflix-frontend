import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Spin, Progress } from 'antd';
import logo from './images/logo.png';
import styles from './styles.module.scss';

const Video = props => {
  const {
    loadingContent,
    playPercent,
    playVideo,
    contentLoadingError
  } = props;

  if (loadingContent || contentLoadingError) {
    return (
      <div className={styles.container}>
        <div className={styles.videoPreviewLoading}>
          {contentLoadingError ? <Icon type="exclamation-circle-o" /> : <Spin /> }
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        {playPercent === 0 ? (
          <div onClick={playVideo} className={styles.videoPreviewLoaded}>
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
  };
}

Video.propTypes = {
  loadingContent: PropTypes.bool.isRequired,
  playPercent: PropTypes.number.isRequired,
  playVideo: PropTypes.func.isRequired,
  contentLoadingError: PropTypes.bool.isRequired
}

export default Video;
