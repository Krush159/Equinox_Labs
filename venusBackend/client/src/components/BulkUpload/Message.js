import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid"

const Message = ({ msg }) => {
    return (
        <Grid container spacing={2} style={{margin:3}}>
            <Grid >
                {msg}
                <button
                    type='button'
                    className='close'
                    data-dismiss='alert'
                    aria-label='Close'
                >
                    <span aria-hidden='true'>&times;</span>
                </button>
            </Grid>
        </Grid>
    );
};

Message.propTypes = {
    msg: PropTypes.string.isRequired
};

export default Message;