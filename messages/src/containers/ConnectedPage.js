import {connect} from 'react-redux';

import {runSearch} from '../redux/messages/actions';

import Page from './Page';

const _mapStateToProps = ({frontend}) => ({
    isLoading: frontend.isLoading,
});

const _mapDispatchToProps = {
    handleSearch: runSearch,
};

export default connect(
    _mapStateToProps,
    _mapDispatchToProps,
)(Page);
