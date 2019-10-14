import {connect} from 'react-redux';

import Page from './Page';

const _mapStateToProps = ({frontend}) => ({
    isLoading: frontend.isLoading,
});

export default connect(
    _mapStateToProps,
)(Page);
