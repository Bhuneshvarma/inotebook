// import React from 'react';
import PropTypes from 'prop-types';

function Alert(props) {
    const capitalize = (word) => {
        if (!word) return ''; // Add a check for undefined
        if (word === "danger") {
            word = "error"
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{ height: "5px" }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
        </div>
    );
}

Alert.propTypes = {
    alert: PropTypes.shape({
        type: PropTypes.string,
        msg: PropTypes.string
    }),
};

export default Alert;